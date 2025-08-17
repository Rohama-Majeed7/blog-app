import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;
try{
  const blog = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: { author: true }, // if you also want user details
  });
  return Response.json(
    {
      message: ` ID is ${id}`,
      blog: blog,
    },
    { status: 200 }
  );
}
catch(error){
  console.log("Error in fetching single blog", error);
  
  return NextResponse.json({message:"Internal Server Error"},{status:500})
}
}
