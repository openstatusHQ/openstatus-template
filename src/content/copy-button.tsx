"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

export function CopyButton({
  className,
  copyText,
  ...props
}: React.ComponentProps<typeof Button> & { copyText: string }) {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn("p-4 rounded-none", className)}
      onClick={() => copy(copyText, {})}
      {...props}
    >
      {isCopied ? "[copied]" : "[copy]"}
    </Button>
  );
}
