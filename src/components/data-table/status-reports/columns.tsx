"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { StatusReport } from "@/data/status-reports";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<StatusReport>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          {...{
            className: "size-7 shadow-none text-muted-foreground",
            onClick: row.getToggleExpandedHandler(),
            "aria-expanded": row.getIsExpanded(),
            "aria-label": row.getIsExpanded()
              ? `Collapse details for ${row.original.name}`
              : `Expand details for ${row.original.name}`,
            size: "icon",
            variant: "ghost",
          }}
        >
          {row.getIsExpanded() ? (
            <ChevronUp className="opacity-60" size={16} aria-hidden="true" />
          ) : (
            <ChevronDown className="opacity-60" size={16} aria-hidden="true" />
          )}
        </Button>
      ) : undefined;
    },
    meta: {
      headerClassName: "w-7",
    },
  },
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground font-mono">
          {row.getValue("duration")}
        </div>
      );
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
    meta: {
      cellClassName: "w-[170px]",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    meta: {
      cellClassName: "w-8",
    },
  },
];
