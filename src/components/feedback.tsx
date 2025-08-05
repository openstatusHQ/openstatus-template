"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inbox, LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(1),
});

export function Feedback({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
    },
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsSuccess(true);
          resolve();
        }, 1000);
      });
      console.log(values);
      toast.promise(promise, {
        loading: "Sending feedback...",
        success: "Feedback sent!",
        error: "Failed to send feedback",
      });
      await promise;
    });
  };

  useEffect(() => {
    if (!open && isSuccess) {
      // NOTE: the popover takes 300ms to close, so we need to wait for that
      setTimeout(() => setIsSuccess(false), 300);
    }
  }, [open, isSuccess]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (open && (e.metaKey || e.ctrlKey) && e.key === "Enter") {
        form.handleSubmit(onSubmit)();
      }

      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      if (!open) {
        if (e.key === "f") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, form, onSubmit]);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  if (isMobile) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "group gap-0 px-2 text-muted-foreground text-sm hover:bg-transparent hover:text-foreground data-[state=open]:text-foreground",
            className
          )}
          {...props}
        >
          Feedback{" "}
          <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-medium font-mono group-hover:text-foreground group-data-[state=open]:text-foreground">
            F
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="relative border-none p-0">
        {isSuccess ? (
          <div className="flex h-[110px] flex-col items-center justify-center gap-1 rounded-md border border-input p-3 text-base shadow-xs">
            <Inbox className="size-4 shrink-0" />
            <p className="text-center font-medium">Thanks for sharing!</p>
            <p className="text-center text-muted-foreground text-sm">
              We&apos;ll get in touch if there&apos;s a follow-up.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ideas, bugs, or anything else..."
                        className="field-sizing-fixed h-[110px] resize-none p-3"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                variant="ghost"
                className="group absolute right-1.5 bottom-1.5 gap-0"
                type="submit"
                disabled={pending}
              >
                {pending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <>
                    Send
                    <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-medium font-mono group-hover:text-foreground">
                      ⌘
                    </kbd>
                    <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-medium font-mono group-hover:text-foreground">
                      ↵
                    </kbd>
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </PopoverContent>
    </Popover>
  );
}
