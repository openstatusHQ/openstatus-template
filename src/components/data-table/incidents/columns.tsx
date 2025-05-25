"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Incident } from "@/data/incidents";
import { TableCellDate } from "@/components/data-table/table-cell-date";
import { TableCellLink } from "@/components/data-table/table-cell-link";

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "monitor",
    header: "Monitor",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <TableCellLink
          value={row.getValue("monitor")}
          href="/dashboard/monitors/overview"
        />
      );
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
    cell: ({ row }) => <TableCellDate value={row.getValue("startedAt")} />,
    enableHiding: false,
  },
  {
    accessorKey: "acknowledged",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acknowledged" />
    ),
    cell: ({ row }) => <TableCellDate value={row.getValue("acknowledged")} />,
    enableHiding: false,
  },
  {
    accessorKey: "resolvedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolved At" />
    ),
    cell: ({ row }) => <TableCellDate value={row.getValue("resolvedAt")} />,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
