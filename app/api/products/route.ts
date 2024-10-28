import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { error } from "console";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();
  try {
    if (session) {
      const products = await prisma.product.findMany();
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
  try {
    const { name, description, price, stock } = await req.json();
    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, name, description, price, stock } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Product Id is Required" },
        { status: 400 },
      );
    }
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json(); // Assuming req.json() returns an object with { id }
    if (!id) {
      return NextResponse.json(
        { error: "Product Id is required for deletion" },
        { status: 400 },
      );
    }
    const product = await prisma.product.delete({
      where: { id: id },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
