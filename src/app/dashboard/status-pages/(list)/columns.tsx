"use client";

import { Link } from "@/components/common/link";
import type { StatusPage } from "@/data/status-pages";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StatusPage>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = String(row.getValue("name"));
      return <Link href={`status-pages/status-reports`}>{value}</Link>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "favicon",
    header: "Favicon",
    cell: ({ row }) => {
      const value = String(row.getValue("favicon"));
      return (
        <img
          src={value}
          alt={`Favicon for ${row.getValue("name")}`}
          className="w-4 h-4 border rounded bg-muted"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    enableSorting: false,
    enableHiding: false,
    meta: {
      cellClassName: "font-mono",
    },
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ row }) => {
      const value = String(row.getValue("domain"));
      return (
        <Link href={"#"} className="font-mono">
          {value}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
