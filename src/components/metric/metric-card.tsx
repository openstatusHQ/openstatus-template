import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

export function MetricCard({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
}

export function MetricCardTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-muted-foreground font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function MetricCardValue({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-foreground font-medium", className)} {...props}>
      {children}
    </p>
  );
}

export function MetricCardFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground/70 text-xs", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function MetricCardGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const badgeVariants = cva("px-1 font-mono", {
  variants: {
    variant: {
      default: "border-border",
      increase:
        "border-red-500/20 bg-red-500/10 hover:bg-red-500/10 text-red-500",
      decrease:
        "border-green-500/20 bg-green-500/10 hover:bg-green-500/10 text-green-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function MetricCardBadge({
  value,
  decimal = 1,
  className,
  ...props
}: React.ComponentProps<typeof Badge> & {
  value: number;
  decimal?: number;
}) {
  const round = 10 ** decimal; // 10^1 = 10 (1 decimal), 10^2 = 100 (2 decimals), etc.
  const percentage = Math.round((value - 1) * 100 * round) / round;

  const variant: VariantProps<typeof badgeVariants>["variant"] =
    percentage > 0 ? "increase" : percentage < 0 ? "decrease" : "default";

  return (
    <Badge
      variant="secondary"
      className={badgeVariants({ variant, className })}
      {...props}
    >
      <span>
        {percentage > 0 ? <ChevronUp className="mr-px h-3 w-3" /> : null}
        {percentage < 0 ? <ChevronDown className="mr-px h-3 w-3" /> : null}
      </span>
      {Math.abs(percentage)}%
    </Badge>
  );
}
