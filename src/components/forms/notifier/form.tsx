"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { monitors } from "@/data/monitors";

const schema = z.object({
  name: z.string(),
  webhookUrl: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function NotifierForm({
  defaultValues,
}: {
  defaultValues?: FormValues;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      name: "",
      webhookUrl: "",
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
      <form
        id="notifier-form"
        className="grid gap-4"
        onSubmit={form.handleSubmit(submitAction)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Notifier" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Enter a descriptive name for your notifier.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="webhookUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/webhook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-1.5">
          <Label>Monitors</Label>
          <FormDescription>
            Select the monitors you want to notify.
          </FormDescription>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="all" />
              <Label htmlFor="all">Select all</Label>
            </div>
            {monitors.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox id={String(item.id)} />
                <Label htmlFor={String(item.id)}>{item.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
