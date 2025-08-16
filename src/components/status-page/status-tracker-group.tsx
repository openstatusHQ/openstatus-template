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
    <Collapsible
      className={cn(
        "-mx-3",
        "hover:bg-muted/50 data-[state=open]:bg-muted/50 rounded-lg border border-transparent hover:border-border/50 data-[state=open]:border-border/50",
        className
      )}
    >
      <CollapsibleTrigger
        className={cn(
          "group/monitor w-full px-3 py-2 flex items-center justify-between gap-2 font-medium",
          "cursor-pointer",
          className
        )}
        data-variant={variant}
        {...props}
      >
        {title}
        <div className="flex items-center gap-2">
          <StatusMonitorStatus className="text-sm" />
          <StatusMonitorIcon />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "flex flex-col gap-3 px-3 py-2 border-t border-border/50",
          "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
