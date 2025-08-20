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
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const report = statusReports[2];

export default function EventPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between items-center gap-2 py-0.5">
        <BackButton />
        <CopyButton />
      </div>
      <StatusEvent>
        <StatusEventDate>
          {formatDate(report.startedAt, { month: "short" })}
        </StatusEventDate>
        <StatusEventContent hoverable={false}>
          <StatusEventTitle>{report.name}</StatusEventTitle>
          <StatusEventAffected className="flex flex-wrap gap-1">
            {report.affected.map((affected) => (
              // TODO: use StatusEventAffectedBadge component
              <Badge key={affected} variant="outline" className="text-[10px]">
                {affected}
              </Badge>
            ))}
          </StatusEventAffected>
          <StatusEventTimelineReport updates={report.updates} />
        </StatusEventContent>
      </StatusEvent>
    </div>
  );
}

function BackButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("text-muted-foreground", className)}
      asChild
      {...props}
    >
      <Link href="/status-page/events">
        <ArrowLeft />
        Back
      </Link>
    </Button>
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
