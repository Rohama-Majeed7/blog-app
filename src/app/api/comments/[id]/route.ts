import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      include: {
        author: true,
      },
    });
    if (comments.length === 0) {
      return NextResponse.json(
        { message: "Comments not Fetched" },
        { status: 400 }
      );
    }
    return NextResponse.json({ comments: comments }, { status: 200 });
  } catch (error) {
    console.log("error in fetching comments:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
