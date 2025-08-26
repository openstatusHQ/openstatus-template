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
import {
  MetricCard,
  MetricCardGroup,
  MetricCardHeader,
  MetricCardTitle,
  MetricCardValue,
} from "@/components/metric/metric-card";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import {
  StatusChartContent,
  StatusChartDescription,
  StatusChartHeader,
  StatusChartTitle,
} from "@/components/status-page/status-charts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Kbd } from "@/components/common/kbd";

// TODO: add error range on ChartAreaLatency
// TODO: add timerange (1d, 7d, 14d) or leave as is and have 7d default?
// TODO: how to deal with the latency by region percentiles + interval/resolution

const metrics = [
  {
    label: "UPTIME",
    value: "100.00%",
    variant: "success" as const,
  },
  {
    label: "FAILS",
    value: "0",
    variant: "destructive" as const,
  },
  {
    label: "DEGRADED",
    value: "0",
    variant: "warning" as const,
  },
  {
    label: "REQUESTS",
    value: "320.102",
    variant: "ghost" as const,
  },
];

export default function Page() {
  return (
    <Status>
      <StatusHeader>
        <StatusTitle>OpenStatus API</StatusTitle>
        <StatusDescription>API for OpenStatus</StatusDescription>
      </StatusHeader>
      <StatusContent className="flex flex-col gap-6">
        <div className="w-full flex flex-row justify-between items-center gap-2 py-0.5">
          <DropdownPeriod />
          <CopyButton />
        </div>
        <MetricCardGroup className="sm:grid-cols-4 lg:grid-cols-4">
          {metrics.map((metric) => {
            if (metric === null)
              return <div key={metric} className="hidden lg:block" />;
            return (
              <MetricCard key={metric.label} variant={metric.variant}>
                <MetricCardHeader>
                  <MetricCardTitle className="truncate">
                    {metric.label}
                  </MetricCardTitle>
                </MetricCardHeader>
                <MetricCardValue>{metric.value}</MetricCardValue>
              </MetricCard>
            );
          })}
        </MetricCardGroup>
        <StatusChartContent>
          <StatusChartHeader>
            <StatusChartTitle>Global Latency</StatusChartTitle>
            <StatusChartDescription>
              {/* FIXME: COPY: All regions aggregated latency */}
              The latency based on the different{" "}
              <PopoverQuantile>quantiles</PopoverQuantile>.
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
              {/* TODO: we could add an information to p95 that it takes the highest selected global latency percentile */}
              Region latency per{" "}
              <code className="text-foreground font-medium">p75</code>{" "}
              <PopoverQuantile>quantile</PopoverQuantile>, sorted by slowest
              region.
            </StatusChartDescription>
          </StatusChartHeader>
          <ChartLineRegions className="h-[200px]" />
        </StatusChartContent>
      </StatusContent>
    </Status>
  );
}

function CopyButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        copy(window.location.href, {
          successMessage: "Link copied to clipboard",
        })
      }
      className={cn("size-8", className)}
      {...props}
    >
      {isCopied ? <Check /> : <Copy />}
      <span className="sr-only">Copy Link</span>
    </Button>
  );
}

export const PERIOD_VALUES = [
  {
    value: "1d",
    label: "Last day",
  },
  {
    value: "7d",
    label: "Last 7 days",
  },
  {
    value: "14d",
    label: "Last 14 days",
  },
];

function DropdownPeriod() {
  const [period, setPeriod] = useState("1d");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {PERIOD_VALUES.find(({ value }) => value === period)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-medium text-muted-foreground text-xs">
            Period
          </DropdownMenuLabel>
          {PERIOD_VALUES.map(({ value, label }) => (
            <DropdownMenuItem key={value} onSelect={() => setPeriod(value)}>
              {label}
              {period === value ? <Check className="ml-auto shrink-0" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PopoverQuantile({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "shrink-0 rounded-md p-0 underline decoration-muted-foreground/70 decoration-dotted underline-offset-2 outline-none transition-all hover:decoration-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=open]:decoration-foreground dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent side="top" className="p-0 text-sm">
        <p className="px-3 py-2 font-medium">
          A quantile represents a specific percentile in your dataset.
        </p>
        <Separator />
        <p className="px-3 py-2 text-muted-foreground">
          For example, p50 is the 50th percentile - the point below which 50% of
          data falls. Higher percentiles include more data and highlight the
          upper range.
        </p>
      </PopoverContent>
    </Popover>
  );
}
