"use client";

import { Row } from "@tanstack/react-table";
import { getActions } from "@/data/status-reports.client";
import { QuickActions } from "@/components/dropdowns/quick-actions";

interface DataTableRowActionsProps<TData> {
  row?: Row<TData>;
}

export function DataTableRowActions<TData>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: DataTableRowActionsProps<TData>
) {
  const actions = getActions({
    edit: () => {
      console.log("edit");
    },
  });

  return (
    <QuickActions
      actions={actions}
      deleteAction={{
        title: "Delete",
        confirmationValue: "delete",
      }}
    />
  );
}
