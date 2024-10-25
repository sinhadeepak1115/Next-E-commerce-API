import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();
  try {
    if (session) {
      const users = await prisma.user.findMany();
      return NextResponse.json(users, { status: 200 });
    } else {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  } catch (error: any) {
    return new NextResponse("Error fetching users: " + error.message, {
      status: 500,
    });
  }
};

// export const POST = async (req: NextRequest) => {
//   const session = await getServerSession();
//   try {
//     if (session) {
//       const { name, email, image } = session.user || {};
//       const user = await prisma.user.create({
//         data: { name: name, email: email, image: image },
//       });
//       console.log(name, email, image);
//       return NextResponse.json(user, { status: 200 });
//     } else {
//       return NextResponse.json("Unauthorized", { status: 401 });
//     }
//   } catch (e: any) {
//     return new NextResponse("Error creating user: " + e.message, {
//       status: 500,
//     });
//   }
// };

//for testing
export const POST = async (req: NextRequest) => {
  const session = await getServerSession();

  try {
    const {
      name = "Test hiaUser",
      email = "testdsf@example.com",
      image = "default.jpg",
    } = session?.user || {};

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return new NextResponse("User with this email is already exists", {
        status: 400,
      });
    }
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
