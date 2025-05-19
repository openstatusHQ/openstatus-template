import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Check, Minus, X } from "lucide-react";
import { Link } from "@/components/common/link";

const items = [
  { title: "Create Monitor", checked: true },
  { title: "Create Status Page", checked: true },
  { title: "Create Notifier", checked: false },
];

export function NavChecklist() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden bg-background rounded-lg border">
      <SidebarGroupLabel className="flex items-center justify-between pr-1">
        <span>Getting Started</span>
        <SidebarMenuAction className="relative top-0 right-0">
          <X className="text-muted-foreground" size={16} />
        </SidebarMenuAction>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="flex items-center gap-2 text-sm"
          >
            {item.checked ? (
              <>
                <Check className="text-green-500" size={12} />
                <span>{item.title}</span>
              </>
            ) : (
              <>
                <Minus className="text-muted-foreground/50" size={12} />
                <Link href="#">{item.title}</Link>
              </>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
