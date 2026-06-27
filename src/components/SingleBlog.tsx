import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Tag, ArrowLeft } from "lucide-react";

type ParamsProps = {
  params: {
    id: string;
  };
};

const SingleBlog = async ({ params }: ParamsProps) => {
  const blog = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!blog) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-6 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#e0c097] bg-white px-4 py-2 text-sm font-semibold text-[#5c3d2e] shadow-sm transition hover:bg-[#fff4ea] hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>

        {/* Blog Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Image */}
          {blog.image && (
            <div className="relative h-64 w-full sm:h-80 md:h-[420px] lg:h-[500px]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#5c3d2e] shadow-md backdrop-blur">
                  <Tag className="h-4 w-4" />
                  {blog.category}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-5 sm:p-8 md:p-10 lg:p-12">
            {/* Category if no image */}
            {!blog.image && (
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#5c3d2e] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                  <Tag className="h-4 w-4" />
                  {blog.category}
                </span>
              </div>
            )}

            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-[#5c3d2e] sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-[#ead8c8] pb-6 text-sm text-[#8b5e3c]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff7ed] px-4 py-2 font-medium">
                <CalendarDays className="h-4 w-4" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div
              className="
                mt-8 max-w-none text-[#5c3d2e]
                [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold
                [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold
                [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold
                [&_p]:mb-5 [&_p]:text-base [&_p]:leading-8 sm:[&_p]:text-lg
                [&_strong]:font-bold
                [&_em]:italic
                [&_ul]:mb-5 [&_ul]:ml-6 [&_ul]:list-disc
                [&_ol]:mb-5 [&_ol]:ml-6 [&_ol]:list-decimal
                [&_li]:mb-2 [&_li]:leading-8
                [&_a]:font-semibold [&_a]:text-[#c89666] [&_a]:underline
                [&_blockquote]:my-6 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-[#d7a86e] [&_blockquote]:bg-[#fff7ed] [&_blockquote]:p-5 [&_blockquote]:italic
                [&_img]:my-6 [&_img]:rounded-2xl
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default SingleBlog;