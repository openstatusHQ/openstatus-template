import * as RechartsPrimitive from "recharts";
import { getPayloadConfigFromPayload, useChart } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { badgeVariants } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChartLegendBadge({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  handleActive,
  active,
  maxActive,
  annotation,
  tooltip,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
    // NOTE: additional props compared to default shadcn/ui Legend component
    handleActive?: (item: Payload) => void;
    active?: Payload["dataKey"][];
    maxActive?: number;
    annotation?: Record<string, string | number | undefined>;
    tooltip?: Record<string, string | undefined>;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  const hasMaxActive = active && maxActive ? active.length >= maxActive : false;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        // NOTE: recharts supports "none" type for legend items
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const suffix = annotation?.[item.dataKey as string];
          const tooltipLabel = tooltip?.[item.dataKey as string];
          const isActive = active?.includes(item.dataKey);

          const badge = (
            <button
              key={item.value}
              className={cn(
                badgeVariants({ variant: "outline" }),
                "outline-none",
                "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
                !isActive && "opacity-60",
                !isActive && hasMaxActive && "opacity-40 cursor-not-allowed"
              )}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleActive?.(item);
              }}
              disabled={!isActive && hasMaxActive}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
              {suffix ? (
                <span className="text-[10px] text-muted-foreground font-mono">
                  {suffix}
                </span>
              ) : null}
            </button>
          );

          if (tooltipLabel) {
            return (
              <ChartLegendTooltip key={item.value} tooltip={tooltipLabel}>
                {badge}
              </ChartLegendTooltip>
            );
          }

          return badge;
        })}
    </div>
  );
}

function ChartLegendTooltip({
  children,
  tooltip,
  ...props
}: React.ComponentProps<typeof TooltipTrigger> & { tooltip: string }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="rounded-md" asChild {...props}>
          {children}
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
