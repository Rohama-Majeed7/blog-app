import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ prevents build-time crashes

export async function GET() {
  try {
    const [commentsCount, postsCount, usersCount, likesCount] =
      await Promise.all([
        prisma.comment.count(),
        prisma.post.count(),
        prisma.user.count(),
        prisma.like.count(),
      ]);

    return NextResponse.json(
      {
        commentsCount,
        postsCount,
        usersCount,
        likesCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in /api/admin/comments-count:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
