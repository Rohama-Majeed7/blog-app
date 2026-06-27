"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  MessageSquare,
  CalendarDays,
  UserCircle,
  Tag,
  Send,
  X,
  Loader2,
  Heart,
} from "lucide-react";
import { useParams } from "next/navigation";
import Comments from "@/components/Comments";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export type BlogType = {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    username: string;
    email: string;
  };
};

type CommentType = {
  content: string;
};

const Page = () => {
  const { data: session } = useSession();
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<BlogType | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [likeSubmitting, setLikeSubmitting] = useState(false);

  const form = useForm<CommentType>({
    defaultValues: {
      content: "",
    },
  });

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/singleblog/${id}`);
      setBlog(res.data.blog);
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await axiosInstance.get(`/likes/${id}`);

      if (res.status === 200) {
        setLikes(res.data.likesCount || 0);
      }
    } catch (error) {
      console.log("Error fetching likes:", error);
    }
  };

  const onSubmit = async (values: CommentType) => {
    try {
      if (!session?.user?.id) {
        alert("Please login first to comment.");
        return;
      }

      setCommentSubmitting(true);

      const res = await axiosInstance.post("/comments", {
        content: values.content.trim(),
        postId: id,
        userId: session.user.id,
      });

      alert(res.data.message || "Comment added successfully.");

      form.reset();
      setValue((prev) => prev + 1);
    } catch (error) {
      console.log("Error adding comment:", error);
      alert("Internal Server Error");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const onHandleLike = async () => {
    try {
      if (!session?.user?.id) {
        alert("Please login first to like this blog.");
        return;
      }

      setLikeSubmitting(true);

      const res = await axiosInstance.post("/likes", {
        blogId: id,
        userId: session.user.id,
      });

      if (res.status === 200) {
        alert(res.data.message || "Blog liked successfully!");
        setValue((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Error liking the blog:", error);
      alert("Unable to like this blog.");
    } finally {
      setLikeSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchLikes();
    }
  }, [id, value]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse overflow-hidden rounded-3xl border border-[#ead8c8] bg-white shadow-2xl">
            <div className="h-72 bg-[#f3dfc8] sm:h-96" />
            <div className="space-y-4 p-6 sm:p-8">
              <div className="h-8 w-3/4 rounded-full bg-[#f3dfc8]" />
              <div className="h-4 w-1/3 rounded-full bg-[#f7eadc]" />
              <div className="h-4 w-full rounded-full bg-[#f7eadc]" />
              <div className="h-4 w-5/6 rounded-full bg-[#f7eadc]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdf6f0] px-4">
        <div className="rounded-3xl border border-[#ead8c8] bg-white px-6 py-10 text-center shadow-xl">
          <h1 className="text-2xl font-extrabold text-[#5c3d2e]">
            Blog not found
          </h1>
          <p className="mt-2 text-sm text-[#8b5e3c]">
            The blog you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-3xl border border-[#ead8c8] bg-white shadow-2xl shadow-[#5c3d2e]/10"
        >
          {/* Hero Image */}
          <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-[520px]">
            <motion.img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#5c3d2e] shadow-md backdrop-blur">
                <Tag className="h-4 w-4" />
                {blog.category}
              </span>

              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
              </h1>
            </div>
          </div>

          {/* Meta + Actions */}
          <section className="border-b border-[#ead8c8] bg-[#fffaf6] px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#5c3d2e] shadow-sm">
                  <CalendarDays className="h-4 w-4 text-[#8b5e3c]" />
                  {formattedDate}
                </span>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#5c3d2e] shadow-sm">
                  <UserCircle className="h-4 w-4 text-[#8b5e3c]" />
                  {blog.author?.username || "Unknown Author"}
                </span>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#5c3d2e] shadow-sm">
                  <Heart className="h-4 w-4 text-[#8b5e3c]" />
                  {likes} {likes === 1 ? "Like" : "Likes"}
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Comments Drawer */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button className="h-11 rounded-xl bg-[#d7a86e] px-5 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666]">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comments
                    </Button>
                  </DrawerTrigger>

                  <DrawerContent className="border-[#ead8c8] bg-[#fdf6f0]">
                    <div className="mx-auto flex max-h-[85vh] w-full max-w-3xl flex-col px-4 pb-5">
                      <DrawerHeader className="px-0 text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <DrawerTitle className="text-2xl font-extrabold text-[#5c3d2e]">
                              Comments
                            </DrawerTitle>

                            <DrawerDescription className="mt-2 text-sm leading-6 text-[#8b5e3c]">
                              Read comments and share your thoughts about this
                              blog.
                            </DrawerDescription>
                          </div>

                          <DrawerClose asChild>
                            <button
                              type="button"
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e0c097] bg-white text-[#5c3d2e] transition hover:bg-[#fff4ea]"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </DrawerClose>
                        </div>
                      </DrawerHeader>

                      {/* Comments List */}
                      <div className="min-h-0 flex-1 overflow-y-auto rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-lg shadow-[#5c3d2e]/5">
                        <Comments id={id} value={value} />
                      </div>

                      {/* Add Comment Form */}
                      <DrawerFooter className="px-0">
                        <div className="rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-lg shadow-[#5c3d2e]/5">
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="flex flex-col gap-3 sm:flex-row"
                            >
                              <FormField
                                control={form.control}
                                name="content"
                                rules={{
                                  required: "Comment is required",
                                  validate: (value) =>
                                    value.trim().length >= 3 ||
                                    "Comment must be at least 3 characters",
                                }}
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <Input
                                        placeholder="Write a comment..."
                                        {...field}
                                        className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="submit"
                                disabled={commentSubmitting}
                                className="h-12 rounded-xl bg-[#d7a86e] px-6 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666] disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {commentSubmitting ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Send
                                  </span>
                                )}
                              </Button>
                            </form>
                          </Form>
                        </div>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>

                {/* Like Button */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={onHandleLike}
                  disabled={likeSubmitting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e0c097] bg-white px-5 text-sm font-bold text-[#5c3d2e] shadow-sm transition hover:bg-[#fff4ea] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {likeSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ThumbsUp className="h-4 w-4" />
                  )}
                  Like Blog
                </motion.button>
              </div>
            </div>
          </section>

          {/* Blog Content */}
          <section className="px-5 py-8 sm:px-8 lg:px-10">
            <h2 className="mb-6 text-2xl font-extrabold text-[#5c3d2e]">
              Blog Content
            </h2>

            <div
              className="
                max-w-none text-[#5c3d2e]
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
          </section>
        </motion.article>
      </div>
    </main>
  );
};

export default Page;