"use client";

import { DataTable as DefaultDataTable } from "@/components/ui/data-table/data-table";
import { ResponseLog } from "@/data/response-logs";
import { columns } from "./columns";
import {
  DataTableSheet,
  DataTableSheetContent,
  DataTableSheetTitle,
  DataTableSheetHeader,
} from "@/components/data-table/data-table-sheet";
import { useState } from "react";

export function DataTable({ data }: { data: ResponseLog[] }) {
  const [selectedRow, setSelectedRow] = useState<ResponseLog | null>(null);

  return (
    <>
      <DefaultDataTable
        columns={columns}
        data={data}
        onRowClick={(row) => setSelectedRow(row.original)}
      />
      <DataTableSheet
        open={!!selectedRow}
        onOpenChange={() => setSelectedRow(null)}
      >
        <DataTableSheetContent>
          <DataTableSheetHeader>
            <DataTableSheetTitle>Response Logs</DataTableSheetTitle>
          </DataTableSheetHeader>
          <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
        </DataTableSheetContent>
      </DataTableSheet>
    </>
  );
}
