import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function StatusMonitorTabs({
  className,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  return <Tabs className={cn("gap-6", className)} {...props} />;
}

export function StatusMonitorTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={cn("flex w-full h-auto min-h-fit", className)}
      {...props}
    />
  );
}

export function StatusMonitorTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        "flex-1 gap-0.5 flex-col items-start min-w-0 text-foreground dark:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function StatusMonitorTabsTriggerLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("truncate w-full text-left", className)} {...props} />
  );
}

export function StatusMonitorTabsTriggerValue({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-muted-foreground text-xs text-left text-wrap",
        className
      )}
      {...props}
    />
  );
}

export function StatusMonitorTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsContent>) {
  return (
    <TabsContent
      className={cn(
        "flex flex-col gap-2 px-3 -mx-3 py-2 -my-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-lg",
        className
      )}
      {...props}
    />
  );
}
