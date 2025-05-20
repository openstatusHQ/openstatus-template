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
} from "../form-card";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";

const DEGRADED = 30_000;
const TIMEOUT = 45_000;

const schema = z.object({
  degraded: z.number(),
  timeout: z.number(),
});

export function FormResponseTime() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      degraded: DEGRADED,
      timeout: TIMEOUT,
    },
  });
  const [isPending, startTransition] = useTransition();

  function submitAction(values: z.infer<typeof schema>) {
    if (isPending) return;

    startTransition(async () => {
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitAction)}>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Response Time Thresholds</FormCardTitle>
            <FormCardDescription>
              Configure your degraded and timeout thresholds.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="degraded"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
