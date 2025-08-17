"use client";
import { axiosInstance } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { blogCategories } from "@/types/type";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type postType = {
  search: string;
  category: string;
};
type blogProp = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  category: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const [blogs, setBlogs] = useState<blogProp[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const form = useForm<postType>({
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const onSubmit = async (values: postType) => {
    try {
      if (values.search !== "") {
        const res = await axiosInstance.get(`/blogs/${values.search}`);
        setBlogs(res.data.blogs);
      }
      if (values.category !== "") {
        const res = await axiosInstance.get(`/blogs/${values.category}`);
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[1200px] mx-auto flex flex-col gap-6 bg-[#fdf6f0] px-4 md:px-8 py-12">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-[#5c3d2e] tracking-wide drop-shadow-sm">
        Explore Our Blogs ✨
      </h1>

      {/* Search & Filter */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row md:items-center md:justify-center gap-3"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormControl>
                  <Input
                    placeholder="🔍 Search by keyword..."
                    {...field}
                    className="border-[#e0c097] border-2 focus:border-[#d7a86e] focus:ring-[#d7a86e] rounded-xl shadow-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full md:w-[200px] border-2 border-[#e0c097] rounded-xl shadow-sm">
                    <SelectValue placeholder="📂 Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#e0c097] shadow-md rounded-lg">
                    {blogCategories.map((cat, idx) => (
                      <SelectItem key={idx} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#d7a86e] hover:bg-[#c89666] text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-300"
          >
            Search
          </Button>
        </form>
      </Form>

      {/* Blogs */}
      {loading ? (
        <p className="text-center text-lg text-[#5c3d2e] animate-pulse">
          Loading blogs...
        </p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-lg text-[#5c3d2e]">🚫 No blogs found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog?.id}
              href={`/blogs/${blog.id}`}
              className="group transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              <Card className="h-full border-2 border-[#e0c097] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl">
                {blog.image && (
                  <div className="relative">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="w-full h-56 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-[#d7a86e] text-white text-xs px-3 py-1 rounded-full shadow-md">
                      {blog?.category.toUpperCase()}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-[#5c3d2e] text-lg font-semibold group-hover:text-[#c89666] transition-colors">
                    {blog?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-lg text-gray-700 max-h-[300px] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: blog.content.length > 200 ? blog.content.slice(0, 200) + '...' : blog.content }}
                  />
                  <p className="mt-2 text-[#d7a86e] font-medium underline">
                    Read more →
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-gray-500">
                    📅 {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
