import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const likes = await prisma.like.findMany({
      include: {
        user: true,
        post: true,
      },
    });
    return NextResponse.json(likes, { status: 200 });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
