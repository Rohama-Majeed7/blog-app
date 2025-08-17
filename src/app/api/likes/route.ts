import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {blogId, userId} = await req.json();
    if (!blogId || !userId) {
      return NextResponse.json(
        { message: "Blog ID and User ID are required" },
        { status: 400 }
      );
    }
    const likeExists = await prisma.like.findFirst({
        where:{
            postId: blogId,
            userId: userId
        }
    })
    if (likeExists) {
        return NextResponse.json({message:"User can like post only once"},{status:400})
    }
    const like = await prisma.like.create({
        data:{
            postId: blogId,
            userId: userId
        }
    })
    return NextResponse.json({ message: "Like created successfully",like }, { status: 200 });
  } catch (error) {
    console.log("Error liking the blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
