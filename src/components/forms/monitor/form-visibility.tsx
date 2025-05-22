"use client";

import { Button } from "@/components/ui/button";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
  FormCardUpgrade,
  FormCardFooterInfo,
} from "@/components/forms/form-card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import NextLink from "next/link";
import { Link } from "@/components/common/link";
import { Switch } from "@/components/ui/switch";

const LOCKED = true;

const schema = z.object({
  visibility: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function FormVisibility({
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
      visibility: false,
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
          <FormCardUpgrade />
          <FormCardHeader>
            <FormCardTitle>Visibility</FormCardTitle>
            <FormCardDescription>
              Share your monitor stats with the public.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent>
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Allow public access</FormLabel>
                    <FormDescription>
                      Change monitor visibility. When checked, the monitor stats
                      from the overview page will be public. You will be able to
                      share it via a connected status page or{" "}
                      <Link href="#">
                        https://openstatus.dev/public/monitors/:id
                      </Link>
                      .
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={LOCKED}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormCardContent>
          <FormCardFooter>
            <FormCardFooterInfo>
              Learn more about <Link href="#">monitor visibility</Link>.
            </FormCardFooterInfo>
            {LOCKED ? (
              <Button asChild>
                <NextLink href="/dashboard/settings/billing">
                  <Lock className="size-4" />
                  Upgrade
                </NextLink>
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            )}
          </FormCardFooter>
        </FormCard>
      </form>
    </Form>
  );
}
