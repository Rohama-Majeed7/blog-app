import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
const { userId } = await req.json();
try {
    const post = await prisma.user.delete({
        where: { id: userId },
    })
    return NextResponse.json(
        { message: "User deleted successfully",post},
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