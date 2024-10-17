import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error fetching users: " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();

  try {
    const {
      name = "Test User",
      email = "test@example.com",
      image = "default.jpg",
    } = session?.user || {};

    const user = await prisma.user.create({
      data: { name: name, email: email, image: image },
    });

    console.log(name, email, image);
    return NextResponse.json(user, { status: 200 });
  } catch (e: any) {
    return new NextResponse("Error creating user: " + e.message, {
      status: 500,
    });
  }
};
