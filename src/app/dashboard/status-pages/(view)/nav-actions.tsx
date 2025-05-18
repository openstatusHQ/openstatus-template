"use client";

import { QuickActions } from "@/components/dropdowns/quick-actions";
import { useRouter } from "next/navigation";
import { getActions } from "@/data/status-pages.client";

export function NavActions() {
  const router = useRouter();
  const actions = getActions({
    edit: () => router.push(`/dashboard/status-pages/edit`),
  });

  return (
    <div className="flex items-center gap-2 text-sm">
      <QuickActions
        actions={actions}
        deleteAction={{
          title: "Status Page",
          confirmationValue: "delete status page",
        }}
      />
    </div>
  );
}
