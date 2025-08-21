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
import { useMemo, useState } from "react";
import { ChartLegendBadge } from "./chart-legend-badge";

const chartConfig = {
  p50: {
    label: "p50",
    color: "var(--chart-1)",
  },
  p75: {
    label: "p75",
    color: "var(--chart-2)",
  },
  p90: {
    label: "p90",
    color: "var(--chart-3)",
  },
  p95: {
    label: "p95",
    color: "var(--chart-4)",
  },
  p99: {
    label: "p99",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

function avg(values: number[]) {
  return (values.reduce((acc, curr) => acc + curr, 0) / values.length).toFixed(
    0
  );
}

function randomChartData() {
  const randomizer = Math.random() * 50;
  return Array.from({ length: 30 }, (_, i) => ({
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - i)
    ).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
    }),
    latency: Math.floor(Math.random() * randomizer) * 100,
  })).map((item) => ({
    ...item,
    // TODO: improve this
    p50: item.latency * 0.5,
    p75: item.latency * 0.75,
    p90: item.latency * 0.9,
    p95: item.latency * 0.95,
    p99: item.latency * 0.99,
  }));
}

export function ChartLinePercentiles({ className }: { className?: string }) {
  const [activeSeries, setActiveSeries] = useState<
    Array<keyof typeof chartConfig>
  >(["p75"]);

  const chartData = useMemo(() => randomChartData(), []);

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("h-[100px] w-full", className)}
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <ChartLegend
          content={
            <ChartLegendBadge
              handleActive={(item) => {
                setActiveSeries((prev) => {
                  if (item.dataKey) {
                    const key = item.dataKey as keyof typeof chartConfig;
                    if (prev.includes(key)) {
                      return prev;
                    }
                    return [key];
                  }
                  return prev;
                });
              }}
              active={activeSeries}
              annotation={{
                p50: `${avg(chartData.map((item) => item.p50))}ms`,
                p75: `${avg(chartData.map((item) => item.p75))}ms`,
                p90: `${avg(chartData.map((item) => item.p90))}ms`,
                p95: `${avg(chartData.map((item) => item.p95))}ms`,
                p99: `${avg(chartData.map((item) => item.p99))}ms`,
              }}
            />
          }
        />
        <CartesianGrid vertical={false} />
        <XAxis dataKey="timestamp" hide />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="w-[180px]"
              formatter={(value, name) => (
                <ChartTooltipNumber
                  chartConfig={chartConfig}
                  value={value}
                  name={name}
                />
              )}
            />
          }
        />
        <Line
          hide={!activeSeries.includes("p50")}
          dataKey="p50"
          type="monotone"
          stroke="var(--color-p50)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          hide={!activeSeries.includes("p75")}
          dataKey="p75"
          type="monotone"
          stroke="var(--color-p75)"
          strokeWidth={2}
          dot={false}
        />
        {/* <Line
          hide={!activeSeries.includes("p90")}
          dataKey="p90"
          type="monotone"
          stroke="var(--color-p90)"
          strokeWidth={2}
          dot={false}
        /> */}
        <Line
          hide={!activeSeries.includes("p95")}
          dataKey="p95"
          type="monotone"
          stroke="var(--color-p95)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          hide={!activeSeries.includes("p99")}
          dataKey="p99"
          type="monotone"
          stroke="var(--color-p99)"
          strokeWidth={2}
          dot={false}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          orientation="right"
          tickFormatter={(value) => `${value}ms`}
        />
      </LineChart>
    </ChartContainer>
  );
}
