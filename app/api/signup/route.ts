import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required", status: 400 },
        { status: 400 }
      );
    }

    const existingcredentialUser = await prisma.credentialUser.findUnique({
      where: { email },
    });

    if (existingcredentialUser) {
      return NextResponse.json(
        { error: "Email already taken", status: 409 },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.credentialUser.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log("account created successfully");
    return NextResponse.json(
      { message: "Account Created Successfully", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
