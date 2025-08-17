import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
