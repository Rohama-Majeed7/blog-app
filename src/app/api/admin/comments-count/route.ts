import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const commentsCount = await prisma.comment.count();
    const postsCount = await prisma.post.count();
    const usersCount = await prisma.user.count();
    const likesCount = await prisma.like.count();
    return NextResponse.json({
      commentsCount,
      postsCount,
      usersCount,
      likesCount,
    },{ status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
