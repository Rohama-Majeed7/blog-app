"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { BookOpen, Loader2, PenLine, Sparkles } from "lucide-react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4">
        <div className="rounded-3xl border border-[#ead8c8] bg-white px-8 py-7 text-center shadow-xl shadow-[#5c3d2e]/10">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#5c3d2e]" />
          <p className="mt-4 text-sm font-semibold text-[#5c3d2e]">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdf6f0] px-4">
        <p className="text-center font-semibold text-[#5c3d2e]">
          Redirecting to login...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[#ead8c8] bg-white shadow-2xl shadow-[#5c3d2e]/10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Section */}
          <div className="hidden bg-[#5c3d2e] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <BookOpen className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-extrabold leading-tight">
                Share your ideas with the world
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                Create blogs, publish your thoughts, and connect with readers
                through comments and likes.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white/90">
                Start writing today
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                A simple and clean space for your stories, tutorials, and ideas.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mx-auto max-w-xl text-center lg:text-left">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20 lg:mx-0">
                <Sparkles className="h-8 w-8" />
              </div>

              <p className="mb-3 inline-flex rounded-full bg-[#fff7ed] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#8b5e3c]">
                Welcome back
              </p>

              <h1 className="text-3xl font-extrabold leading-tight text-[#5c3d2e] sm:text-4xl lg:text-5xl">
                Hi, {session.user.name || "Writer"} 👋
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#8b5e3c] sm:text-base">
                Ready to share your thoughts with the world? Start by creating a
                new blog post or explore published blogs from other writers.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/upload-blog"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#d7a86e] px-6 text-sm font-bold text-white shadow-lg shadow-[#d7a86e]/30 transition hover:bg-[#c89666]"
                >
                  <PenLine className="h-4 w-4" />
                  Create Blog
                </Link>

                <Link
                  href="/blogs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#e0c097] bg-white px-6 text-sm font-bold text-[#5c3d2e] transition hover:bg-[#fff4ea]"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore Blogs
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#ead8c8] bg-[#fffaf6] p-4">
                  <p className="text-2xl font-extrabold text-[#5c3d2e]">Write</p>
                  <p className="mt-1 text-xs text-[#8b5e3c]">
                    Create fresh content
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ead8c8] bg-[#fffaf6] p-4">
                  <p className="text-2xl font-extrabold text-[#5c3d2e]">Share</p>
                  <p className="mt-1 text-xs text-[#8b5e3c]">
                    Publish your ideas
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ead8c8] bg-[#fffaf6] p-4">
                  <p className="text-2xl font-extrabold text-[#5c3d2e]">
                    Inspire
                  </p>
                  <p className="mt-1 text-xs text-[#8b5e3c]">
                    Connect with readers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;