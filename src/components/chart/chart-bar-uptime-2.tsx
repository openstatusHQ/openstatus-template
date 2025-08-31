"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChartLegendBadge } from "./chart-legend-badge";

const chartData = Array.from({ length: 28 }, (_, i) => ({
  timestamp: new Date(
    new Date().setHours(new Date().getHours() - i * 6)
  ).toLocaleString("default", {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  }),
  ok: i === 3 || i === 16 ? 172 : 186,
  error: i === 3 ? 14 : 0,
  degraded: i === 16 ? 14 : 0,
})).reverse();

const annotation = {
  ok: chartData.reduce((acc, item) => acc + item.ok, 0),
  error: chartData.reduce((acc, item) => acc + item.error, 0),
  degraded: chartData.reduce((acc, item) => acc + item.degraded, 0),
};

const chartConfig = {
  ok: {
    label: "success",
    color: "var(--color-success)",
  },
  degraded: {
    label: "degraded",
    color: "var(--color-warning)",
  },
  error: {
    label: "failed",
    color: "var(--color-destructive)",
  },
} satisfies ChartConfig;

export function ChartBarUptime({ className }: { className?: string }) {
  const [activeSeries, setActiveSeries] = useState<
    Array<keyof typeof chartConfig>
  >(["ok", "error", "degraded"]);
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("h-[130px] w-full", className)}
    >
      <BarChart accessibilityLayer data={chartData} barCategoryGap={2}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="ok"
          fill="var(--color-ok)"
          stackId="a"
          hide={!activeSeries.includes("ok")}
        />
        <Bar
          dataKey="degraded"
          fill="var(--color-degraded)"
          stackId="a"
          hide={!activeSeries.includes("degraded")}
        />
        <Bar
          dataKey="error"
          fill="var(--color-error)"
          stackId="a"
          hide={!activeSeries.includes("error")}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          orientation="right"
        />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          tickMargin={8}
          minTickGap={10}
          axisLine={false}
        />
        <ChartLegend
          verticalAlign="top"
          content={
            <ChartLegendBadge
              active={activeSeries}
              handleActive={(item) => {
                setActiveSeries((prev) => {
                  if (item.dataKey) {
                    const key = item.dataKey as keyof typeof chartConfig;
                    if (prev.includes(key)) {
                      return prev.filter((item) => item !== key);
                    }
                    return [...prev, key];
                  }
                  return prev;
                });
              }}
              annotation={annotation}
              className="overflow-x-scroll pt-1 ps-1 justify-start"
            />
          }
        />
      </BarChart>
    </ChartContainer>
  );
}
