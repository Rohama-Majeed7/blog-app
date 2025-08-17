import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content, postId, userId } = await req.json();
  console.log("Received data:", { content, postId, userId });
  
  try {
    const comment = await prisma.comment.create({
      data: {
        content: content,
        post: {
          connect: { id: postId },
        },
        author: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json(
      { message: "comment added successfully", comment: comment },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in creating comment", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
