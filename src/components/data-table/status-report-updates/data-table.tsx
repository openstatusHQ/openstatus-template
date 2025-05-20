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
import { DataTableRowActions } from "./data-table-row-actions";
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
} from "@/components/forms/form-card";
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
import { TabsContent } from "@/components/ui/tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const colors = {
  operational: "text-green-500/80",
  investigating: "text-red-500/80",
};

export function DataTable() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-7">
            <span className="sr-only">Status</span>
          </TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[px]">
            <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
              <Plus />
              <span className="sr-only">Create Status Report Update</span>
            </Button>
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
                  <TableCell>
                    <div className="p-1">
                      <Icon className={cn(colors[update.status])} size={20} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-wrap">{update.message}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground w-[170px]">
                    {update.date.toLocaleString()}
                  </TableCell>
                  <TableCell className="w-8">
                    <DataTableRowActions />
                  </TableCell>
                </TableRow>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="border-b">
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
                      <Tabs defaultValue="tab-1">
                        <TabsList>
                          <TabsTrigger value="tab-1">Writing</TabsTrigger>
                          <TabsTrigger value="tab-2">Preview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab-1">
                          <div className="grid gap-1.5">
                            <Label>Message</Label>
                            <Textarea rows={6} defaultValue={update.message} />
                            <p className="text-muted-foreground text-sm">
                              Markdown support
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="tab-2">
                          <div className="grid gap-1.5">
                            <Label>Preview</Label>
                            <p className="text-foreground py-2 px-3 text-sm border rounded-md">
                              {update.message}
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </FormCardContent>
                  </FormCard>
                </FormCardGroup>
                <SheetFooter className="border-t">
                  <p className="text-muted-foreground/70 text-xs">
                    Last Updated{" "}
                    <time>{update.updatedAt.toLocaleString()}</time>
                  </p>
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
