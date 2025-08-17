"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type user = {
  email: string;
  password: string;
};

function Page() {
  const form = useForm<user>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: user) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    console.log("Login response:", res);

    if (res.url !== null) {
      alert("Login Successful ✅");
      router.push("/");
    } else {
      alert("❌ Invalid email or password");
    }
  };

  return (
    <Form {...form}>
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 border border-[#f4e1d2] transition-transform hover:scale-[1.01]">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5c3d2e]">
              Welcome Back 👋
            </h1>
            <p className="text-sm sm:text-base text-[#8d6e63]">
              Login to your account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full"
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
                  <FormLabel className="text-[#5c3d2e]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      className="border-[#e0c097] focus:border-[#d7a86e] focus:ring-[#d7a86e]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
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
                  <FormLabel className="text-[#5c3d2e]">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="border-[#e0c097] focus:border-[#d7a86e] focus:ring-[#d7a86e]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#d7a86e] hover:bg-[#c89666] text-white py-2 sm:py-3 text-base rounded-lg transition shadow-md"
            >
              Login
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-grow border-t border-[#e0c097]"></div>
              <span className="text-[#8d6e63] text-sm sm:text-base">or</span>
              <div className="flex-grow border-t border-[#e0c097]"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                onClick={() => signIn("google")}
                className="w-full bg-white border border-[#e0c097] text-[#5c3d2e] hover:bg-[#f4e1d2] flex items-center justify-center gap-2 py-2 sm:py-3 rounded-lg transition"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </Button>

              <Button
                type="button"
                onClick={() => signIn("github")}
                className="w-full bg-[#24292e] hover:bg-black text-white flex items-center justify-center gap-2 py-2 sm:py-3 rounded-lg transition"
              >
                <FaGithub className="w-5 h-5" />
                Continue with GitHub
              </Button>
            </div>

            {/* Already have account */}
            <p className="text-sm text-center text-[#8d6e63]">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-[#b07d62] hover:underline font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default Page;
