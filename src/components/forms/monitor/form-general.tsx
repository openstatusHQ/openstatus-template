"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Globe, Network, Plus, X } from "lucide-react";
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
} from "@/components/forms/form-card";
import { DevTool } from "@hookform/devtools";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TYPES = ["HTTP", "TCP"] as const;
const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(TYPES),
  method: z.enum(METHODS),
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
      type: undefined,
      method: "GET",
      url: "",
      headers: [],
      body: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const watchType = form.watch("type");
  const watchMethod = form.watch("method");

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
          <FormCardContent>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monitoring Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4 grid-cols-2 sm:grid-cols-4"
                    >
                      <FormItem className="border-input has-aria-[invalid=true]:border-destructive has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-row items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                        <FormControl>
                          <RadioGroupItem value="HTTP" className="sr-only" />
                        </FormControl>
                        <Globe
                          className="text-muted-foreground shrink-0"
                          size={16}
                          aria-hidden="true"
                        />
                        <FormLabel className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0">
                          HTTP
                        </FormLabel>
                      </FormItem>
                      <FormItem className="border-input has-aria-[invalid=true]:border-destructive has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-row items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                        <FormControl>
                          <RadioGroupItem value="TCP" className="sr-only" />
                        </FormControl>
                        <Network
                          className="text-muted-foreground shrink-0"
                          size={16}
                          aria-hidden="true"
                        />
                        <FormLabel className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0">
                          TCP
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormCardContent>
          {watchType ? <FormCardSeparator /> : null}
          {watchType === "HTTP" && (
            <FormCardContent className="grid gap-4 grid-cols-4">
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {METHODS.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
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
                  <FormItem className="col-span-3">
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://openstatus.dev" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headers"
                render={({ field }) => (
                  <FormItem className="col-span-full">
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
                        variant="outline"
                        type="button"
                        onClick={() => {
                          field.onChange([
                            ...field.value,
                            { key: "", value: "" },
                          ]);
                        }}
                      >
                        <Plus />
                        Add Header
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchMethod === "POST" && (
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>Write your payload</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="grid gap-1.5 col-span-full">
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
                <div className="flex flex-wrap gap-1.5">
                  <Button variant="outline" size="sm" type="button">
                    <Plus />
                    Status assertion
                  </Button>
                  <Button variant="outline" size="sm" type="button">
                    <Plus />
                    Header assertion
                  </Button>
                  <Button variant="outline" size="sm" type="button">
                    <Plus />
                    Body assertion
                  </Button>
                </div>
              </div>
            </FormCardContent>
          )}
          {watchType === "TCP" && (
            <FormCardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host:Port</FormLabel>
                    <FormControl>
                      <Input placeholder="127.0.0.0.1:8080" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The input supports both IPv4 addresses and IPv6 addresses.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground">
                Examples:
                <ul className="list-disc list-inside">
                  <li>
                    Domain:{" "}
                    <span className="font-mono text-foreground">
                      openstatus.dev:443
                    </span>
                  </li>
                  <li>
                    IPv4:{" "}
                    <span className="font-mono text-foreground">
                      192.168.1.1:443
                    </span>
                  </li>
                  <li>
                    IPv6:{" "}
                    <span className="font-mono text-foreground">
                      [2001:db8:85a3:8d3:1319:8a2e:370:7348]:443
                    </span>
                  </li>
                </ul>
              </div>
            </FormCardContent>
          )}
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
