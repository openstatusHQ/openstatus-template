"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  // XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { ChartTooltipNumber } from "./chart-tooltip-number";
import { ChartLegendBadge } from "./chart-legend-badge";
import { useState } from "react";
import { regions } from "@/data/regions";

const r = regions.slice(0, 5);

const chartConfig = r
  .map((item, index) => ({
    code: item.code,
    label: item.code, // item.location,
    color: `var(--chart-${index + 1})`,
  }))
  .reduce((acc, item) => {
    acc[item.code] = item;
    return acc;
  }, {} as Record<string, { label: string; color: string }>) satisfies ChartConfig;

const chartData = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(
    new Date().setMinutes(new Date().getMinutes() - i)
  ).toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
  }),
  ams: Math.floor(Math.random() * 100) * 100,
  bog: Math.floor(Math.random() * 100) * 100,
  arn: Math.floor(Math.random() * 100) * 100,
  atl: Math.floor(Math.random() * 100) * 100,
  bom: Math.floor(Math.random() * 100) * 100,
}));

const annotation = {
  ams: regions.find((r) => r.code === "ams")?.flag,
  bog: regions.find((r) => r.code === "bog")?.flag,
  arn: regions.find((r) => r.code === "arn")?.flag,
  atl: regions.find((r) => r.code === "atl")?.flag,
  bom: regions.find((r) => r.code === "bom")?.flag,
};

export function ChartLineRegions({ className }: { className?: string }) {
  const [activeSeries, setActiveSeries] = useState<
    Array<keyof typeof chartConfig>
  >(["ams", "arn"]);
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("h-[100px] w-full", className)}
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
          top: 2,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="timestamp" />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <ChartTooltipNumber
                  chartConfig={chartConfig}
                  value={value}
                  name={name}
                  labelFormatter={(_, name) => {
                    const region = regions.find((r) => r.code === name);
                    return (
                      <>
                        <span className="font-mono">{name}</span>{" "}
                        <span className="text-xs text-muted-foreground">
                          {region?.location}
                        </span>
                      </>
                    );
                  }}
                />
              )}
            />
          }
        />
        {r.map((item) => (
          <Line
            key={item.code}
            dataKey={item.code}
            type="monotone"
            stroke={`var(--color-${item.code})`}
            dot={false}
            hide={!activeSeries.includes(item.code)}
          />
        ))}

        <YAxis
          domain={["dataMin", "dataMax"]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          orientation="right"
          tickFormatter={(value) => `${value}ms`}
        />
        <ChartLegend
          verticalAlign="top"
          content={
            <ChartLegendBadge
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
              active={activeSeries}
              annotation={annotation}
              className="overflow-x-scroll justify-start font-mono"
            />
          }
        />
      </LineChart>
    </ChartContainer>
  );
}
