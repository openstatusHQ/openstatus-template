"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { Feedback } from "@/components/feedback";
import { getActions } from "@/data/status-pages.client";

export function NavActions() {
  const router = useRouter();
  const actions = getActions({
    edit: () => router.push(`/dashboard/status-pages/edit`),
    "copy-id": () => {
      navigator.clipboard.writeText("ID");
      toast.success("Status Page ID copied to clipboard");
    },
  });

  return (
    <div className="flex items-center gap-2 text-sm">
      <Feedback />
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
