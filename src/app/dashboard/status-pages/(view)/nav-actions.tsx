"use client";

import { QuickActions } from "@/components/dropdowns/quick-actions";
import { useRouter } from "next/navigation";
import { getActions } from "@/data/status-pages.client";
import { toast } from "sonner";
import { Feedback } from "@/components/feedback";

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
