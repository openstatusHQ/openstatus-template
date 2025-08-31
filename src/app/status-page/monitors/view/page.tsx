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
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Check, Copy, TrendingUp } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/formatter";
import { ChartBarUptime } from "@/components/chart/chart-bar-uptime-2";
import {
  StatusMonitorTabs,
  StatusMonitorTabsList,
  StatusMonitorTabsTrigger,
  StatusMonitorTabsTriggerLabel,
  StatusMonitorTabsTriggerValue,
  StatusMonitorTabsContent,
} from "@/components/status-page/status-monitor-tabs";

// TODO: add error range on ChartAreaLatency
// TODO: add timerange (1d, 7d, 14d) or leave as is and have 7d default?
// TODO: how to deal with the latency by region percentiles + interval/resolution

export default function Page() {
  return (
    <Status>
      <StatusHeader>
        <StatusTitle>OpenStatus 418</StatusTitle>
        <StatusDescription>
          I&apos;m a teapot - Just random values
        </StatusDescription>
      </StatusHeader>
      <StatusContent className="flex flex-col gap-6">
        <div className="w-full flex flex-row justify-between items-center gap-2 py-0.5">
          <DropdownPeriod />
          <CopyButton />
        </div>
        <StatusMonitorTabs defaultValue="global">
          <StatusMonitorTabsList className="grid grid-cols-3">
            <StatusMonitorTabsTrigger value="global">
              <StatusMonitorTabsTriggerLabel>
                Global Latency
              </StatusMonitorTabsTriggerLabel>
              <StatusMonitorTabsTriggerValue>
                287 - 568ms{" "}
                <Badge variant="outline" className="text-[10px] py-px">
                  p75
                </Badge>
              </StatusMonitorTabsTriggerValue>
            </StatusMonitorTabsTrigger>
            <StatusMonitorTabsTrigger value="region">
              <StatusMonitorTabsTriggerLabel>
                Latency by Region
              </StatusMonitorTabsTriggerLabel>
              <StatusMonitorTabsTriggerValue>
                7 regions{" "}
                <Badge
                  variant="outline"
                  className="text-[10px] py-px font-mono"
                >
                  arn <TrendingUp className="size-3" />
                </Badge>
              </StatusMonitorTabsTriggerValue>
            </StatusMonitorTabsTrigger>
            <StatusMonitorTabsTrigger value="uptime">
              <StatusMonitorTabsTriggerLabel>
                Uptime
              </StatusMonitorTabsTriggerLabel>
              <StatusMonitorTabsTriggerValue>
                99.99%{" "}
                <Badge variant="outline" className="text-[10px] py-px">
                  {formatNumber(5102, {
                    notation: "compact",
                    compactDisplay: "short",
                  }).replace("K", "k")}{" "}
                  checks
                </Badge>
              </StatusMonitorTabsTriggerValue>
            </StatusMonitorTabsTrigger>
          </StatusMonitorTabsList>
          <StatusMonitorTabsContent value="global">
            <StatusChartContent>
              <StatusChartHeader>
                <StatusChartTitle>Global Latency</StatusChartTitle>
                <StatusChartDescription>
                  The aggregated latency from all active regions based on
                  different <PopoverQuantile>quantiles</PopoverQuantile>.
                </StatusChartDescription>
              </StatusChartHeader>
              <ChartAreaPercentiles
                className="h-[250px]"
                legendClassName="justify-start pt-1 ps-1"
                legendVerticalAlign="top"
                xAxisHide={false}
                yAxisDomain={[0, "dataMax"]}
              />
            </StatusChartContent>
          </StatusMonitorTabsContent>
          <StatusMonitorTabsContent value="region">
            <StatusChartContent>
              <StatusChartHeader>
                <StatusChartTitle>Latency by Region</StatusChartTitle>
                <StatusChartDescription>
                  {/* TODO: we could add an information to p95 that it takes the highest selected global latency percentile */}
                  Region latency per{" "}
                  <code className="text-foreground font-medium">p75</code>{" "}
                  <PopoverQuantile>quantile</PopoverQuantile>, sorted by slowest
                  region. Compare up to{" "}
                  <code className="text-foreground font-medium">4</code>{" "}
                  regions.
                </StatusChartDescription>
              </StatusChartHeader>
              <ChartLineRegions className="h-[250px]" />
            </StatusChartContent>
          </StatusMonitorTabsContent>
          <StatusMonitorTabsContent value="uptime">
            <StatusChartContent>
              <StatusChartHeader>
                <StatusChartTitle>Uptime</StatusChartTitle>
                <StatusChartDescription>
                  Uptime accross all regions, grouped by status.
                </StatusChartDescription>
              </StatusChartHeader>
              <ChartBarUptime className="h-[250px]" />
            </StatusChartContent>
          </StatusMonitorTabsContent>
        </StatusMonitorTabs>
      </StatusContent>
    </Status>
  );
}

// Use Link instead of copy (same for reports and maintenance)
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

const PERIOD_VALUES = [
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

function PopoverQuantile({
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
