"use client";

import { DataTable as DefaultDataTable } from "@/components/ui/data-table/data-table";
import { ResponseLog } from "@/data/response-logs";
import { columns } from "./columns";
import {
  DataTableSheet,
  DataTableSheetContent,
  DataTableSheetTitle,
  DataTableSheetFooter,
  DataTableSheetHeader,
} from "@/components/data-table/data-table-sheet";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export function DataTable({ data }: { data: ResponseLog[] }) {
  // TODO: use rowSelection from tanstack-table
  const [selectedRow, setSelectedRow] = useState<ResponseLog | null>(null);

  return (
    <>
      <DefaultDataTable
        columns={columns}
        data={data}
        // NOTE: example of how to use rowSelection from tanstack-table
        //   <Checkbox
        //   checked={row.getIsSelected()}
        //   onCheckedChange={(value) => row.toggleSelected(!!value)}
        // />
        onRowClick={(row) => setSelectedRow(row.original)}
      />
      <DataTableSheet
        open={!!selectedRow}
        onOpenChange={() => setSelectedRow(null)}
      >
        <DataTableSheetContent>
          <DataTableSheetHeader className="px-2">
            <DataTableSheetTitle>Response Logs</DataTableSheetTitle>
          </DataTableSheetHeader>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead colSpan={2}>Request</TableHead>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  Timestamp
                </TableHead>
                <TableCell className="font-mono">
                  {selectedRow?.timestamp}
                </TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  Status
                </TableHead>
                <TableCell className="font-mono">
                  {selectedRow?.status}
                </TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  URL
                </TableHead>
                <TableCell className="font-mono">{selectedRow?.url}</TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  Latency
                </TableHead>
                <TableCell className="font-mono">
                  {selectedRow?.latency}ms
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead colSpan={2}>Headers</TableHead>
              </TableRow>
              {Object.entries(selectedRow?.headers ?? {}).map(
                ([key, value]) => (
                  <TableRow
                    key={key}
                    className="[&>:not(:last-child)]:border-r"
                  >
                    <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                      {key}
                    </TableHead>
                    <TableCell className="font-mono">{value}</TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableHead colSpan={2}>Timing</TableHead>
              </TableRow>
              {Object.entries(selectedRow?.timing ?? {}).map(([key, value]) => (
                <TableRow key={key} className="[&>:not(:last-child)]:border-r">
                  <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                    {key}
                  </TableHead>
                  <TableCell className="font-mono">{value}ms</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DataTableSheetFooter>
            <Button variant="outline">
              <Share />
              Share
            </Button>
          </DataTableSheetFooter>
        </DataTableSheetContent>
      </DataTableSheet>
    </>
  );
}
