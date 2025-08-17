import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
const { commentId } = await req.json();
try {
    const post = await prisma.comment.delete({
        where: { id: commentId },
    })
    return NextResponse.json(
        { message: "Comment deleted successfully",post},
        { status: 200 }
    );
} catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
        { message: "Internal Server Error", },
        { status: 500 }
    );
}
}