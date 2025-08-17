import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { query: string } }
) {
  const { query } =  params;
  const blog = await prisma.post.findMany({
    where: {
      OR: [{ category: { contains: query } }, { title: { contains: query } }],
    },
  });
  return Response.json(
    {
      message: `User ID is ${query}`,
      blogs: blog,
    },
    { status: 200 }
  );
}
