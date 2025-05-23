"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Incident } from "@/data/incidents";
import { Link } from "@/components/common/link";
import { DataTableCellDate } from "../data-table-cell-date";

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "monitor",
    header: "Monitor",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const value = String(row.getValue("monitor"));
      return <Link href="/dashboard/monitors/overview">{value}</Link>;
    },
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
    accessorKey: "startedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Started At" />
    ),
    cell: ({ row }) => <DataTableCellDate value={row.getValue("startedAt")} />,
    enableHiding: false,
  },
  {
    accessorKey: "acknowledged",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acknowledged" />
    ),
    cell: ({ row }) => (
      <DataTableCellDate value={row.getValue("acknowledged")} />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "resolvedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolved At" />
    ),
    cell: ({ row }) => <DataTableCellDate value={row.getValue("resolvedAt")} />,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
