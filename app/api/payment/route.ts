import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();
  try {
    if (session) {
      const payments = await prisma.payment.findMany();
      return NextResponse.json(payments, { status: 200 });
    } else {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Error fetching payments:" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  // const session = await getServerSession();
  try {
    //   if (!session || !session.user) {
    //     return NextResponse.json(
    //       {
    //         error: "Unauthorized",
    //       },
    //       { status: 401 },
    //     );
    //   }
    const { amount, status, userId } = await req.json();
    const payment = await prisma.payment.create({
      data: {
        amount: amount,
        status: status,
        user: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating payment: " + error.message, {
      status: 500,
    });
  }
};
