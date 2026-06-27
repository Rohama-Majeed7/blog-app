"use client";

import { axiosInstance } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  FileText,
  Users,
  Heart,
  Trash2,
  LayoutDashboard,
  Loader2,
} from "lucide-react";

type Post = {
  id: string;
  title: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
};

type User = {
  id: string;
  username: string;
  email: string;
  posts: Post[];
  comments: Comment[];
  likes: Like[];
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
  post: {
    id: string;
    title: string;
  };
};

type Like = {
  id: string;
  postId: string;
  userId: string;
  post: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    username: string;
  };
};

type TabType = "posts" | "users" | "comments" | "likes";

const Page = () => {
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number>(0);

  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<TabType>("posts");

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);

  const [refreshValue, setRefreshValue] = useState<number>(0);

  const tabs: {
    id: TabType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "posts",
      label: "Posts",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "comments",
      label: "Comments",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      id: "likes",
      label: "Likes",
      icon: <Heart className="h-4 w-4" />,
    },
  ];

  const stats = [
    {
      title: "Posts",
      value: postsCount,
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Users",
      value: usersCount,
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Comments",
      value: commentsCount,
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      title: "Likes",
      value: likesCount,
      icon: <Heart className="h-6 w-6" />,
    },
  ];

  const fetchStats = async () => {
    try {
      setLoadingStats(true);

      const res = await axiosInstance.get("/admin/comments-count");

      if (res.status === 200) {
        setCommentsCount(res.data.commentsCount || 0);
        setPostsCount(res.data.postsCount || 0);
        setUsersCount(res.data.usersCount || 0);
        setLikesCount(res.data.likesCount || 0);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchTabData = async () => {
    try {
      setLoadingTable(true);

      if (activeTab === "posts") {
        const res = await axiosInstance.get("/blogs");
        setPosts(res.data || []);
      }

      if (activeTab === "users") {
        const res = await axiosInstance.get("/users");
        setUsers(res.data || []);
      }

      if (activeTab === "comments") {
        const res = await axiosInstance.get("/admin/comments");
        setComments(res.data || []);
      }

      if (activeTab === "likes") {
        const res = await axiosInstance.get("/admin/likes");
        setLikes(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching tab data:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  const handleRefresh = () => {
    setRefreshValue((prev) => prev + 1);
  };

  const onDeletePost = async (postId: string) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this post?");
      if (!confirmed) return;

      const res = await axiosInstance.delete("/admin/delete-post", {
        data: { postId },
      });

      if (res.status === 200) {
        alert(res.data.message || "Post deleted successfully.");
        handleRefresh();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Unable to delete post.");
    }
  };

  const onDeleteUser = async (userId: string) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (!confirmed) return;

      const res = await axiosInstance.delete("/admin/delete-user", {
        data: { userId },
      });

      if (res.status === 200) {
        alert(res.data.message || "User deleted successfully.");
        handleRefresh();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Unable to delete user.");
    }
  };

  const onDeleteComment = async (commentId: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirmed) return;

      const res = await axiosInstance.delete("/admin/delete-comment", {
        data: { commentId },
      });

      if (res.status === 200) {
        alert(res.data.message || "Comment deleted successfully.");
        handleRefresh();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Unable to delete comment.");
    }
  };

  const onDeleteLike = async (likeId: string) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this like?");
      if (!confirmed) return;

      const res = await axiosInstance.delete("/admin/delete-like", {
        data: { likeId },
      });

      if (res.status === 200) {
        alert(res.data.message || "Like deleted successfully.");
        handleRefresh();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting like:", error);
      alert("Unable to delete like.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchTabData();
  }, [activeTab, refreshValue]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <section className="mb-8 rounded-3xl border border-[#ead8c8] bg-white p-6 shadow-xl shadow-[#5c3d2e]/5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20">
                <LayoutDashboard className="h-6 w-6" />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#5c3d2e] sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#8b5e3c] sm:text-base">
                Manage posts, users, comments, and likes from one professional
                dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8">
          {loadingStats ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-[#ead8c8] bg-white p-6 shadow-lg"
                >
                  <div className="h-10 w-10 rounded-2xl bg-[#f3dfc8]" />
                  <div className="mt-5 h-4 w-24 rounded-full bg-[#f3dfc8]" />
                  <div className="mt-3 h-8 w-16 rounded-full bg-[#f7eadc]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="group rounded-3xl border border-[#ead8c8] bg-white p-6 shadow-lg shadow-[#5c3d2e]/5 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#5c3d2e] transition group-hover:bg-[#5c3d2e] group-hover:text-white">
                      {stat.icon}
                    </div>

                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#8b5e3c]">
                      Total
                    </span>
                  </div>

                  <h2 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#8b5e3c]">
                    {stat.title}
                  </h2>

                  <p className="mt-2 text-4xl font-extrabold text-[#5c3d2e]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tabs */}
        <section className="mb-6 overflow-x-auto">
          <div className="flex min-w-max gap-3 rounded-3xl border border-[#ead8c8] bg-white p-2 shadow-lg shadow-[#5c3d2e]/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20"
                    : "text-[#5c3d2e] hover:bg-[#fff4ea] hover:text-[#c89666]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Content Card */}
        <section className="overflow-hidden rounded-3xl border border-[#ead8c8] bg-white shadow-2xl shadow-[#5c3d2e]/5">
          <div className="border-b border-[#ead8c8] bg-[#fffaf6] px-5 py-5 sm:px-6">
            <h2 className="text-2xl font-extrabold text-[#5c3d2e]">
              Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>

            <p className="mt-1 text-sm text-[#8b5e3c]">
              View and manage all {activeTab} in your blog system.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {loadingTable ? (
              <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-[#e0c097] bg-[#fffaf6]">
                <div className="flex items-center gap-2 text-[#5c3d2e]">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-semibold">Loading data...</span>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "posts" && (
                  <div>
                    {posts.length === 0 ? (
                      <EmptyState message="No posts found." />
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-[#ead8c8]">
                        <table className="w-full min-w-[760px] border-collapse text-sm">
                          <thead className="bg-[#fdf6f0] text-[#5c3d2e]">
                            <tr>
                              <TableHead>Title</TableHead>
                              <TableHead>Author</TableHead>
                              <TableHead>Created At</TableHead>
                              <TableHead className="text-center">Actions</TableHead>
                            </tr>
                          </thead>

                          <tbody>
                            {posts.map((post) => (
                              <tr
                                key={post.id}
                                className="border-t border-[#ead8c8] transition hover:bg-[#fffaf6]"
                              >
                                <TableCell>
                                  <span className="font-semibold text-[#5c3d2e]">
                                    {post.title}
                                  </span>
                                </TableCell>

                                <TableCell>
                                  {post.author?.username || "Unknown"}
                                </TableCell>

                                <TableCell>
                                  {new Date(post.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </TableCell>

                                <TableCell className="text-center">
                                  <DeleteButton
                                    onClick={() => onDeletePost(post.id)}
                                  />
                                </TableCell>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "users" && (
                  <div>
                    {users.length === 0 ? (
                      <EmptyState message="No users found." />
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-[#ead8c8]">
                        <table className="w-full min-w-[920px] border-collapse text-sm">
                          <thead className="bg-[#fdf6f0] text-[#5c3d2e]">
                            <tr>
                              <TableHead>Username</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Total Posts</TableHead>
                              <TableHead>Total Comments</TableHead>
                              <TableHead>Total Likes</TableHead>
                              <TableHead className="text-center">Actions</TableHead>
                            </tr>
                          </thead>

                          <tbody>
                            {users.map((user) => (
                              <tr
                                key={user.id}
                                className="border-t border-[#ead8c8] transition hover:bg-[#fffaf6]"
                              >
                                <TableCell>
                                  <span className="font-semibold text-[#5c3d2e]">
                                    {user.username}
                                  </span>
                                </TableCell>

                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.posts?.length || 0}</TableCell>
                                <TableCell>
                                  {user.comments?.length || 0}
                                </TableCell>
                                <TableCell>{user.likes?.length || 0}</TableCell>

                                <TableCell className="text-center">
                                  <DeleteButton
                                    onClick={() => onDeleteUser(user.id)}
                                  />
                                </TableCell>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "comments" && (
                  <div>
                    {comments.length === 0 ? (
                      <EmptyState message="No comments found." />
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-[#ead8c8]">
                        <table className="w-full min-w-[820px] border-collapse text-sm">
                          <thead className="bg-[#fdf6f0] text-[#5c3d2e]">
                            <tr>
                              <TableHead>Commented By</TableHead>
                              <TableHead>Content</TableHead>
                              <TableHead>Commented Post</TableHead>
                              <TableHead className="text-center">Actions</TableHead>
                            </tr>
                          </thead>

                          <tbody>
                            {comments.map((comment) => (
                              <tr
                                key={comment.id}
                                className="border-t border-[#ead8c8] transition hover:bg-[#fffaf6]"
                              >
                                <TableCell>
                                  <span className="font-semibold text-[#5c3d2e]">
                                    {comment.author?.username || "Unknown"}
                                  </span>
                                </TableCell>

                                <TableCell>
                                  <p className="max-w-md truncate">
                                    {comment.content}
                                  </p>
                                </TableCell>

                                <TableCell>
                                  {comment.post?.title || "Unknown post"}
                                </TableCell>

                                <TableCell className="text-center">
                                  <DeleteButton
                                    onClick={() =>
                                      onDeleteComment(comment.id)
                                    }
                                  />
                                </TableCell>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "likes" && (
                  <div>
                    {likes.length === 0 ? (
                      <EmptyState message="No likes found." />
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-[#ead8c8]">
                        <table className="w-full min-w-[700px] border-collapse text-sm">
                          <thead className="bg-[#fdf6f0] text-[#5c3d2e]">
                            <tr>
                              <TableHead>Liked By</TableHead>
                              <TableHead>Liked Post</TableHead>
                              <TableHead className="text-center">Actions</TableHead>
                            </tr>
                          </thead>

                          <tbody>
                            {likes.map((like) => (
                              <tr
                                key={like.id}
                                className="border-t border-[#ead8c8] transition hover:bg-[#fffaf6]"
                              >
                                <TableCell>
                                  <span className="font-semibold text-[#5c3d2e]">
                                    {like.user?.username || "Unknown"}
                                  </span>
                                </TableCell>

                                <TableCell>
                                  {like.post?.title || "Unknown post"}
                                </TableCell>

                                <TableCell className="text-center">
                                  <DeleteButton
                                    onClick={() => onDeleteLike(like.id)}
                                  />
                                </TableCell>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

const TableHead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={`whitespace-nowrap px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wide ${className}`}
    >
      {children}
    </th>
  );
};

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td className={`px-5 py-4 text-[#6f4a36] ${className}`}>{children}</td>
  );
};

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-red-500/20 transition hover:bg-red-600"
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-[#e0c097] bg-[#fffaf6] px-4 text-center">
      <p className="font-semibold text-[#8b5e3c]">{message}</p>
    </div>
  );
};

export default Page;