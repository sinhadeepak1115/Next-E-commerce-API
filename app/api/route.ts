import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Make sure this path matches your setup
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  return NextResponse.json({ session });
};
