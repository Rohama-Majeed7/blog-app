"use client";

import { useForm } from "react-hook-form";
import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { blogCategories } from "@/types/type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

type SearchToolsType = {
  search: string;
  category: string;
};

function SearchTools() {
  const form = useForm<SearchToolsType>({
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const onSubmit = async (values: SearchToolsType) => {
    try {
      console.log(values);
    } catch (error) {
      alert("Internal Server Error");
    }
  };

  const handleReset = () => {
    form.reset({
      search: "",
      category: "",
    });
  };

  return (
    <div className="w-full rounded-3xl border border-[#ead8c8] bg-white p-4 shadow-lg shadow-[#5c3d2e]/5 sm:p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 lg:flex-row lg:items-start"
        >
          {/* Search Input */}
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5e3c]" />

                    <Input
                      placeholder="Search blog by title..."
                      {...field}
                      className="h-12 w-full rounded-xl border-[#e0c097] bg-[#fffaf6] pl-12 pr-4 text-[#5c3d2e] placeholder:text-[#b18b6b] focus-visible:ring-[#d7a86e]"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          {/* Category + Buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[220px]">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 w-full rounded-xl border-[#e0c097] bg-[#fffaf6] text-[#5c3d2e] focus:ring-[#d7a86e]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-xl border-[#e0c097] bg-white">
                      {blogCategories.map((cat, idx) => (
                        <SelectItem key={idx} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                className="h-12 flex-1 rounded-xl bg-[#d7a86e] px-6 font-semibold text-white shadow-md shadow-[#d7a86e]/30 transition hover:bg-[#c89666] sm:flex-none"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="h-12 flex-1 rounded-xl border-[#e0c097] bg-white px-5 font-semibold text-[#5c3d2e] transition hover:bg-[#fff4ea] sm:flex-none"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SearchTools;