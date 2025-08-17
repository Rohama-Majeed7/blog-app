import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
const { likeId } = await req.json();
try {
    const like = await prisma.like.delete({
        where: { id: likeId },
    })
    return NextResponse.json(
        { message: "Like deleted successfully",like},
        { status: 200 }
    );
} catch (error) {
    console.error("Error deleting like:", error);
    return NextResponse.json(
        { message: "Internal Server Error", },
        { status: 500 }
    );
}
}