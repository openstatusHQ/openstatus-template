"use client";

import {
  Copy,
  CopyPlus,
  File,
  Forward,
  Pencil,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function NavActions() {
  const router = useRouter();

  const actions = useMemo(() => {
    return [
      {
        id: "edit",
        label: "Edit",
        icon: Pencil,
        variant: "default" as const,
        onClick: () => router.push(`/dashboard/monitors/edit`),
      },
      {
        id: "share",
        label: "Share",
        icon: Forward,
        variant: "default" as const,
      },
      {
        id: "copy-id",
        label: "Copy ID",
        icon: Copy,
        variant: "default" as const,
      },
      {
        id: "duplicate",
        label: "Duplicate",
        icon: CopyPlus,
        variant: "default" as const,
      },
      {
        id: "export",
        label: "Export",
        icon: File,
        variant: "default" as const,
      },
      {
        id: "delete",
        label: "Delete",
        icon: Trash2,
        variant: "destructive" as const,
      },
    ];
  }, [router]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground lg:inline-block">
        Last ping 5m ago
        <span className="relative inline-flex ml-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Zap />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Trigger Monitor</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <QuickActions
        actions={actions}
        deleteAction={{
          title: "Monitor",
          confirmationValue: "delete monitor",
        }}
      />
    </div>
  );
}
