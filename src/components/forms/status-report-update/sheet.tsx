"use client";

import { Button } from "@/components/ui/button";
import { FormCard, FormCardGroup } from "@/components/forms/form-card";
import {
  FormStatusReportUpdate,
  FormValues,
} from "@/components/forms/status-report-update/form";
import { useState } from "react";
import {
  FormSheet,
  FormSheetContent,
  FormSheetDescription,
  FormSheetFooter,
  FormSheetFooterInfo,
  FormSheetHeader,
  FormSheetTitle,
  FormSheetTrigger,
} from "@/components/forms/form-sheet";

export function FormSheetStatusReportUpdate({
  children,
  defaultValues,
}: React.ComponentProps<typeof FormSheetTrigger> & {
  defaultValues?: FormValues;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet open={open} onOpenChange={setOpen}>
      <FormSheetTrigger asChild>{children}</FormSheetTrigger>
      <FormSheetContent>
        <FormSheetHeader>
          <FormSheetTitle>Status Report Update</FormSheetTitle>
          <FormSheetDescription>
            Configure and update the status of your report.
          </FormSheetDescription>
        </FormSheetHeader>
        <FormCardGroup className="overflow-y-scroll">
          <FormCard className="border-none overflow-auto">
            <FormStatusReportUpdate
              id="status-report-update-form"
              className="my-4"
              onSubmit={() => setOpen(false)}
              defaultValues={defaultValues}
            />
          </FormCard>
        </FormCardGroup>
        <FormSheetFooter>
          {defaultValues ? (
            <FormSheetFooterInfo>
              Last Updated <time>{defaultValues.date.toLocaleString()}</time>
            </FormSheetFooterInfo>
          ) : null}
          <Button type="submit" form="status-report-update-form">
            Submit
          </Button>
        </FormSheetFooter>
      </FormSheetContent>
    </FormSheet>
  );
}
