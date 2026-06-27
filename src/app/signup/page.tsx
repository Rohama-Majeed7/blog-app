"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PenLine,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type User = {
  username: string;
  email: string;
  password: string;
};

function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<User>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: User) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/signup", {
        username: values.username.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      if (res.status === 200) {
        alert(res.data.message || "Account created successfully.");
        form.reset();
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdf6f0] to-[#f5e6d8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#5c3d2e]/10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Side */}
          <section className="hidden bg-[#5c3d2e] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <PenLine className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-extrabold leading-tight">
                Join Romi.Blogs
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                Create your account, publish your blogs, share ideas, and become
                part of a growing writing community.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white/90">
                Start your blogging journey
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                A clean space to write, learn, comment, and inspire others.
              </p>
            </div>
          </section>

          {/* Form Side */}
          <section className="p-5 sm:p-8 md:p-10">
            <Form {...form}>
              <div className="mx-auto w-full max-w-md">
                {/* Mobile Logo */}
                <div className="mb-6 flex items-center justify-center lg:hidden">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5c3d2e] text-white shadow-md shadow-[#5c3d2e]/20">
                    <PenLine className="h-7 w-7" />
                  </div>
                </div>

                {/* Heading */}
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#5c3d2e] sm:text-4xl">
                    Create Account
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-[#8b5e3c] sm:text-base">
                    Sign up and start sharing your stories.
                  </p>
                </div>

                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    rules={{
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-[#5c3d2e]">
                          Username
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5e3c]" />

                            <Input
                              placeholder="Enter username"
                              autoComplete="username"
                              {...field}
                              className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] pl-12 text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                            />
                          </div>
                        </FormControl>

                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-[#5c3d2e]">
                          Email Address
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5e3c]" />

                            <Input
                              placeholder="Enter email"
                              type="email"
                              autoComplete="email"
                              {...field}
                              className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] pl-12 text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                            />
                          </div>
                        </FormControl>

                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-[#5c3d2e]">
                          Password
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5e3c]" />

                            <Input
                              placeholder="Enter password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              {...field}
                              className="h-12 rounded-xl border-[#e0c097] bg-[#fffaf6] pl-12 pr-12 text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b5e3c] transition hover:text-[#5c3d2e]"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-xl bg-[#d7a86e] text-base font-bold text-white shadow-lg shadow-[#d7a86e]/30 transition hover:bg-[#c89666] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>

                  {/* Login */}
                  <p className="pt-2 text-center text-sm text-[#8b5e3c]">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-[#b07d62] transition hover:text-[#5c3d2e] hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                </form>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;