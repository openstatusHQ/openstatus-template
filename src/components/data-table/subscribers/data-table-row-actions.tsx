"use client";

import type { Row } from "@tanstack/react-table";
import { QuickActions } from "@/components/dropdowns/quick-actions";

interface DataTableRowActionsProps<TData> {
  row?: Row<TData>;
}

export function DataTableRowActions<TData>(
  _props: DataTableRowActionsProps<TData>,
) {
  return (
    <QuickActions
      actions={[]}
      deleteAction={{
        title: "Subscribers",
      }}
    />
  );
}
