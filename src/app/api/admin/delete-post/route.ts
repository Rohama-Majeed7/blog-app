import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
const { postId } = await req.json();
try {
    const post = await prisma.post.delete({
        where: { id: postId },
    })
    return NextResponse.json(
        { message: "Post deleted successfully",post},
        { status: 200 }
    );
} catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
        { message: "Internal Server Error", },
        { status: 500 }
    );
}
}