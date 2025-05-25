import { Link } from "@/components/common/link";
import { cn } from "@/lib/utils";
export function TableCellLink({
  value,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  value: unknown;
  href: string;
}) {
  if (typeof value === "string") {
    return (
      <Link className={cn("truncate", className)} {...props}>
        {value}
      </Link>
    );
  }
  return <div className="text-muted-foreground">-</div>;
}
