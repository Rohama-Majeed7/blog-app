"use client";

import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { blogCategories } from "@/types/type";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegImage } from "react-icons/fa6";

type postType = {
  title: string;
  content: string;
  category: string;
  status: boolean;
};

function UploadBlog() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<postType>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      status: false,
    },
  });

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: postType) => {
    try {
      if (!file) {
        alert("Please select a file");
        return;
      }

      const uploadRes = await uploadToCloudinary(file);
      const imageUrl = uploadRes.secure_url;

      const payload = {
        ...values,
        image: imageUrl,
        id: session?.user.id,
      };

      const res = await axiosInstance.post("/post", payload);
      if (res.status === 200) {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  return (
    <Form {...form}>
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0] px-4 py-8">
        <div className="w-full max-w-2xl border-2 border-[#5c3d2e] bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-8">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-[#5c3d2e]">
              Upload Your Blog
            </h1>
            <p className="text-[#8b5e3c] text-sm md:text-base">
              Share your ideas with the world 🌍
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#5c3d2e]">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog title"
                      {...field}
                      className="border-[#e0c097] border focus:border-[#d7a86e] focus:ring-[#d7a86e] w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Content with Quill */}
            <FormField
              control={form.control}
              name="content"
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#5c3d2e]">Content</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "list",
                        "link",
                        "image",
                      ]}
                      placeholder="Write your blog content here..."
                      className="rounded-lg"
                      style={{
                        height: "180px",
                        marginBottom: "50px",
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <label
                htmlFor="blog-img"
                className="cursor-pointer px-4 py-2 border rounded-lg border-[#e0c097] flex gap-3 items-center hover:bg-[#f9f2ec] transition"
              >
                <span className="text-[#5c3d2e] font-medium">
                  Upload Blog Image
                </span>
                <FaRegImage className="text-xl text-[#5c3d2e]" />
                <input
                  type="file"
                  onChange={onChangeFile}
                  id="blog-img"
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {file && (
                <p className="text-sm text-[#5c3d2e]">
                  Selected: <span className="font-semibold">{file.name}</span>
                </p>
              )}
            </div>

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#5c3d2e]">Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full border-[#e0c097] border rounded-lg">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e0c097] border rounded-lg">
                      {blogCategories.map((cat, idx) => (
                        <SelectItem key={idx} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#d7a86e] hover:bg-[#c89666] text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Create Blog
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default UploadBlog;
