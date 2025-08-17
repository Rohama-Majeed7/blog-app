"use client";
import { axiosInstance } from "@/lib/axios";
import React, { useEffect, useState } from "react";
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
  post:{
    id: string;
    title: string;
  },
  user: {
    id: string;
    username: string;
  };
};
const Page = () => {
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [value, setValue] = useState<number>(0);
  const tabs = [
    { id: "posts", label: "📝 Posts" },
    { id: "users", label: "👤 Users" },
    { id: "comments", label: "💬 Comments" },
    { id: "likes", label: "❤️ Likes" },
  ];
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/admin/comments-count");
      if (res.status === 200) {
        setCommentsCount(res.data.commentsCount);
        setPostsCount(res.data.postsCount);
        setUsersCount(res.data.usersCount);
        setLikesCount(res.data.likesCount);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onDeletePost = async (postId: string) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete-post`, {
        data: { postId },
      });
      if (res.status === 200) {
        setValue(value + 1);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteUser = async (userId: string) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete-user`, {
        data: { userId },
      });
      if (res.status === 200) {
        setValue(value + 1);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteComment = async (commentId: string) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete-comment`, {
        data: { commentId },
      });
      if (res.status === 200) {
        setValue(value + 1);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteLike = async (likeId: string) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete-like`, {
        data: { likeId },
      });
      if (res.status === 200) {
        setValue(value + 1);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (activeTab === "posts") {
          const res = await axiosInstance.get("/blogs");
          setPosts(res.data);
        } else if (activeTab === "users") {
          const res = await axiosInstance.get("/users");
          setUsers(res.data);
        } else if (activeTab === "comments") {
          const res = await axiosInstance.get("/admin/comments");
          setComments(res.data);
        } else if (activeTab === "likes") {
          const res = await axiosInstance.get("/admin/likes");
          setLikes(res.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeTab, value]);

  return (
    <div className="min-h-screen bg-[#fdf6f0] py-10 px-6 max-w-[1150px] w-[98vw] mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#5c3d2e]">
          📊 Admin Dashboard
        </h1>
        <p className="text-lg text-[#a47148] mt-2">
          Manage and monitor your blog system
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="text-center mt-6 text-[#5c3d2e] text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {/* Comments */}
          <div className="bg-white border-2 p-6 rounded-2xl border-[#e0c097] shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#5c3d2e]">💬 Comments</h2>
            <p className="text-3xl mt-2 font-extrabold text-[#a47148]">
              {commentsCount}
            </p>
          </div>

          {/* Posts */}
          <div className="bg-white border-2 p-6 rounded-2xl border-[#e0c097] shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#5c3d2e]">📝 Posts</h2>
            <p className="text-3xl mt-2 font-extrabold text-[#a47148]">
              {postsCount}
            </p>
          </div>

          {/* Users */}
          <div className="bg-white border-2 p-6 rounded-2xl border-[#e0c097] shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#5c3d2e]">👤 Users</h2>
            <p className="text-3xl mt-2 font-extrabold text-[#a47148]">
              {usersCount}
            </p>
          </div>
          {/* likes */}
          <div className="bg-white border-2 p-6 rounded-2xl border-[#e0c097] shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#5c3d2e]">❤️ Likes</h2>
            <p className="text-3xl mt-2 font-extrabold text-[#a47148]">
              {likesCount}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 my-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full cursor-pointer font-semibold transition duration-300 ${
              activeTab === tab.id
                ? "bg-[#5c3d2e] text-white shadow-lg"
                : "bg-white text-[#5c3d2e] border border-[#e0c097] hover:bg-[#e0c097]/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-[#e0c097]">
        {activeTab === "posts" && (
          <div>
            <h2 className="text-2xl font-bold text-[#5c3d2e] mb-4">
              📝 Manage Posts
            </h2>
            <p className="text-[#a47148]">
              Here you can view and manage all your posts.
            </p>
            {/* 👉 Add posts table / list here */}
            {activeTab === "posts" && (
              <div>
                {loading ? (
                  <p className="text-center text-[#a47148]">Loading posts...</p>
                ) : posts.length === 0 ? (
                  <p className="text-center text-gray-500">No posts found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-[#e0c097] rounded-lg overflow-hidden">
                      <thead className="bg-[#fdf6f0]">
                        <tr>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Title
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Author
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Created At
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-[#fdf6f0]/60">
                            <td className="border border-[#e0c097] px-4 py-2">
                              {post.title}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {post.author?.username || "Unknown"}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td className="border-b border-[#e0c097] px-4 py-2 text-center flex md:flex-row flex-col items-center justify-center">
                              <button
                                onClick={() => onDeletePost(post.id)}
                                className="ml-2 px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold text-[#5c3d2e] mb-4">
              👤 Manage Users
            </h2>
            <p className="text-[#a47148]">
              Here you can view and manage all users.
            </p>
            {/* 👉 Add users table / list here */}
            {activeTab === "users" && (
              <div>
                {loading ? (
                  <p className="text-center text-[#a47148]">Loading users...</p>
                ) : users.length === 0 ? (
                  <p className="text-center text-gray-500">No users found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-[#e0c097] rounded-lg overflow-hidden">
                      <thead className="bg-[#fdf6f0]">
                        <tr>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Username
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Email
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Total Posts
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Total Comments
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Total Likes
                          </th>

                          <th className="border border-[#e0c097] px-4 py-2 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-[#fdf6f0]/60">
                            <td className="border border-[#e0c097] px-4 py-2">
                              {user.username}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {user.email}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {user.posts.length}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {user.comments.length}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {user.likes.length}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2 text-center">
                              <button
                                onClick={() => onDeleteUser(user.id)}
                                className="ml-2 px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h2 className="text-2xl font-bold text-[#5c3d2e] mb-4">
              💬 Manage Comments
            </h2>
            <p className="text-[#a47148]">
              Here you can view and manage all comments.
            </p>
            {/* 👉 Add users table / list here */}
            {activeTab === "comments" && (
              <div>
                {loading ? (
                  <p className="text-center text-[#a47148]">
                    Loading Comments...
                  </p>
                ) : comments.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No Commemts found.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-[#e0c097] rounded-lg overflow-hidden">
                      <thead className="bg-[#fdf6f0]">
                        <tr>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Commented By
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Content
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Commented Post
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments.map((comment) => (
                          <tr
                            key={comment.id}
                            className="hover:bg-[#fdf6f0]/60"
                          >
                            <td className="border border-[#e0c097] px-4 py-2">
                              {comment.author.username}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {comment.content}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2">
                              {comment.post.title}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2 text-center">
                              <button
                                onClick={() => onDeleteComment(comment.id)}
                                className="ml-2 px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === "likes" && (
          <div>
            <h2 className="text-2xl font-bold text-[#5c3d2e] mb-4">
              ❤️ Manage Likes
            </h2>
            <p className="text-[#a47148]">
              Here you can view and manage likes on your posts.
            </p>
            {/* 👉 Add users table / list here */}
            {activeTab === "likes" && (
              <div>
                {loading ? (
                  <p className="text-center text-[#a47148]">Loading likes...</p>
                ) : comments.length === 0 ? (
                  <p className="text-center text-gray-500">No Likes found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-[#e0c097] rounded-lg overflow-hidden">
                      <thead className="bg-[#fdf6f0]">
                        <tr>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Liked By
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-left">
                            Liked Post
                          </th>
                          <th className="border border-[#e0c097] px-4 py-2 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {likes.map((like) => (
                          <tr key={like.id} className="hover:bg-[#fdf6f0]/60">
                            <td className="border border-[#e0c097] px-4 py-2">
                              {like.user.username}
                            </td>

                            <td className="border border-[#e0c097] px-4 py-2">
                              {like.post.title}
                            </td>
                            <td className="border border-[#e0c097] px-4 py-2 text-center">
                              <button
                                onClick={() => onDeleteLike(like.id)}
                                className="ml-2 px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
