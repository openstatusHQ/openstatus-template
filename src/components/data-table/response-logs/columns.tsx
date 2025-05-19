"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ResponseLog, Timing } from "@/data/response-logs";
import { cn } from "@/lib/utils";
import { HoverCardPortal } from "@radix-ui/react-hover-card";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ResponseLog>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const value = row.getValue("timestamp");
      if (typeof value === "number") {
        return (
          <div className="font-mono">{new Date(value).toLocaleString()}</div>
        );
      }
      return <div className="font-mono">{String(value)}</div>;
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
      const value = String(row.getValue("latency"));
      return <div className="font-mono text-muted-foreground">{value}ms</div>;
    },
  },
  {
    accessorKey: "timing",
    header: "Timing",
    cell: ({ row }) => {
      const value = row.getValue("timing") as Timing;
      return <HoverCardTiming timing={value} latency={row.original.latency} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];

function HoverCardTiming({
  timing,
  latency,
}: {
  timing: Timing;
  latency: number;
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
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}
