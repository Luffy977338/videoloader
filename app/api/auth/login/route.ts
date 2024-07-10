import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/models/UserModel";
import { IUser } from "@/interfaces/IUser.interface";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { password, email } = body;

    const data: IUser | null = await UserModel.findOne({ email }).lean();

    console.log(data);

    if (!data?._id) {
      return NextResponse.json(
        { error: { message: "Invalid credentials" } },
        { status: 400 },
      );
    }

    const isPasswordsCompare = await bcrypt.compare(password, data.password);

    console.log(isPasswordsCompare);

    if (!isPasswordsCompare) {
      return NextResponse.json(
        { error: { message: "Invalid credentials" } },
        { status: 400 },
      );
    }

    const { password: _, ...user } = data;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Error while login user" } },
      { status: 500 },
    );
  }
}
