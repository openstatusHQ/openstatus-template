"use client";

import type { Row } from "@tanstack/react-table";
import { useRef } from "react";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { FormSheetStatusReportUpdate } from "@/components/forms/status-report-update/sheet";
import { getActions } from "@/data/status-report-updates.client";

interface DataTableRowActionsProps<TData> {
  row?: Row<TData>;
}

export function DataTableRowActions<TData>(
  _props: DataTableRowActionsProps<TData>,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const actions = getActions({
    edit: () => buttonRef.current?.click(),
  });

  return (
    <>
      <QuickActions
        actions={actions}
        deleteAction={{
          title: "Delete",
          confirmationValue: "delete",
        }}
      />
      <FormSheetStatusReportUpdate>
        <button ref={buttonRef} className="sr-only">
          Open sheet
        </button>
      </FormSheetStatusReportUpdate>
    </>
  );
}
