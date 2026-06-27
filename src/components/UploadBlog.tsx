"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { FaRegImage } from "react-icons/fa6";
import { Loader2, UploadCloud, X } from "lucide-react";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { axiosInstance } from "@/lib/axios";
import { blogCategories } from "@/types/type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

type PostType = {
  title: string;
  content: string;
  category: string;
  status: boolean;
};

function UploadBlog() {
  const { data: session } = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostType>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      status: false,
    },
  });

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [file]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl("");
  };

  const onSubmit = async (values: PostType) => {
    try {
      if (!file) {
        alert("Please select a blog image.");
        return;
      }

      if (!session?.user?.id) {
        alert("Please login first.");
        return;
      }

      setIsSubmitting(true);

      const uploadRes = await uploadToCloudinary(file);
      const imageUrl = uploadRes.secure_url;

      const payload = {
        ...values,
        image: imageUrl,
        id: session.user.id,
      };

      const res = await axiosInstance.post("/post", payload);

      if (res.status === 200) {
        alert(res.data.message || "Blog created successfully.");
        form.reset();
        setFile(null);
        setPreviewUrl("");
      }
    } catch (error) {
      console.log("Error creating blog:", error);
      alert("Something went wrong while creating the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Side */}
          <div className="hidden bg-[#5c3d2e] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <UploadCloud className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-extrabold leading-tight">
                Upload Your Blog
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                Share your thoughts, ideas, tutorials, and stories with your
                audience in a clean and professional way.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-medium text-white/90">
                Tip for better blogs
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Use a clear title, high-quality image, and organized content to
                make your blog more readable.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-5 sm:p-8 md:p-10">
            <Form {...form}>
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-2xl font-extrabold text-[#5c3d2e] sm:text-3xl">
                  Create New Blog
                </h2>
                <p className="mt-2 text-sm text-[#8b5e3c] sm:text-base">
                  Share your ideas with the world 🌍
                </p>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{
                    required: "Title is required",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#5c3d2e]">
                        Blog Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter blog title"
                          {...field}
                          className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="font-semibold text-[#5c3d2e]">
                    Blog Image
                  </label>

                  {!previewUrl ? (
                    <label
                      htmlFor="blog-img"
                      className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e0c097] bg-[#fffaf6] px-4 py-8 text-center transition hover:border-[#d7a86e] hover:bg-[#fff4ea]"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3dfc8]">
                        <FaRegImage className="text-2xl text-[#5c3d2e]" />
                      </div>

                      <p className="text-sm font-semibold text-[#5c3d2e]">
                        Click to upload blog image
                      </p>
                      <p className="mt-1 text-xs text-[#8b5e3c]">
                        PNG, JPG, JPEG up to 5MB
                      </p>

                      <input
                        type="file"
                        onChange={onChangeFile}
                        id="blog-img"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border border-[#e0c097] bg-[#fffaf6]">
                      <img
                        src={previewUrl}
                        alt="Blog preview"
                        className="h-52 w-full object-cover sm:h-64 md:h-72"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#5c3d2e] shadow-md transition hover:bg-white"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <div className="border-t border-[#e0c097] px-4 py-3">
                        <p className="truncate text-sm text-[#5c3d2e]">
                          Selected:{" "}
                          <span className="font-semibold">{file?.name}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#5c3d2e]">
                        Category
                      </FormLabel>

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

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  rules={{
                    required: "Content is required",
                    validate: (value) => {
                      const plainText = value.replace(/<(.|\n)*?>/g, "").trim();

                      return (
                        plainText.length >= 20 ||
                        "Content must be at least 20 characters"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#5c3d2e]">
                        Blog Content
                      </FormLabel>

                      <FormControl>
                        <div
                          className="
                            overflow-hidden rounded-2xl border border-[#e0c097] bg-white
                            [&_.ql-toolbar]:border-0
                            [&_.ql-toolbar]:border-b
                            [&_.ql-toolbar]:border-[#e0c097]
                            [&_.ql-toolbar]:bg-[#fffaf6]
                            [&_.ql-toolbar]:overflow-x-auto
                            [&_.ql-toolbar]:whitespace-nowrap
                            [&_.ql-container]:min-h-[180px]
                            [&_.ql-container]:border-0
                            [&_.ql-container]:text-[15px]
                            sm:[&_.ql-container]:min-h-[220px]
                            [&_.ql-editor]:min-h-[180px]
                            [&_.ql-editor]:text-[#5c3d2e]
                            [&_.ql-editor]:leading-7
                            sm:[&_.ql-editor]:min-h-[220px]
                            [&_.ql-editor.ql-blank::before]:text-[#b18b6b]
                            [&_.ql-editor.ql-blank::before]:not-italic
                          "
                        >
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={{
                              toolbar: [
                                ["bold", "italic", "underline", "strike"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link"],
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
                            ]}
                            placeholder="Write your blog content here..."
                          />
                        </div>
                      </FormControl>

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-xl bg-[#d7a86e] text-base font-bold text-white shadow-lg shadow-[#d7a86e]/30 transition hover:bg-[#c89666] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Blog...
                    </span>
                  ) : (
                    "Create Blog"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadBlog;