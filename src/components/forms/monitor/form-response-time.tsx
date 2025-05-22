"use client";

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
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { toast } from "sonner";

const DEGRADED = 30_000;
const TIMEOUT = 45_000;

const schema = z.object({
  degraded: z.number(),
  timeout: z.number(),
});

type FormValues = z.infer<typeof schema>;

export function FormResponseTime({
  defaultValues,
  onSubmit,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  defaultValues?: FormValues;
  onSubmit?: (values: FormValues) => Promise<void> | void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      degraded: DEGRADED,
      timeout: TIMEOUT,
    },
  });
  const [isPending, startTransition] = useTransition();

  function submitAction(values: FormValues) {
    if (isPending) return;

    startTransition(async () => {
      try {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit?.(values);
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
      <form onSubmit={form.handleSubmit(submitAction)} {...props}>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Response Time Thresholds</FormCardTitle>
            <FormCardDescription>
              Configure your degraded and timeout thresholds.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="degraded"
              render={({ field }) => (
                <FormItem className="self-start">
                  <FormLabel>Degraded (in ms.)</FormLabel>
                  <FormControl>
                    <Input placeholder="30000" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Time after which the endpoint is considered degraded.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeout"
              render={({ field }) => (
                <FormItem className="self-start">
                  <FormLabel>Timeout (in ms.)</FormLabel>
                  <FormControl>
                    <Input placeholder="45000" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Max. time allowed for request to complete.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
