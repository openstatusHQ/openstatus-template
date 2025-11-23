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
      className={cn("flex h-auto min-h-fit w-full", className)}
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
        "min-w-0 flex-1 flex-col items-start gap-0.5 text-foreground dark:text-foreground",
        className,
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
    <div className={cn("w-full truncate text-left", className)} {...props} />
  );
}

export function StatusMonitorTabsTriggerValue({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-wrap text-left text-muted-foreground text-xs",
        className,
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
        "-mx-3 -my-2 flex flex-col gap-2 rounded-lg px-3 py-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}
