import * as RechartsPrimitive from "recharts";
import { getPayloadConfigFromPayload, useChart } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { Badge } from "../ui/badge";

export function ChartLegendBadge({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  handleActive,
  active,
  annotation,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
    // NOTE: additional props compared to default shadcn/ui Legend component
    handleActive?: (item: Payload) => void;
    active?: Payload["dataKey"][];
    annotation?: Record<string, string | number>;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <Badge key={item.value} variant="outline" asChild>
            <div
              className={cn(
                "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
                !active?.includes(item.dataKey) && "opacity-50"
              )}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleActive?.(item);
              }}
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
              <span className="text-[10px] text-muted-foreground font-mono">
                {annotation?.[item.dataKey as string]}
              </span>
            </div>
          </Badge>
        );
      })}
    </div>
  );
}
