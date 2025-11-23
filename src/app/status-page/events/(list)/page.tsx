"use client";

import { Newspaper } from "lucide-react";
import Link from "next/link";
import { useStatusPage } from "@/components/status-page/floating-button";
import {
  StatusEmptyState,
  StatusEmptyStateDescription,
  StatusEmptyStateTitle,
} from "@/components/status-page/status";
import {
  StatusEvent,
  StatusEventAffected,
  StatusEventAside,
  StatusEventContent,
  StatusEventTimelineMaintenance,
  StatusEventTimelineReport,
  StatusEventTitle,
} from "@/components/status-page/status-events";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { maintenances } from "@/data/maintenances";
import { statusReports } from "@/data/status-reports";
import { formatDate } from "@/lib/formatter";

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
        className="-mx-3 -my-2 flex flex-col gap-4 rounded-lg px-3 py-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
        className="-mx-3 -my-2 flex flex-col gap-4 rounded-lg px-3 py-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
