"use client";

import { statusReports } from "@/data/status-reports";
import { maintenances } from "@/data/maintenances";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  StatusEvent,
  StatusEventTitle,
  StatusEventAside,
  StatusEventAffected,
  StatusEventTimelineReport,
  StatusEventContent,
  StatusEventTimelineMaintenance,
} from "@/components/status-page/status-events";
import {
  StatusEmptyState,
  StatusEmptyStateTitle,
  StatusEmptyStateDescription,
} from "@/components/status-page/status";
import { useStatusPage } from "@/components/status-page/floating-button";
import { Newspaper } from "lucide-react";

export default function Page() {
  const { emptyState } = useStatusPage();

  return (
    <Tabs defaultValue="reports" className="gap-4">
      <TabsList>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="maintenances">Maintenances</TabsTrigger>
      </TabsList>
      <TabsContent
        value="reports"
        className="flex flex-col gap-4 px-3 -mx-3 py-2 -my-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-lg"
      >
        {emptyState ? (
          <StatusEmptyState>
            <Newspaper className="size-4 text-muted-foreground" />
            <StatusEmptyStateTitle>No events</StatusEmptyStateTitle>
            <StatusEmptyStateDescription>
              There are no status reports available.
            </StatusEmptyStateDescription>
          </StatusEmptyState>
        ) : (
          statusReports.map((report) => (
            <StatusEvent key={report.id}>
              <StatusEventAside>
                <span className="font-medium text-foreground/80">
                  {formatDate(report.startedAt, { month: "short" })}
                </span>
              </StatusEventAside>
              <Link href="/status-page/events/report" className="rounded-lg">
                <StatusEventContent>
                  <StatusEventTitle>{report.name}</StatusEventTitle>
                  <StatusEventAffected className="flex flex-wrap gap-1">
                    {report.affected.map((affected) => (
                      <Badge
                        key={affected}
                        variant="outline"
                        className="text-[10px]"
                      >
                        {affected}
                      </Badge>
                    ))}
                  </StatusEventAffected>
                  <StatusEventTimelineReport updates={report.updates} />
                </StatusEventContent>
              </Link>
            </StatusEvent>
          ))
        )}
      </TabsContent>
      <TabsContent
        value="maintenances"
        className="flex flex-col gap-4 px-3 -mx-3 py-2 -my-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-lg"
      >
        {emptyState ? (
          <StatusEmptyState>
            <Newspaper className="size-4 text-muted-foreground" />
            <StatusEmptyStateTitle>No events</StatusEmptyStateTitle>
            <StatusEmptyStateDescription>
              There are no maintenances available.
            </StatusEmptyStateDescription>
          </StatusEmptyState>
        ) : (
          maintenances.map((maintenance) => {
            const isFuture = maintenance.startDate > new Date();
            return (
              <StatusEvent key={maintenance.id}>
                <StatusEventAside>
                  <span className="font-medium text-foreground/80">
                    {formatDate(maintenance.startDate, { month: "short" })}
                  </span>
                  {isFuture ? (
                    <span className="text-info text-sm">Upcoming</span>
                  ) : null}
                </StatusEventAside>
                <Link
                  href="/status-page/events/maintenance"
                  className="rounded-lg"
                >
                  <StatusEventContent>
                    <StatusEventTitle>{maintenance.title}</StatusEventTitle>
                    <StatusEventAffected className="flex flex-wrap gap-1">
                      {maintenance.affected.map((affected) => (
                        <Badge
                          key={affected}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {affected}
                        </Badge>
                      ))}
                    </StatusEventAffected>
                    <StatusEventTimelineMaintenance maintenance={maintenance} />
                  </StatusEventContent>
                </Link>
              </StatusEvent>
            );
          })
        )}
      </TabsContent>
    </Tabs>
  );
}
