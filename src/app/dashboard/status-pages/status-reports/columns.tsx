"use client";

import { Link } from "@/components/common/link";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { StatusReport } from "@/data/status-reports";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StatusReport>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = String(row.getValue("name"));
      return <Link href={`monitors/overview`}>{value}</Link>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Current Status",
    cell: ({ row }) => {
      const value = String(row.getValue("status"));
      if (value === "operational") {
        return <div className="font-mono text-green-500">{value}</div>;
      }
      return <div className="font-mono text-muted-foreground">{value}</div>;
    },
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("updatedAt");
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
];
