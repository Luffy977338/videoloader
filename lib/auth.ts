import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { sendVerificationRequest } from "./sendVerificationRequest";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongoClient";
import { connectDB } from "./connectDB";
import UserModel from "@/models/UserModel";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },

  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from },
        });
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        const isUserExist = await UserModel.findOne({ email: user.email });

        if (isUserExist) return true;

        await UserModel.create({
          username: user.name || user.email,
          picture: user.image,
          email: user.email,
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        token.user = {
          username: user.username,
          email: user.email,
          picture: user.picture,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

export function serverSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
