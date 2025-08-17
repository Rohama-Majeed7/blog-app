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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import Comments from "@/components/Comments";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

// Blog type definition
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
  const [likes, setLikes] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const form = useForm<CommentType>({ defaultValues: { content: " " } });
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);

  // Submit Comment
  const onSubmit = async (values: CommentType) => {
    try {
      const res = await axiosInstance.post("/comments", {
        content: values.content,
        postId: id,
        userId: session ? session.user.id : "",
      });
      alert(res.data.message);
      setValue(value + 1);
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  // Fetch Blog
  const fetchBlog = async () => {
    try {
      const res = await axiosInstance.get(`/singleblog/${id}`);
      setBlog(res.data.blog);
      setValue(value + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Like Blog
  const onHandleLike = async () => {
    try {
      const res = await axiosInstance.post("/likes", {
        blogId: id,
        userId: session ? session.user.id : "",
      });
      if (res.status === 200) {
        setValue(value + 1);
        alert("Blog liked successfully!");
      }
    } catch (error) {
      console.log("Error liking the blog:", error);
    }
  };

  // Fetch Likes
  const fetchLikes = async () => {
    try {
      const res = await axiosInstance.get(`/likes/${id}`);
      if (res.status === 200) {
        setLikes(res.data.likesCount);
      }
    } catch (error) {
      console.log("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [value]);

  if (loading) {
    return (
      <div className="text-center py-10 text-[#5c3d2e] font-semibold animate-pulse">
        Loading blog...
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-5 px-4">
      {/* Blog Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-2 border-[#5c3d2e] rounded-2xl bg-[#fdf6f0] shadow-lg overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* Blog Image */}
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="h-[300px] w-full object-cover rounded-lg shadow-md"
            whileHover={{ scale: 1.03 }}
          />

          {/* Blog Info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-[#5c3d2e]">
              {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
            </h1>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#5c3d2e]">
                Published Date:
              </span>{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div className="flex gap-2">
              <span className="font-semibold text-[#5c3d2e]">Category:</span>
              <p className="bg-[#5c3d2e] text-white text-xs px-3 py-1 rounded-full shadow">
                {blog.category}
              </p>
            </div>

            <div>
              <span className="font-bold text-[#5c3d2e]">Published By: </span>
              <span className="text-gray-700">{blog.author.username}</span>
            </div>

            {/* Likes + Comments */}
            <div className="flex gap-4 items-center mt-3">
              {/* Comments Drawer */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="flex gap-2 items-center bg-[#d7a86e] hover:bg-[#c89666] text-white rounded-lg shadow">
                    <MessageSquare className="w-4 h-4" />
                    Comments
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-[#fdf6f0] flex flex-col gap-3 h-[500px] rounded-t-2xl shadow-lg">
                  <DrawerHeader>
                    <h1 className="text-left font-bold text-2xl text-[#5c3d2e]">
                      Comments
                    </h1>
                  </DrawerHeader>
                  <DrawerDescription className="text-[#c89566] text-sm h-[350px] overflow-y-auto p-2">
                    <Comments id={id} value={value} />
                  </DrawerDescription>
                  <DrawerFooter>
                    {/* Add Comment Form */}
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col md:flex-row gap-2 w-[90%] mx-auto"
                      >
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  placeholder="Write a comment..."
                                  {...field}
                                  className="border-[#e0c097] border-2 placeholder:text-gray-500 text-black focus:border-[#d7a86e] focus:ring-[#d7a86e]"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="bg-[#d7a86e] hover:bg-[#c89666] text-white rounded-lg"
                        >
                          Send
                        </Button>
                      </form>
                    </Form>

                    <DrawerClose asChild>
                      <Button
                        variant="outline"
                        className="border-[#5c3d2e] absolute top-2 right-2 text-[#5c3d2e] hover:bg-[#c89566] hover:text-white w-fit"
                      >
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {/* Like Button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={onHandleLike}
              >
                <ThumbsUp className="w-6 h-6 text-[#5c3d2e] hover:text-[#c89566] transition" />
                <span className="text-[#5c3d2e] font-semibold">
                  {likes} Likes
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-4 border-t border-[#e0c097]">
          <h1 className="text-[#5c3d2e] font-bold text-2xl mb-2">Content:</h1>
          <div
            className="prose prose-lg text-gray-700 max-h-[300px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
