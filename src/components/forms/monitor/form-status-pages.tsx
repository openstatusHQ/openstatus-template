"use client";

import { Button } from "@/components/ui/button";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
  FormCardSeparator,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { statusPages } from "@/data/status-pages";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  statusPages: z.array(z.number()),
});

type FormValues = z.infer<typeof schema>;

export function FormStatusPages({
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
      name: "",
      description: "",
      statusPages: [],
    },
  });
  const [isPending, startTransition] = useTransition();
  const watchStatusPages = form.watch("statusPages");

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
            <FormCardTitle>Status Pages</FormCardTitle>
            <FormCardDescription>
              Add status pages to your monitor.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="OpenStatus API" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name on the status page. If not provided, monitor&apos;s
                    name will be used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="My Status Page" {...field} />
                  </FormControl>
                  <FormDescription>
                    A tooltip with extra information about the monitor will be
                    displayed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormCardContent>
          <FormCardSeparator />
          <FormCardContent>
            {statusPages.length > 0 ? (
              <FormField
                control={form.control}
                name="statusPages"
                render={() => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-base">
                        List of Status Pages
                      </FormLabel>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className={cn(
                          watchStatusPages.length === statusPages.length &&
                            "text-muted-foreground"
                        )}
                        onClick={() => {
                          const allSelected = statusPages.every((item) =>
                            watchStatusPages.includes(item.id)
                          );

                          if (!allSelected) {
                            form.setValue(
                              "statusPages",
                              statusPages.map((item) => item.id)
                            );
                          } else {
                            form.setValue("statusPages", []);
                          }
                        }}
                      >
                        Select all
                      </Button>
                    </div>
                    {statusPages.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="statusPages"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex items-center"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={
                                    field.value?.includes(item.id) || false
                                  }
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <EmptyStateContainer>
                <EmptyStateTitle>No status pages</EmptyStateTitle>
              </EmptyStateContainer>
            )}
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
