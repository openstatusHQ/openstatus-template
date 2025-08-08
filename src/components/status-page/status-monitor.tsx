import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusTracker } from "./status-tracker";
import {
  AlertCircleIcon,
  CheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  WrenchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BarType, CardType, VariantType } from "./floating-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { type ChartData } from "./utils";
import { Monitor } from "@/data/monitors";

export function StatusMonitor({
  className,
  variant = "success",
  cardType = "duration",
  barType = "absolute",
  showUptime = true,
  data,
  monitor,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: VariantType;
  cardType?: CardType;
  barType?: BarType;
  showUptime?: boolean;
  monitor: Monitor;
  data: ChartData[];
}) {
  return (
    <div
      data-slot="status-monitor"
      data-variant={variant}
      className={cn("group/monitor flex flex-col gap-1", className)}
      {...props}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          <StatusMonitorTitle>{monitor.name}</StatusMonitorTitle>
          <StatusMonitorDescription>
            {monitor.description}
          </StatusMonitorDescription>
        </div>
        <div className="flex flex-row items-center gap-2">
          {showUptime ? <StatusMonitorUptime /> : null}
          <StatusMonitorIcon />
        </div>
      </div>
      <StatusTracker cardType={cardType} barType={barType} data={data} />
    </div>
  );
}

export function StatusMonitorTitle({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

export function StatusMonitorDescription({
  onClick,
  children,
  ...props
}: React.ComponentProps<typeof TooltipTrigger>) {
  const isTouch = useMediaQuery("(hover: none)");
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          onClick={(e) => {
            if (isTouch) setOpen((prev) => !prev);
            onClick?.(e);
          }}
          {...props}
        >
          <InfoIcon className="size-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export function StatusMonitorIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "size-4 text-background rounded-full bg-muted flex items-center justify-center [&>svg]:size-2.5",
        "group-data-[variant=success]/monitor:bg-success",
        "group-data-[variant=degraded]/monitor:bg-warning",
        "group-data-[variant=error]/monitor:bg-destructive",
        "group-data-[variant=info]/monitor:bg-info",
        className
      )}
      {...props}
    >
      <CheckIcon className="group-data-[variant=success]/monitor:block hidden" />
      <TriangleAlertIcon className="group-data-[variant=degraded]/monitor:block hidden" />
      <AlertCircleIcon className="group-data-[variant=error]/monitor:block hidden" />
      <WrenchIcon className="group-data-[variant=info]/monitor:block hidden" />
    </div>
  );
}
export function StatusMonitorUptime({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("text-sm text-muted-foreground font-mono", className)}
    >
      99.89%
    </div>
  );
}
