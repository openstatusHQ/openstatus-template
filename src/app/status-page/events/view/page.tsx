"use client";

import { formatDate } from "@/lib/formatter";

import {
  StatusEventDate,
  StatusEventTitle,
  StatusEventAffected,
  StatusEventContent,
  StatusEvent,
  StatusEventTimelineReport,
} from "@/components/status-page/status-events";
import { statusReports } from "@/data/status-reports";
import { Badge } from "@/components/ui/badge";

const report = statusReports[2];

export default function EventPage() {
  return (
    <StatusEvent key={report.id}>
      <StatusEventDate>
        {formatDate(report.startedAt, { month: "short" })}
      </StatusEventDate>
      <StatusEventContent hoverable={false}>
        <StatusEventTitle>{report.name}</StatusEventTitle>
        <StatusEventAffected className="flex flex-wrap gap-1">
          {report.affected.map((affected) => (
            <Badge key={affected} variant="outline" className="text-[10px]">
              {affected}
            </Badge>
          ))}
        </StatusEventAffected>
        <StatusEventTimelineReport updates={report.updates} />
      </StatusEventContent>
    </StatusEvent>
  );
}
