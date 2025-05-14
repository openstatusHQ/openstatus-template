"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { icons } from "@/data/icons";
import { statusReports } from "@/data/status-reports";
import { cn } from "@/lib/utils";
import { DataTableRowActions } from "../data-table-row-actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FormCard,
  FormCardContent,
  FormCardGroup,
  FormCardSeparator,
} from "@/components/form/form-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

const colors = {
  operational: "text-green-500/80",
  investigating: "text-red-500/80",
};

export function DataTable() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[px]">
            <span className="sr-only">Status</span>
          </TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[px]">
            <span className="sr-only">Open menu</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statusReports[0].updates.map((update) => {
          console.log(update);
          const Icon = icons.status[update.status];
          return (
            <Sheet key={update.id}>
              <SheetTrigger asChild>
                <TableRow>
                  <TableCell className="w-[51px]">
                    <Icon
                      className={cn(colors[update.status], "ml-1")}
                      size={20}
                    />
                  </TableCell>
                  <TableCell>
                    <p className="text-wrap">{update.message}</p>
                  </TableCell>
                  <TableCell>{update.date.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="mr-2">
                      <DataTableRowActions />
                    </div>
                  </TableCell>
                </TableRow>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Status Report Update</SheetTitle>
                  <SheetDescription>
                    Configure and update the status of your report.
                  </SheetDescription>
                </SheetHeader>
                <FormCardGroup>
                  <FormCard className="border-none">
                    <FormCardContent>
                      <div className="grid gap-1.5">
                        <Label>Status</Label>
                        <Select defaultValue={update.status}>
                          <SelectTrigger
                            className={cn(colors[update.status], "font-mono")}
                          >
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="operational">
                              Operational
                            </SelectItem>
                            <SelectItem value="investigating">
                              Investigating
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormCardContent>
                    <FormCardSeparator />
                    <FormCardContent>
                      <div className="grid gap-1.5">
                        <Label>Date</Label>
                        <Calendar />
                      </div>
                    </FormCardContent>
                    <FormCardSeparator />
                    <FormCardContent>
                      <div className="grid gap-1.5">
                        <Label>Message</Label>
                        <Textarea rows={6} defaultValue={update.message} />
                      </div>
                    </FormCardContent>
                  </FormCard>
                </FormCardGroup>
                <SheetFooter>
                  <Button>Submit</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          );
        })}
      </TableBody>
    </Table>
  );
}
