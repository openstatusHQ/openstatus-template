import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { cva, VariantProps } from "class-variance-authority";

// py-0
const formCardVariants = cva("w-full py-0 shadow-none gap-4", {
  variants: {
    variant: {
      default: "",
      destructive: "border-destructive",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

// NOTE: Add a formcardprovider to share the variant prop

export function FormCard({
  children,
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof formCardVariants>) {
  return (
    <Card className={cn(formCardVariants({ variant }), className)} {...props}>
      {children}
    </Card>
  );
}

// TODO: if we use the formcardheader, we have too much padding on the top

export function FormCardHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardHeader
      className={cn("pt-4 [.border-b]:pb-4 px-4", className)}
      {...props}
    >
      {children}
    </CardHeader>
  );
}

export function FormCardTitle({ children }: { children: React.ReactNode }) {
  return <CardTitle>{children}</CardTitle>;
}

export function FormCardDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CardDescription>{children}</CardDescription>;
}

export function FormCardContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardContent className={cn("px-4", className)} {...props}>
      {children}
    </CardContent>
  );
}

export function FormCardSeparator({
  ...props
}: React.ComponentProps<typeof Separator>) {
  return <Separator {...props} />;
}

const formCardFooterVariants = cva(
  "border-t flex items-center gap-2 pb-4 px-4 [&>:last-child]:ml-auto [.border-t]:pt-4",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive bg-destructive/5",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

export function FormCardFooter({
  children,
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof formCardFooterVariants>) {
  return (
    <CardFooter
      className={cn(formCardFooterVariants({ variant }), className)}
      {...props}
    >
      {children}
    </CardFooter>
  );
}

export function FormCardFooterInfo({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export function FormCardGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}
