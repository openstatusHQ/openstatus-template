"use client";

import { useState, useEffect, useRef } from "react";
import { chartConfig, getHighestPriorityStatus, type ChartData } from "./utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDistanceStrict, isSameDay } from "date-fns";
import { messages, requests } from "./messages";
import { Separator } from "@/components/ui/separator";
// TODO: make it a property of the component
import { statusReports } from "@/data/status-reports";
import Link from "next/link";
import { Kbd } from "@/components/common/kbd";
import { CardType, BarType, VARIANT } from "./floating-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatDateRange } from "@/lib/formatter";

// TODO: keyboard arrow navigation
// FIXME: on small screens, avoid pinned state
// TODO: only on real mobile devices, use click events
// TODO: improve status reports -> add duration and time
// TODO: support headless mode -> both card and bar type share only maintenance or degraded mode
// TODO: support status page logo + onClick to homepage

const STATUS = VARIANT;

export function StatusTracker({
  cardType = "duration",
  barType = "absolute",
  data,
}: {
  cardType?: CardType;
  barType?: BarType;
  data: ChartData[];
}) {
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery("(hover: none)");

  // Window-level Escape key listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && pinnedIndex !== null) {
        setPinnedIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [pinnedIndex]);

  // Document-level outside click listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        pinnedIndex !== null &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setPinnedIndex(null);
      }
    };

    if (pinnedIndex !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [pinnedIndex]);

  // Handle keyboard events for accessibility (kept for fallback)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setPinnedIndex(null);
    }
  };

  const handleBarClick = (index: number) => {
    // Toggle pinned state: if clicking the same bar, unpin it; otherwise, pin the new bar
    if (pinnedIndex === index) {
      setPinnedIndex(null);
    } else {
      setPinnedIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex h-[50px] w-full items-end"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {data.map((item, index) => {
        const isPinned = pinnedIndex === index;

        const reports = statusReports.filter((report) => {
          const reportDate = new Date(report.startedAt);
          const itemDate = new Date(item.timestamp);
          return isSameDay(reportDate, itemDate);
        });

        return (
          <HoverCard
            key={item.timestamp}
            openDelay={0}
            closeDelay={0}
            open={isPinned ? true : undefined}
          >
            <HoverCardTrigger asChild>
              <div
                className="group relative flex h-full w-full cursor-pointer flex-col transition-opacity hover:opacity-80 px-px sm:px-0.5"
                onClick={() => handleBarClick(index)}
              >
                {(() => {
                  switch (barType) {
                    case "absolute":
                      return <StatusTrackerTriggerAbsolute item={item} />;
                    case "dominant":
                      return <StatusTrackerTriggerDominant item={item} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" align="center" className="w-auto p-0">
              <div>
                <div className="text-xs p-2">
                  {new Date(item.timestamp).toLocaleDateString("default", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <Separator />
                <div className="p-2 space-y-1 text-sm">
                  {(() => {
                    switch (cardType) {
                      case "duration":
                        return <StatusTrackerContentDuration item={item} />;
                      case "dominant":
                        return <StatusTrackerContentDominant item={item} />;
                      case "requests":
                        return <StatusTrackerContentRequests item={item} />;
                      default:
                        return null;
                    }
                  })()}
                </div>
                {reports.length > 0 ? (
                  <>
                    <Separator />
                    <div className="p-2">
                      {reports.map((report) => {
                        const updates = report.updates.sort(
                          (a, b) => a.date.getTime() - b.date.getTime()
                        );
                        const startedAt = new Date(updates[0].date);
                        const endedAt = new Date(
                          updates[updates.length - 1].date
                        );
                        const duration = formatDistanceStrict(
                          startedAt,
                          endedAt
                        );
                        return (
                          <Link key={report.id} href={`#`}>
                            <div className="group text-sm relative">
                              {/* NOTE: this is to make the text truncate based on the with of the sibling element */}
                              {/* REMINDER: height needs to be equal the text height */}
                              <div className="w-full h-4" />
                              <div className="absolute inset-0 text-muted-foreground hover:text-foreground">
                                <div className="truncate">{report.name}</div>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {formatDateRange(startedAt, endedAt)}{" "}
                                <span className="ml-1.5 font-mono text-muted-foreground/70">
                                  {duration}
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : null}
                {isPinned && !isTouch && (
                  <>
                    <Separator />
                    <div className="p-2 cursor-pointer flex items-center text-xs text-muted-foreground">
                      <span>Click again to unpin</span>
                      <Kbd>Esc</Kbd>
                    </div>
                  </>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}

function StatusTrackerTriggerAbsolute({ item }: { item: ChartData }) {
  const total = item.success + item.degraded + item.info + item.error;

  return STATUS.map((status) => {
    const value = item[status as keyof typeof item] as number;
    if (value === 0) return null;
    const heightPercentage = (value / total) * 100;
    return (
      <div
        key={`${item.timestamp}-${status}`}
        className="w-full transition-all"
        style={{
          height: `${heightPercentage}%`,
          backgroundColor: chartConfig[status].color,
        }}
      />
    );
  });
}

function StatusTrackerTriggerDominant({ item }: { item: ChartData }) {
  const highestPriorityStatus = getHighestPriorityStatus(item);

  return (
    <div
      key={`${item.timestamp}-${highestPriorityStatus}`}
      className="w-full transition-all"
      style={{
        height: "100%",
        backgroundColor: chartConfig[highestPriorityStatus].color,
      }}
    />
  );
}

function StatusTrackerContentDuration({ item }: { item: ChartData }) {
  return STATUS.map((status) => {
    const value = item[status];
    if (value === 0) return null;

    // const percentage = ((value / total) * 100).toFixed(1);

    const now = new Date();
    const duration = formatDistanceStrict(
      now,
      new Date(now.getTime() + value * 60 * 1000)
    );

    return (
      <div key={status} className="flex items-baseline gap-4">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-sm"
            style={{
              backgroundColor: chartConfig[status].color,
            }}
          />
          <div className="text-sm">{messages.short[status]}</div>
        </div>
        <div className="ml-auto font-mono text-muted-foreground text-xs tracking-tight">
          {duration}
        </div>
      </div>
    );
  });
}

function StatusTrackerContentDominant({ item }: { item: ChartData }) {
  const highestPriorityStatus = getHighestPriorityStatus(item);
  return (
    <div className="flex items-baseline gap-4 min-w-32">
      <div className="flex items-center gap-2">
        <div
          className="h-2.5 w-2.5 rounded-sm"
          style={{
            backgroundColor: chartConfig[highestPriorityStatus].color,
          }}
        />
        <div className="text-sm">{messages.short[highestPriorityStatus]}</div>
      </div>
    </div>
  );
}

function StatusTrackerContentRequests({ item }: { item: ChartData }) {
  return STATUS.map((status) => {
    const value = item[status];
    if (value === 0) return null;

    return (
      <div key={status} className="flex items-baseline gap-4">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-sm"
            style={{
              backgroundColor: chartConfig[status].color,
            }}
          />
          <div className="text-sm">{requests[status]}</div>
        </div>
        <div className="ml-auto font-mono text-muted-foreground text-xs tracking-tight">
          {value} req
        </div>
      </div>
    );
  });
}
