"use client";

import type { Row } from "@tanstack/react-table";
import { useRef } from "react";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { FormSheetStatusReport } from "@/components/forms/status-report/sheet";
import { FormSheetStatusReportUpdate } from "@/components/forms/status-report-update/sheet";
import { getActions } from "@/data/status-reports.client";

interface DataTableRowActionsProps<TData> {
  row?: Row<TData>;
}

export function DataTableRowActions<TData>(
  _props: DataTableRowActionsProps<TData>,
) {
  const buttonCreateRef = useRef<HTMLButtonElement>(null);
  const buttonUpdateRef = useRef<HTMLButtonElement>(null);
  const actions = getActions({
    edit: () => buttonCreateRef.current?.click(),
    "create-update": () => buttonUpdateRef.current?.click(),
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
        <button ref={buttonCreateRef} className="sr-only">
          Open sheet
        </button>
      </FormSheetStatusReport>
      <FormSheetStatusReportUpdate>
        <button ref={buttonUpdateRef} className="sr-only">
          Open sheet
        </button>
      </FormSheetStatusReportUpdate>
    </>
  );
}
