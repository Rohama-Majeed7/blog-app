"use client";

import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { blogCategories } from "@/types/type";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

// import DOMPurify from "dompurify"; // optional, for security

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type postType = {
  search: string;
  category: string;
};

function SearchTools() {
  const form = useForm<postType>({
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const onSubmit = async (values: postType) => {
    try {
      console.log(values);
      
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  return (
    <Form {...form}>
      {/* Form */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex md:flex-row flex-col md:justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Enter category"
                  {...field}
                  className="border-[#e0c097] border-1 focus:border-[#d7a86e] focus:ring-[#d7a86e]"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px] border-[#e0c097] border-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e0c097] border-1">
                    {blogCategories.map((cat, idx) => (
                      <SelectItem key={idx} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className=" bg-[#d7a86e] hover:bg-[#c89666] text-white py-2 rounded-md transition"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SearchTools;
