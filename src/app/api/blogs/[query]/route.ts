import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ query: string }> }
) {
  const { query } = await context.params;
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
