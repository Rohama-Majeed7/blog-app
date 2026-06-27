"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle, Send, ThumbsUp, X, Loader2 } from "lucide-react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type BlogDetailsProps = {
  blog: {
    id: string;
    title: string;
    category?: string;
    content?: string;
  };
};

type CommentFormType = {
  content: string;
};

export default function BlogDetails({ blog }: BlogDetailsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  const form = useForm<CommentFormType>({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: CommentFormType) => {
    try {
      setIsSubmitting(true);

      console.log({
        postId: blog.id,
        content: values.content,
      });

      // API call yahan add karna:
      // await axiosInstance.post("/comments", {
      //   postId: blog.id,
      //   content: values.content,
      // });

      form.reset();
    } catch (error) {
      console.log("Comment error:", error);
      alert("Unable to post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-lg shadow-[#5c3d2e]/5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 w-fit rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#8b5e3c]">
            {blog.category || "Blog"}
          </p>

          <h1 className="line-clamp-2 text-2xl font-extrabold leading-tight text-[#5c3d2e] sm:text-3xl">
            {blog.title}
          </h1>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
              liked
                ? "border-[#5c3d2e] bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20"
                : "border-[#e0c097] bg-[#fffaf6] text-[#5c3d2e] hover:bg-[#fff4ea]"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            {liked ? "Liked" : "Like"}
          </button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button className="h-11 rounded-xl bg-[#d7a86e] px-4 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666]">
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
              </Button>
            </DrawerTrigger>

            <DrawerContent className="border-[#ead8c8] bg-[#fdf6f0]">
              <div className="mx-auto w-full max-w-2xl px-4 pb-6">
                <DrawerHeader className="px-0 text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DrawerTitle className="text-2xl font-extrabold text-[#5c3d2e]">
                        Write a Comment
                      </DrawerTitle>

                      <DrawerDescription className="mt-2 text-sm leading-6 text-[#8b5e3c]">
                        Share your thoughts about this blog. Keep your comment
                        clear and respectful.
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

                <div className="rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-lg shadow-[#5c3d2e]/5 sm:p-5">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="content"
                        rules={{
                          required: "Comment is required",
                          minLength: {
                            value: 3,
                            message: "Comment must be at least 3 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type your comment..."
                                className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                              />
                            </FormControl>
                            <FormMessage className="text-sm text-red-500" />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <DrawerClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-11 rounded-xl border-[#e0c097] bg-white px-6 font-semibold text-[#5c3d2e] transition hover:bg-[#fff4ea]"
                          >
                            Cancel
                          </Button>
                        </DrawerClose>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-11 rounded-xl bg-[#d7a86e] px-6 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send Comment
                            </span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>

                <DrawerFooter className="px-0" />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </section>
  );
}