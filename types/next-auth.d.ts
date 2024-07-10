import { IUser } from "@/interfaces/IUser.interface";
import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: Record<any, any>;
  }
  interface User extends Record<any, any> {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: Record<any, any>;
  }
}
