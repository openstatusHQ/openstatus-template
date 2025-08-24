"use client";

import {
  Status,
  StatusContent,
  StatusDescription,
  StatusHeader,
  StatusTitle,
} from "@/components/status-page/status";
import { ChartAreaPercentiles } from "@/components/chart/chart-area-percentiles";
import { cn } from "@/lib/utils";
import { ChartLineRegions } from "@/components/chart/chart-line-regions";

export default function Page() {
  return (
    <Status>
      <StatusHeader>
        <StatusTitle>OpenStatus API</StatusTitle>
        <StatusDescription>API for OpenStatus</StatusDescription>
      </StatusHeader>
      <StatusContent className="flex flex-col gap-6">
        <StatusChartContent>
          <StatusChartHeader>
            <StatusChartTitle>Global Latency</StatusChartTitle>
            <StatusChartDescription>
              The latency based on the different percentiles.
            </StatusChartDescription>
          </StatusChartHeader>
          <ChartAreaPercentiles
            className="h-[200px]"
            legendClassName="justify-start"
            legendVerticalAlign="top"
            xAxisHide={false}
          />
        </StatusChartContent>
        <StatusChartContent>
          <StatusChartHeader>
            <StatusChartTitle>Latency by Region</StatusChartTitle>
            <StatusChartDescription>
              The latency based on the different percentiles.
            </StatusChartDescription>
          </StatusChartHeader>
          <ChartLineRegions className="h-[200px]" />
        </StatusChartContent>
      </StatusContent>
    </Status>
  );
}

// TODO: move to file `status-charts.tsx`

function StatusChartContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-chart-content"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function StatusChartHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-chart-header"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function StatusChartTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-chart-title"
      className={cn("text-foreground text-base font-medium", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function StatusChartDescription({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-chart-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}
