"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PenLine,
} from "lucide-react";

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

type User = {
  email: string;
  password: string;
};

function Page() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: User) => {
    try {
      setIsSubmitting(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        alert("Login Successful ✅");
        router.push("/");
        router.refresh();
      } else {
        alert("❌ Invalid email or password");
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                Welcome Back to Romi.Blogs
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                Login to write blogs, share your ideas, like posts, and join the
                conversation.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white/90">
                Keep writing. Keep inspiring.
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Your dashboard, blogs, comments, and likes are waiting for you.
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
                    Welcome Back
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-[#8b5e3c] sm:text-base">
                    Login to continue to your account.
                  </p>
                </div>

                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
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
                              placeholder="Enter your email"
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
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
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
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl bg-[#d7a86e] text-base font-bold text-white shadow-lg shadow-[#d7a86e]/30 transition hover:bg-[#c89666] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="h-px flex-1 bg-[#ead8c8]" />
                    <span className="text-sm font-medium text-[#8b5e3c]">
                      or continue with
                    </span>
                    <div className="h-px flex-1 bg-[#ead8c8]" />
                  </div>

                  {/* Social Login */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      type="button"
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      variant="outline"
                      className="h-12 rounded-xl border-[#e0c097] bg-white font-semibold text-[#5c3d2e] transition hover:bg-[#fff4ea]"
                    >
                      <FcGoogle className="mr-2 h-5 w-5" />
                      Google
                    </Button>

                    <Button
                      type="button"
                      onClick={() => signIn("github", { callbackUrl: "/" })}
                      className="h-12 rounded-xl bg-[#24292e] font-semibold text-white transition hover:bg-black"
                    >
                      <FaGithub className="mr-2 h-5 w-5" />
                      GitHub
                    </Button>
                  </div>

                  {/* Signup */}
                  <p className="pt-2 text-center text-sm text-[#8b5e3c]">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-bold text-[#b07d62] transition hover:text-[#5c3d2e] hover:underline"
                    >
                      Sign up
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

export default Page;