"use client";

import {
  Status,
  StatusBanner,
  StatusContent,
  StatusDescription,
  StatusEmptyState,
  StatusEmptyStateDescription,
  StatusEmptyStateTitle,
  StatusHeader,
  StatusTitle,
} from "@/components/status-page/status";
import { StatusMonitor } from "@/components/status-page/status-monitor";
import { useStatusPage } from "@/components/status-page/floating-button";
import { chartData } from "@/components/status-page/utils";
import { monitors } from "@/data/monitors";
import { StatusTrackerGroup } from "@/components/status-page/status-tracker-group";
import { Activity, Newspaper } from "lucide-react";

export default function Page() {
  const { variant, cardType, barType, showUptime, emptyState } =
    useStatusPage();

  return (
    <div className="flex flex-col gap-6">
      <Status variant={variant}>
        <StatusHeader>
          <StatusTitle>Craft</StatusTitle>
          <StatusDescription>
            Stay informed about the stability
          </StatusDescription>
        </StatusHeader>
        <StatusBanner />
        <StatusContent>
          {emptyState ? (
            <StatusEmptyState>
              <Activity className="size-4 text-muted-foreground" />
              <StatusEmptyStateTitle>No monitors</StatusEmptyStateTitle>
              <StatusEmptyStateDescription>
                There are no monitors available.
              </StatusEmptyStateDescription>
            </StatusEmptyState>
          ) : (
            <>
              <StatusMonitor
                variant={variant}
                cardType={cardType}
                barType={barType}
                data={chartData}
                monitor={monitors[1]}
                showUptime={showUptime}
              />
              <StatusTrackerGroup title="US Endpoints" variant={variant}>
                <StatusMonitor
                  variant={variant}
                  cardType={cardType}
                  barType={barType}
                  data={chartData}
                  monitor={monitors[0]}
                  showUptime={showUptime}
                />
                <StatusMonitor
                  variant={variant}
                  cardType={cardType}
                  barType={barType}
                  data={chartData}
                  monitor={monitors[1]}
                  showUptime={showUptime}
                />
              </StatusTrackerGroup>
              <StatusTrackerGroup title="EU Endpoints" variant={variant}>
                <StatusMonitor
                  variant={variant}
                  cardType={cardType}
                  barType={barType}
                  data={chartData}
                  monitor={monitors[0]}
                  showUptime={showUptime}
                />
                <StatusMonitor
                  variant={variant}
                  cardType={cardType}
                  barType={barType}
                  data={chartData}
                  monitor={monitors[1]}
                  showUptime={showUptime}
                />
              </StatusTrackerGroup>
            </>
          )}
        </StatusContent>
        <StatusContent>
          <StatusEmptyState>
            <Newspaper className="size-4 text-muted-foreground" />
            <StatusEmptyStateTitle>No recent events</StatusEmptyStateTitle>
            <StatusEmptyStateDescription>
              There have been no reports within the last 7 days.
            </StatusEmptyStateDescription>
          </StatusEmptyState>
        </StatusContent>
      </Status>
    </div>
  );
}
