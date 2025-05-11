import * as React from "react";
import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarMetadata, SidebarMetadataProps } from "./sidebar-metadata";

type SidebarRightProps = React.ComponentProps<typeof Sidebar> & {
  header: string;
  metadata: SidebarMetadataProps[];
  // footerAction
};

export function SidebarRight({
  header,
  metadata,
  ...props
}: SidebarRightProps) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-14 h-[calc(100svh_-_56px)] border-l bg-background"
      style={
        {
          // "--sidebar-width": "300px",
        } as React.CSSProperties
      }
      {...props}
    >
      <SidebarHeader className="border-b border-sidebar-border">
        {header}
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-0">
        {metadata.map((item) => (
          <SidebarMetadata key={item.label} {...item} />
        ))}
      </SidebarContent>
      <SidebarSeparator className="mx-0" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>Trigger Check</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
