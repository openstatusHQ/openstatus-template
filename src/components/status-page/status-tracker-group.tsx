import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { StatusMonitorIcon, StatusMonitorStatus } from "./status-monitor";
import { VariantType } from "./floating-button";

export function StatusTrackerGroup({
  children,
  title,
  variant,
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & {
  title: string;
  variant?: VariantType;
}) {
  return (
    <Collapsible className="flex flex-col gap-2">
      <CollapsibleTrigger
        className={cn(
          "group/monitor w-full flex items-center justify-between gap-2 font-medium border border-transparent",
          "hover:bg-muted/50 data-[state=open]:bg-muted/50 rounded-lg px-3 py-2",
          "cursor-pointer",
          className
        )}
        data-variant={variant}
        {...props}
      >
        {title}
        <div className="flex items-center gap-2">
          <StatusMonitorIcon />
          <StatusMonitorStatus />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "flex flex-col gap-3",
          "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
