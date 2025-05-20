"use client";

import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardSeparator,
  FormCardTitle,
} from "../form-card";
import { DevTool } from "@hookform/devtools";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  url: z.string(),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
  body: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function FormGeneral() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      method: "GET",
      url: "",
      headers: [],
      body: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  function submitAction(values: FormValues) {
    if (isPending) return;

    startTransition(async () => {
      try {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000));
        toast.promise(promise, {
          loading: "Saving...",
          success: () => JSON.stringify(values),
          error: "Failed to save",
        });
        await promise;
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitAction)}>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Monitor Configuration</FormCardTitle>
            <FormCardDescription>
              Configure your monitor settings and endpoints.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="OpenStatus API" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Displayed on the status page.
                  </FormDescription>
                </FormItem>
              )}
            />
          </FormCardContent>
          <FormCardSeparator />
          <FormCardContent className="grid gap-4">
            <Tabs defaultValue="http">
              <TabsList>
                <TabsTrigger value="http">HTTP</TabsTrigger>
                <TabsTrigger value="tcp">TCP</TabsTrigger>
              </TabsList>
              <TabsContent value="http" className="grid gap-4">
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://openstatus.dev"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="headers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Headers</FormLabel>
                      {field.value.map((header, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-center gap-2"
                        >
                          <Input
                            placeholder="Key"
                            value={header.key}
                            onChange={(e) => {
                              const newHeaders = [...field.value];
                              newHeaders[index] = {
                                ...newHeaders[index],
                                key: e.target.value,
                              };
                              field.onChange(newHeaders);
                            }}
                          />
                          <Input
                            placeholder="Value"
                            value={header.value}
                            onChange={(e) => {
                              const newHeaders = [...field.value];
                              newHeaders[index] = {
                                ...newHeaders[index],
                                value: e.target.value,
                              };
                              field.onChange(newHeaders);
                            }}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              const newHeaders = field.value.filter(
                                (_, i) => i !== index
                              );
                              field.onChange(newHeaders);
                            }}
                          >
                            <X />
                          </Button>
                        </div>
                      ))}
                      <div>
                        <Button
                          size="sm"
                          onClick={() => {
                            field.onChange([
                              ...field.value,
                              { key: "", value: "" },
                            ]);
                          }}
                        >
                          Add Header
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>Write your payload</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-1.5">
                  <FormLabel>Assertions</FormLabel>
                  <FormDescription>
                    Validate the response to ensure your service is working as
                    expected.
                    <br />
                    By default, we check for a{" "}
                    <span className="text-foreground font-medium">
                      2xx status code
                    </span>
                    .
                  </FormDescription>
                  <div className="flex gap-1.5">
                    <Button variant="outline">
                      <Plus />
                      Status assertion
                    </Button>
                    <Button variant="outline">
                      <Plus />
                      Header assertion
                    </Button>
                    <Button variant="outline">
                      <Plus />
                      Body assertion
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tcp" className="grid gap-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URI</FormLabel>
                      <FormControl>
                        <Input placeholder="127.0.0.0.1:8080" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <EmptyStateContainer>
                  <EmptyStateTitle>No assertions for TCP</EmptyStateTitle>
                </EmptyStateContainer>
              </TabsContent>
            </Tabs>
          </FormCardContent>
          <FormCardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </FormCardFooter>
        </FormCard>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
}
