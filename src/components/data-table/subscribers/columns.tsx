"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Subscriber } from "@/data/subscribers";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    enableSorting: false,
    enableHiding: false,
    meta: {
      cellClassName: "font-mono",
    },
  },
  {
    accessorKey: "validatedAt",
    header: "Validated At",
    enableSorting: false,
    enableHiding: false,
    meta: {
      cellClassName: "font-mono",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
