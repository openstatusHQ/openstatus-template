"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

export function CopyLinkButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { copy, isCopied } = useCopyToClipboard();

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    // FIXME: improve the toaster
    // rounded-none, bigger size, no icon?!?!
    copy(window.location.href, {
      successMessage: "Link copied to clipboard",
    });
  };

  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn("p-4 rounded-none", className)}
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? "[copied]" : "[copy]"}
    </Button>
  );
}
