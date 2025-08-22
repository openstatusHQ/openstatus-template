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
import { DataTable } from "@/components/ui/data-table/data-table";
import { regionMetrics } from "@/data/region-metrics";
import { columns } from "@/components/data-table/response-logs/regions/columns";

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
            <StatusChartTitle>Latency</StatusChartTitle>
            <StatusChartDescription>
              The latency based on the different percentiles.
            </StatusChartDescription>
          </StatusChartHeader>
          <ChartAreaPercentiles className="h-[130px]" />
        </StatusChartContent>
        <StatusChartContent>
          <StatusChartHeader>
            <StatusChartTitle>Regions</StatusChartTitle>
            <StatusChartDescription>
              The latency based on the different percentiles.
            </StatusChartDescription>
          </StatusChartHeader>
          <DataTable data={regionMetrics} columns={columns} />
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
