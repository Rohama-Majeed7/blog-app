"use client";

import { axiosInstance } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Search,
  Tag,
  RotateCcw,
  BookOpen,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogCategories } from "@/types/type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type PostType = {
  search: string;
  category: string;
};

type BlogProp = {
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
  const [blogs, setBlogs] = useState<BlogProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  const form = useForm<PostType>({
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/blogs");
      setBlogs(res.data || []);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const removeHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  };

  const getShortContent = (content: string) => {
    const plainText = removeHtmlTags(content);

    if (plainText.length > 140) {
      return plainText.slice(0, 140) + "...";
    }

    return plainText;
  };

  const onSubmit = async (values: PostType) => {
    try {
      const searchValue = values.search.trim();
      const categoryValue = values.category.trim();

      if (!searchValue && !categoryValue) {
        fetchBlogs();
        return;
      }

      setFilterLoading(true);

      if (searchValue) {
        const res = await axiosInstance.get(`/blogs/${searchValue}`);
        setBlogs(res.data.blogs || []);
        return;
      }

      if (categoryValue) {
        const res = await axiosInstance.get(`/blogs/${categoryValue}`);
        setBlogs(res.data.blogs || []);
      }
    } catch (error) {
      console.log("Search error:", error);
      alert("Internal Server Error");
    } finally {
      setFilterLoading(false);
    }
  };

  const handleReset = () => {
    form.reset({
      search: "",
      category: "",
    });

    fetchBlogs();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <section className="mb-8 rounded-3xl border border-[#ead8c8] bg-white px-5 py-8 text-center shadow-xl shadow-[#5c3d2e]/5 sm:px-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20">
            <BookOpen className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#5c3d2e] sm:text-4xl lg:text-5xl">
            Explore Our Blogs
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#8b5e3c] sm:text-base">
            Discover stories, tutorials, ideas, and insights from different
            categories.
          </p>
        </section>

        {/* Search & Filter */}
        <section className="mb-8 rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-lg shadow-[#5c3d2e]/5 sm:p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 lg:flex-row lg:items-start"
            >
              {/* Search */}
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="w-full flex-1">
                    <FormControl>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5e3c]" />

                        <Input
                          placeholder="Search blog by title or keyword..."
                          {...field}
                          className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] pl-12 pr-4 text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Category + Buttons */}
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-[230px]">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 w-full rounded-xl border-[#e0c097] bg-[#fffaf6] text-[#5c3d2e] focus:ring-[#d7a86e]">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="rounded-xl border-[#e0c097] bg-white">
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

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={filterLoading}
                    className="h-12 flex-1 rounded-xl bg-[#d7a86e] px-6 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none"
                  >
                    {filterLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    Search
                  </Button>

                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="h-12 flex-1 rounded-xl border-[#e0c097] bg-white px-5 font-semibold text-[#5c3d2e] transition hover:bg-[#fff4ea] sm:flex-none"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </section>

        {/* Blogs */}
        {loading ? (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl border border-[#ead8c8] bg-white shadow-lg"
              >
                <div className="h-56 bg-[#f3dfc8]" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded-full bg-[#f3dfc8]" />
                  <div className="h-4 w-full rounded-full bg-[#f7eadc]" />
                  <div className="h-4 w-5/6 rounded-full bg-[#f7eadc]" />
                  <div className="h-4 w-28 rounded-full bg-[#f3dfc8]" />
                </div>
              </div>
            ))}
          </section>
        ) : blogs.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-[#e0c097] bg-white px-6 py-16 text-center shadow-lg shadow-[#5c3d2e]/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff7ed] text-[#5c3d2e]">
              <Search className="h-8 w-8" />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-[#5c3d2e]">
              No blogs found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8b5e3c]">
              Try searching with a different keyword or reset the filters to see
              all blogs.
            </p>

            <Button
              type="button"
              onClick={handleReset}
              className="mt-6 rounded-xl bg-[#d7a86e] px-6 font-semibold text-white hover:bg-[#c89666]"
            >
              Reset Filters
            </Button>
          </section>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="group block h-full"
              >
                <Card className="flex h-full overflow-hidden rounded-3xl border border-[#ead8c8] bg-white shadow-lg shadow-[#5c3d2e]/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  {/* Image */}
                  {blog.image && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#5c3d2e] shadow-md backdrop-blur">
                        <Tag className="h-3 w-3" />
                        {blog.category}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="line-clamp-2 text-xl font-extrabold leading-snug text-[#5c3d2e] transition group-hover:text-[#c89666]">
                        {blog.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="line-clamp-4 text-sm leading-7 text-[#6f4a36]">
                        {getShortContent(blog.content)}
                      </p>

                      <span className="mt-4 inline-flex font-bold text-[#d7a86e] transition group-hover:text-[#c89666]">
                        Read more →
                      </span>
                    </CardContent>

                    <CardFooter className="border-t border-[#ead8c8] bg-[#fffaf6]">
                      <p className="flex items-center gap-2 text-xs font-semibold text-[#8b5e3c]">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </CardFooter>
                  </div>
                </Card>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Page;