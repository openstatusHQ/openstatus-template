import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionDescription({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-lg font-medium", className)} {...props}>
      {children}
    </p>
  );
}

export function SectionGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 py-8 space-y-8 max-w-3xl mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionGroupHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionGroupTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-4xl font-bold", className)} {...props}>
      {children}
    </p>
  );
}
