"use client";

import { Link } from "@/components/common/link";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import type { Monitor } from "@/data/monitors";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Monitor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: "Status",
    cell: ({ row }) => {
      const value = String(row.getValue("status"));
      if (value === "Normal") {
        return <div className="font-mono text-green-500">{value}</div>;
      }
      return <div className="font-mono text-muted-foreground">{value}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const value = row.getValue("tags");
      if (!Array.isArray(value)) return null;
      return (
        <div className="flex gap-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastIncident",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Incident" />
    ),
    cell: ({ row }) => {
      const value = String(row.getValue("lastIncident") ?? "-");
      return <div className="text-muted-foreground">{value}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "p50",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="P50" />
    ),
    cell: ({ row }) => {
      const value = parseInt(row.getValue("p50"));
      if (isNaN(value)) {
        return <div className="font-mono text-muted-foreground">N/A</div>;
      }
      return <div className="font-mono text-muted-foreground">{value}ms</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "p90",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="P90" />
    ),
    cell: ({ row }) => {
      const value = parseInt(row.getValue("p90"));
      if (isNaN(value)) {
        return <div className="font-mono text-muted-foreground">N/A</div>;
      }
      return <div className="font-mono text-muted-foreground">{value}ms</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "p99",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="P99" />
    ),
    cell: ({ row }) => {
      const value = parseInt(row.getValue("p99"));
      if (isNaN(value)) {
        return <div className="font-mono text-muted-foreground">N/A</div>;
      }
      return <div className="font-mono text-muted-foreground">{value}ms</div>;
    },
    enableHiding: false,
  },
];
