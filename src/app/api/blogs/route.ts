import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    if (blogs.length == 0) {
      return NextResponse.json({ message: "Blogs not found" }, { status: 400 });
    }
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Interval Server Error" },
      { status: 500 }
    );
  }
}
