"use client";

import { Button } from "@/components/ui/button";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "@/components/forms/form-card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";

const schema = z.object({
  // Add schema fields when needed
});

type FormValues = z.infer<typeof schema>;

export function FormNotifiers({
  defaultValues,
}: {
  defaultValues?: FormValues;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      defaultValues ??
      {
        // Add default values when needed
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
            <FormCardTitle>Notifiers</FormCardTitle>
            <FormCardDescription>
              Get notified when your monitor is degraded or down.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent>
            <EmptyStateContainer>
              <EmptyStateTitle>No notifiers</EmptyStateTitle>
            </EmptyStateContainer>
          </FormCardContent>
          <FormCardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </FormCardFooter>
        </FormCard>
      </form>
    </Form>
  );
}
