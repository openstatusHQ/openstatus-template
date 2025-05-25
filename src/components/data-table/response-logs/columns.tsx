"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ResponseLog } from "@/data/response-logs";
import { cn } from "@/lib/utils";
import { HoverCardPortal } from "@radix-ui/react-hover-card";
import { ColumnDef } from "@tanstack/react-table";
import { TableCellDate } from "@/components/data-table/table-cell-date";
import { TableCellNumber } from "@/components/data-table/table-cell-number";
import { HoverCardTimestamp } from "@/components/common/hover-card-timestamp";
import { Clock, Workflow, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BillingOverlayButton,
  BillingOverlay,
  BillingOverlayContainer,
  BillingOverlayDescription,
} from "@/components/content/billing-overlay";
import Link from "next/link";

const icons = {
  scheduled: Clock,
  "on-demand": Workflow,
};

export const columns: ColumnDef<ResponseLog>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const value = new Date(row.getValue("timestamp"));
      return (
        <HoverCardTimestamp date={value}>
          <TableCellDate value={value} className="text-foreground" />
        </HoverCardTimestamp>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    enableSorting: false,
    enableHiding: false,
    meta: {
      cellClassName: "text-muted-foreground",
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    enableHiding: false,
    meta: {
      cellClassName: "font-mono",
    },
  },
  {
    accessorKey: "latency",
    header: "Latency",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return <TableCellNumber value={row.getValue("latency")} unit="ms" />;
    },
  },
  {
    accessorKey: "timing",
    header: "Timing",
    cell: ({ row }) => {
      const value = row.getValue("timing") as ResponseLog["timing"];
      return <HoverCardTiming timing={value} latency={row.original.latency} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const value = row.getValue("type");
      if (value === "scheduled" || value === "on-demand") {
        const Icon = icons[value];
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icon className="size-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="capitalize">{value}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return <div className="text-muted-foreground">-</div>;
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      cellClassName: "font-mono",
      headerClassName: "sr-only",
    },
  },
];

// TODO: add BillingContainer to content if locked
const LOCKED = true;

function HoverCardTiming({
  timing,
  latency,
}: {
  timing: ResponseLog["timing"];
  latency: ResponseLog["latency"];
}) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger
        className="opacity-70 hover:opacity-100 data-[state=open]:opacity-100"
        asChild
      >
        <div className="flex">
          {Object.entries(timing).map(([key, value], index) => (
            <div
              key={key}
              className={cn("h-4")}
              style={{
                width: `${(value / latency) * 100}%`,
                backgroundColor: `var(--chart-${index + 1})`,
              }}
            />
          ))}
        </div>
      </HoverCardTrigger>
      {/* REMINDER: allows us to port the content to the document.body, which is helpful when using opacity-50 on the row element */}
      <HoverCardPortal>
        <HoverCardContent side="bottom" align="end" className="z-10 w-auto p-2">
          {LOCKED ? (
            <BillingOverlayContainer>
              <HoverCardTimingContent {...{ latency, timing }} />
              <BillingOverlay>
                <BillingOverlayButton asChild>
                  <Link href="/dashboard/settings/billing">
                    <Lock />
                    Upgrade to Pro
                  </Link>
                </BillingOverlayButton>
                <BillingOverlayDescription>
                  Access timing phases.
                </BillingOverlayDescription>
              </BillingOverlay>
            </BillingOverlayContainer>
          ) : (
            <HoverCardTimingContent {...{ latency, timing }} />
          )}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}

function HoverCardTimingContent({
  timing,
  latency,
}: {
  timing: ResponseLog["timing"];
  latency: ResponseLog["latency"];
}) {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(timing).map(([key, value], index) => {
        return (
          <div key={key} className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div
                className={cn("h-2 w-2 rounded-full")}
                style={{ backgroundColor: `var(--chart-${index + 1})` }}
              />
              <div className="font-mono uppercase text-accent-foreground">
                {key}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="font-mono text-muted-foreground">
                {`${new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 2,
                }).format((value / latency) * 100)}%`}
              </div>
              <div className="font-mono">
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 3,
                }).format(value)}
                <span className="text-muted-foreground">ms</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
