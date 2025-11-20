"use client";

import type { Row } from "@tanstack/react-table";
import { useRef } from "react";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { FormSheetNotifier } from "@/components/forms/notifier/sheet";
import { getActions } from "@/data/notifiers.client";

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
          confirmationValue: "delete notifier",
        }}
      />
      {/* NOTE: id is provider name */}
      <FormSheetNotifier id="email">
        <button ref={buttonRef} className="sr-only">
          Open sheet
        </button>
      </FormSheetNotifier>
    </>
  );
}
