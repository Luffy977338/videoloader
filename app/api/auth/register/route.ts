import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import console from "console";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const hashSalt = 7;

    const { username, email, password } = body;

    const isUserExist = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!!isUserExist) {
      return NextResponse.json(
        { error: { message: "User already exist" } },
        { status: 400 },
      );
    }

    const hashPassword = await bcrypt.hash(password, hashSalt);

    console.log(password);

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log("error while registering: ", error);
    return NextResponse.json(
      { error: { message: `error while registering` } },
      { status: 500 },
    );
  }
}
