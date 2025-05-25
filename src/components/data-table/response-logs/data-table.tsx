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
import { regions } from "@/data/regions";

export function DataTable({ data }: { data: ResponseLog[] }) {
  // TODO: use rowSelection from tanstack-table
  const [selectedRow, setSelectedRow] = useState<ResponseLog | null>(null);
  const regionConfig = regions.find(
    (region) => region.code === selectedRow?.region
  );

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
                <TableCell className="font-mono whitespace-normal">
                  {selectedRow?.timestamp}
                </TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  Status
                </TableHead>
                <TableCell className="font-mono whitespace-normal">
                  {selectedRow?.status}
                </TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  URL
                </TableHead>
                <TableCell className="font-mono whitespace-normal">
                  {selectedRow?.url}
                </TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  Latency
                </TableHead>
                <TableCell className="font-mono whitespace-normal">
                  {selectedRow?.latency}ms
                </TableCell>
              </TableRow>
              <TableRow className="[&>:not(:last-child)]:border-r">
                <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                  Region
                </TableHead>
                <TableCell className="font-mono whitespace-normal">
                  {regionConfig?.flag} {regionConfig?.code}{" "}
                  <span className="text-muted-foreground">
                    {regionConfig?.location}
                  </span>
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
                    <TableCell className="font-mono whitespace-normal">
                      {value}
                    </TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableHead colSpan={2}>Timing</TableHead>
              </TableRow>
              {Object.entries(selectedRow?.timing ?? {}).map(
                ([key, value], index) => (
                  <TableRow
                    key={key}
                    className="[&>:not(:last-child)]:border-r"
                  >
                    <TableHead className="bg-muted/50 text-muted-foreground font-normal">
                      <span className="uppercase">{key}</span>
                    </TableHead>
                    <TableCell className="font-mono whitespace-normal">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <span className="text-muted-foreground">
                            {new Intl.NumberFormat("en-US", {
                              maximumFractionDigits: 2,
                            }).format(
                              (value / (selectedRow?.latency || 100)) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex-1 flex items-center justify-end gap-2 w-full">
                          <span className="text-muted-foreground">
                            {value}ms
                          </span>
                          <div
                            className="h-4"
                            style={{
                              width: `${
                                (value / (selectedRow?.latency || 100)) * 100
                              }%`,
                              backgroundColor: `var(--chart-${index + 1})`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
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
