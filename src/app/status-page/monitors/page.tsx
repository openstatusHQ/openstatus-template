"use client";

import { Activity } from "lucide-react";
import Link from "next/link";
import { ChartAreaPercentiles } from "@/components/chart/chart-area-percentiles";
import { useStatusPage } from "@/components/status-page/floating-button";
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
import {
  StatusMonitorDescription,
  StatusMonitorTitle,
} from "@/components/status-page/status-monitor";
import { monitors } from "@/data/monitors";

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
                <div className="group -mx-3 -my-2 flex flex-col gap-2 rounded-lg border border-transparent px-3 py-2 hover:border-border/50 hover:bg-muted/50">
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
