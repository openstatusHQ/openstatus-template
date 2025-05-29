"use client";

import { Bar, BarChart, CartesianGrid, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = Array.from({ length: 30 }, (_, i) => ({
  month: new Date(new Date().setDate(new Date().getDate() - i)).toLocaleString(
    "default"
  ),
  ok: i === 0 ? 172 : 186,
  error: i === 0 ? 14 : 0,
  degraded: 0,
}));

const chartConfig = {
  ok: {
    label: "ok",
    color: "var(--color-success)",
  },
  degraded: {
    label: "degraded",
    color: "var(--color-warning)",
  },
  error: {
    label: "error",
    color: "var(--color-destructive)",
  },
} satisfies ChartConfig;

export function ChartBarUptime() {
  return (
    <ChartContainer config={chartConfig} className="h-[100px] w-full">
      <BarChart accessibilityLayer data={chartData} barCategoryGap={2}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="ok" fill="var(--color-ok)" stackId="a" />
        <Bar dataKey="error" fill="var(--color-error)" stackId="a" />
        <Bar dataKey="degraded" fill="var(--color-degraded)" stackId="a" />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          orientation="right"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
}
