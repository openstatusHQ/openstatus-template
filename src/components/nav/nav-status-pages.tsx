"use client";

import { MoreHorizontal, Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { getActions } from "@/data/status-pages.client";
import { QuickActions } from "@/components/dropdowns/quick-actions";
import { toast } from "sonner";

export function NavStatusPages({
  statusPages,
}: {
  statusPages: {
    name: string;
    url: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const actions = getActions({
    edit: () => router.push(`/dashboard/status-pages/edit`),
    "copy-id": () => {
      navigator.clipboard.writeText("ID");
      toast.success("Status Page ID copied to clipboard");
    },
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center justify-between pr-1">
        <span>
          Status Pages{" "}
          <code className="text-muted-foreground">({statusPages.length})</code>
        </span>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuAction
                  className="relative top-0 right-0 border"
                  onClick={() => router.push("/dashboard/status-pages/create")}
                >
                  <Plus className="text-muted-foreground" />
                  <span className="sr-only">Create Status Page</span>
                </SidebarMenuAction>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                Create Status Page
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {statusPages.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <QuickActions
              actions={actions}
              deleteAction={{
                title: "Monitor",
                confirmationValue: "delete monitor",
              }}
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
            >
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </QuickActions>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
