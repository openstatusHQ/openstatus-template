import * as React from "react";
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
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  if (!payload?.length) {
    return null;
  }

  const filteredPayload = payload.filter((item) => item.type !== "none");
  const hasMaxActive = active && maxActive ? active.length >= maxActive : false;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      let nextIndex = 0;
      nextIndex =
        (focusedIndex + direction + filteredPayload.length) %
        filteredPayload.length;
      setFocusedIndex(nextIndex);
      while (buttonRefs.current[nextIndex]?.disabled === true) {
        nextIndex =
          (nextIndex + direction + filteredPayload.length) %
          filteredPayload.length;
      }
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label="Chart legend"
    >
      {filteredPayload.map((item, index) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const suffix = annotation?.[item.dataKey as string];
        const tooltipLabel = tooltip?.[item.dataKey as string];
        const isActive = active ? active?.includes(item.dataKey) : true;
        const isFocused = index === focusedIndex;

        const badge = (
          <button
            key={item.value}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
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
              setFocusedIndex(index);
              handleActive?.(item);
            }}
            onFocus={() => setFocusedIndex(index)}
            disabled={!isActive && hasMaxActive}
            tabIndex={isFocused ? 0 : -1}
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
            {suffix !== undefined ? (
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
