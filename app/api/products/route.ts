import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const session = getServerSession();
  try {
    if (session) {
      const products = await prima.product.findMany();
      return NextResponse.json(products, { status: 200 });
    } else {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  } catch (error: any) {
    return new NextResponse("Error fetching products: " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  // const session = await getServerSession();
  try {
    // if (session) {
    const { name, description, price, stock } = await req.json();
    const product = await prima.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
      },
    });
    return NextResponse.json(product, { status: 200 });
    // } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
