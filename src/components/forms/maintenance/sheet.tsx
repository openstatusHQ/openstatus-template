"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormCard, FormCardGroup } from "@/components/forms/form-card";
import {
  FormMaintenance,
  FormValues,
} from "@/components/forms/maintenance/form";
import { useState } from "react";

export function FormSheetMaintenance({
  children,
  defaultValues,
}: React.ComponentProps<typeof SheetTrigger> & { defaultValues?: FormValues }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>Status Report Update</SheetTitle>
          <SheetDescription>
            Configure and update the status of your report.
          </SheetDescription>
        </SheetHeader>
        <FormCardGroup>
          <FormCard className="border-none">
            <FormMaintenance
              onSubmit={() => setOpen(false)}
              defaultValue={defaultValues}
            />
          </FormCard>
        </FormCardGroup>
        <SheetFooter className="border-t">
          {defaultValues ? (
            <p className="text-muted-foreground/70 text-xs">
              Last Updated {/* TODO: use updatedAt */}
              <time>{defaultValues.startDate.toLocaleString()}</time>
            </p>
          ) : null}
          <Button type="submit" form="status-report-update-form">
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
