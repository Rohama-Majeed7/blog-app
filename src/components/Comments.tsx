"use client";

import { axiosInstance } from "@/lib/axios";
import { MessageCircle, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

type CommentType = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: {
    id: string;
    username: string;
    email: string;
  };
};

const Comments = ({ id, value }: { id: string; value: number }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get(`/comments/${id}`);

      if (res.status === 200) {
        setComments(res.data.comments || []);
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
      setError("Unable to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id, value]);

  if (loading) {
    return (
      <div className="w-full space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-[#ead8c8] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#f3dfc8]" />
              <div className="space-y-2">
                <div className="h-3 w-32 rounded-full bg-[#f3dfc8]" />
                <div className="h-3 w-44 rounded-full bg-[#f7eadc]" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded-full bg-[#f7eadc]" />
              <div className="h-3 w-4/5 rounded-full bg-[#f7eadc]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-center text-sm font-medium text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full space-y-5">
      {/* Comments Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#5c3d2e] sm:text-2xl">
            <MessageCircle className="h-5 w-5" />
            Comments
          </h2>
          <p className="mt-1 text-sm text-[#8b5e3c]">
            {comments.length} {comments.length === 1 ? "comment" : "comments"} on
            this blog
          </p>
        </div>
      </div>

      {/* Empty State */}
      {comments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#e0c097] bg-[#fffaf6] px-5 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3dfc8] text-[#5c3d2e]">
            <MessageCircle className="h-7 w-7" />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#5c3d2e]">
            No comments yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8b5e3c]">
            Be the first to share your thoughts about this blog.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const username = comment.author?.username || "Anonymous";
            const email = comment.author?.email || "";
            const firstLetter = username.charAt(0).toUpperCase();

            return (
              <article
                key={comment.id}
                className="rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5c3d2e] text-base font-bold text-white shadow-md shadow-[#5c3d2e]/20">
                    {firstLetter || <UserCircle className="h-6 w-6" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#5c3d2e] sm:text-base">
                          {username}
                        </h3>

                        {email && (
                          <p className="truncate text-xs text-[#8b5e3c]">
                            {email}
                          </p>
                        )}
                      </div>

                      <span className="w-fit rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold text-[#8b5e3c]">
                        #{comment.id.slice(0, 6)}
                      </span>
                    </div>

                    {/* Body */}
                    <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-gray-700 sm:text-base">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Comments;