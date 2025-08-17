import { axiosInstance } from "@/lib/axios";
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

  const fetchComments = async () => {
    const res = await axiosInstance.get(`/comments/${id}`);
    if (res.status === 200) {
      setComments(res.data.comments);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [value]);

  if (loading) {
    return (
      <div className="text-center py-4 text-[#5c3d2e] font-medium animate-pulse">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full px-2">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-2 p-4 rounded-lg border border-[#e0c097] bg-[#fff9f5] shadow-sm hover:shadow-md transition w-full"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#c89566] flex items-center justify-center text-white font-semibold">
                  {comment.author.username.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#5c3d2e]">
                  {comment.author.username}
                </h3>
              </div>
              <span className="text-xs text-gray-500 italic">
                ID: {comment.id.slice(0, 6)}...
              </span>
            </div>

            {/* Body */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {comment.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
