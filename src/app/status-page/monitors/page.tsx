"use client";

import {
  Status,
  StatusContent,
  StatusDescription,
  StatusEmptyState,
  StatusEmptyStateDescription,
  StatusEmptyStateTitle,
  StatusHeader,
  StatusTitle,
} from "@/components/status-page/status";
import { useStatusPage } from "@/components/status-page/floating-button";
import { StatusMonitorTitle } from "@/components/status-page/status-monitor";
import { StatusMonitorDescription } from "@/components/status-page/status-monitor";
import { monitors } from "@/data/monitors";
import { ChartAreaPercentiles } from "@/components/chart/chart-area-percentiles";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Page() {
  const { variant, emptyState } = useStatusPage();
  return (
    <Status variant={variant}>
      <StatusHeader>
        <StatusTitle>Craft</StatusTitle>
        <StatusDescription>Stay informed about the stability</StatusDescription>
      </StatusHeader>
      <StatusContent className="flex flex-col gap-6">
        {emptyState ? (
          <StatusEmptyState>
            <Activity className="size-4 text-muted-foreground" />
            <StatusEmptyStateTitle>No monitors</StatusEmptyStateTitle>
            <StatusEmptyStateDescription>
              There are no monitors available.
            </StatusEmptyStateDescription>
          </StatusEmptyState>
        ) : (
          // TODO: create components
          monitors
            .filter((monitor) => monitor.public)
            .map((monitor) => (
              <Link
                key={monitor.id}
                href="/status-page/monitors/view"
                className="rounded-lg"
              >
                <div className="group flex flex-col gap-2 hover:bg-muted/50 border border-transparent hover:border-border/50 rounded-lg px-3 -mx-3 py-2 -my-2">
                  <div className="flex flex-row items-center gap-2">
                    <StatusMonitorTitle>{monitor.name}</StatusMonitorTitle>
                    <StatusMonitorDescription>
                      {monitor.description}
                    </StatusMonitorDescription>
                  </div>
                  <ChartAreaPercentiles
                    className="h-[80px]"
                    legendClassName="pb-1"
                    singleSeries
                  />
                </div>
              </Link>
            ))
        )}
      </StatusContent>
    </Status>
  );
}
