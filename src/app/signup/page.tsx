"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";

type User = {
  username: string;
  email: string;
  password: string;
};

function SignupPage() {
  const form = useForm<User>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: User) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/signup", values);

      if (res.status === 200) {
        alert(res.data.message);
        form.reset();
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6f0] to-[#fbe8d3] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md md:max-w-lg bg-white shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6 border border-[#f4e1d2] transition-all hover:shadow-xl">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#5c3d2e]">
              Join Our Blog ✨
            </h1>
            <p className="text-[#8d6e63] text-sm sm:text-base">
              Create your account and start sharing your stories
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full"
          >
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#5c3d2e]">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      {...field}
                      className="border-[#e0c097] focus:border-[#d7a86e] focus:ring-[#d7a86e] rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
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
                  <FormLabel className="text-[#5c3d2e]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      type="email"
                      {...field}
                      className="border-[#e0c097] focus:border-[#d7a86e] focus:ring-[#d7a86e] rounded-lg"
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
                      placeholder="Enter password"
                      type="password"
                      {...field}
                      className="border-[#e0c097] focus:border-[#d7a86e] focus:ring-[#d7a86e] rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d7a86e] hover:bg-[#c89666] text-white py-2 rounded-lg text-base sm:text-lg transition-transform transform hover:scale-105 shadow-md"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* Already have account */}
            <p className="text-sm text-center text-[#8d6e63]">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#b07d62] hover:underline font-medium"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default SignupPage;
