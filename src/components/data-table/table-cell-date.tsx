import { cn } from "@/lib/utils";

// TODO: add format + FormatConfig

export function TableCellDate({
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & { value: unknown }) {
  if (value instanceof Date) {
    return (
      <div className={cn("text-muted-foreground", className)} {...props}>
        {value.toLocaleString()}
      </div>
    );
  }
  if (typeof value === "string") {
    return (
      <div className={cn("text-muted-foreground", className)} {...props}>
        {value}
      </div>
    );
  }
  return (
    <div className={cn("text-muted-foreground", className)} {...props}>
      -
    </div>
  );
}
