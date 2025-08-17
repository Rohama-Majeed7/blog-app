import { prisma } from "@/lib/prisma";
import { log } from "console";
import { NextResponse } from "next/server";
// type postType ={
//     title:String;
//     content:String;
//     image:String;
//     category:String;
//     status:Boolean
// }
export async function POST(req: Request) {
  try {
    const {id, title, content, image, category, status } = await req.json();
    console.log(typeof id);
    
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        image,
        category,
        status,
        author:{
          connect: {
            id
          }
        }
      },
    });

    return NextResponse.json(
      { message: "Blog Created Successfully", newPost: newPost },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in blog posting: ", error);
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
