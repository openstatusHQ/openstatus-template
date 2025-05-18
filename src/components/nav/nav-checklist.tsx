import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Check, Minus, X } from "lucide-react";

export function NavChecklist() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden bg-background rounded-lg border">
      <SidebarGroupLabel className="flex items-center justify-between pr-1">
        <span>Checklist</span>
        <SidebarMenuAction className="relative top-0 right-0">
          <X className="text-muted-foreground" size={16} />
        </SidebarMenuAction>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2">
          <Check className="text-green-500" size={16} />
          <span>Create Monitor</span>
        </SidebarMenuItem>
        <SidebarMenuItem className="flex items-center gap-2">
          <Check className="text-green-500" size={16} />
          <span>Create Status Page</span>
        </SidebarMenuItem>
        <SidebarMenuItem className="flex items-center gap-2">
          <Minus className="text-muted-foreground/50" size={16} />
          <span>Create Notifier</span>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
