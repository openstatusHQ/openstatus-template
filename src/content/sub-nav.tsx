"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function SubNav({ className, ...props }: React.ComponentProps<"div">) {
  const pathname = usePathname();
  const segments = pathname
    .replace("/landing", "")
    .split("/")
    .filter(Boolean)
    .slice(0, -1);

  return (
    <div
      className={cn("flex justify-between items-center gap-2", className)}
      {...props}
    >
      <div className="px-4 text-muted-foreground">
        {segments.map((segment, index) => (
          <Fragment key={segment}>
            <span>{segment}</span>
            {index < segments.length - 1 ? <span>{" | "}</span> : null}
          </Fragment>
        ))}
      </div>
      <CopyLinkButton />
    </div>
  );
}

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
