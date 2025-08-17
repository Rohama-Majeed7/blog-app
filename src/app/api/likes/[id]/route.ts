import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const likes = await prisma.like.count({
      where: {
        postId: id,
      },
    });

    return NextResponse.json({ likesCount: likes }, { status: 200 });
  } catch (error) {
    console.log("Error fetching likes:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
