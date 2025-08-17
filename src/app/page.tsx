"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center mt-20 text-[#5c3d2e]">Loading...</div>;
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-[#fdf6f0] p-6">
      {session?.user ? (
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#5c3d2e] mb-4">
            Welcome, {session.user.name} 👋
          </h1>
          <p className="text-[#8d6e63] mb-8">
            Ready to share your thoughts with the world? Start by creating a new blog post.
          </p>
          <Link
            href="/upload-blog"
            className="inline-block px-6 py-3 bg-[#d7a86e] hover:bg-[#c89666] text-white font-semibold rounded-lg transition"
          >
          Create Blog
          </Link>
        </div>
      ) : (
        <div className="text-center text-[#5c3d2e] mt-20">
          Redirecting to login...
        </div>
      )}
    </div>
  );
};

export default Page;
