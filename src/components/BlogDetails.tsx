"use client";

import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ThumbsUp } from "lucide-react";

export default function BlogDetails({ blog }: { blog: any }) {
  const form = useForm({ defaultValues: { content: "" } });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <Drawer>
        <DrawerTrigger className="bg-[#5c3d2e] text-white p-2 rounded">Comment</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Type comment" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Send</Button>
                </form>
              </Form>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ThumbsUp />
    </div>
  );
}
