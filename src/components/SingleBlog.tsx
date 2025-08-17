import { notFound } from "next/navigation";
import {prisma} from "@/lib/prisma";

type pramasProps = {
  params: { id: string };
};

const  SingleBlog = async ({ params }: pramasProps) =>{
  const blog = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#fdf6f0] min-h-screen">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold text-[#5c3d2e] mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="inline-block bg-[#5c3d2e] text-white text-xs px-3 py-1 rounded-full mb-6">
        {blog.category}
      </p>
      <div
        className="prose prose-lg text-[#5c3d2e]"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
export default SingleBlog;