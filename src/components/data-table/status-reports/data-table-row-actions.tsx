"use client";

import { Row } from "@tanstack/react-table";
import { getActions } from "@/data/status-reports.client";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { FormSheetStatusReport } from "@/components/forms/status-report/sheet";
import { useRef } from "react";

interface DataTableRowActionsProps<TData> {
  row?: Row<TData>;
}

export function DataTableRowActions<TData>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: DataTableRowActionsProps<TData>
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
      <FormSheetStatusReport>
        <button ref={buttonRef} className="sr-only">
          Open sheet
        </button>
      </FormSheetStatusReport>
    </>
  );
}
