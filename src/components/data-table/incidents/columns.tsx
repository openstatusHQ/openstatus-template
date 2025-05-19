"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Incident } from "@/data/incidents";
import { Link } from "@/components/common/link";

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "monitor",
    header: "Monitor",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const value = String(row.getValue("monitor"));
      return <Link href="/dashboard/monitors/incidents">{value}</Link>;
    },
  },
  {
    accessorKey: "cause",
    header: "Cause",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "message",
    header: "Message",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const value = String(row.getValue("message"));
      return (
        <div className="text-muted-foreground max-w-[200px] truncate">
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "startedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Started At" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("startedAt");
      if (value instanceof Date) {
        return (
          <div className="text-muted-foreground">{value.toLocaleString()}</div>
        );
      }
      if (typeof value === "string") {
        return <div className="text-muted-foreground">{value}</div>;
      }
      return <div className="text-muted-foreground">-</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground font-mono">
          {row.getValue("duration")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
