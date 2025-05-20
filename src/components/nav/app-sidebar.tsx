"use client";

import * as React from "react";
import { LayoutGrid, Cog, Bell, PanelTop, Activity } from "lucide-react";

import { NavMonitors } from "@/components/nav/nav-monitors";
import { NavUser } from "@/components/nav/nav-user";
import { OrganizationSwitcher } from "@/components/nav/organization-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavStatusPages } from "@/components/nav/nav-status-pages";
import { NavOverview } from "@/components/nav/nav-overview";
import { NavChecklist } from "./nav-checklist";
// This is sample data.
const data = {
  user: {
    name: "mxkaske",
    email: "max@openstatus.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  orgs: [
    {
      name: "OpenStatus",
      slug: "easy-peasy",
      plan: "Hobby",
    },
    {
      name: "Acme Corp.",
      slug: "acme-corp",
      plan: "Starter",
    },
  ],
  monitors: [
    {
      name: "OpenStatus Marketing",
      url: "/dashboard/monitors/overview",
      tags: ["Production"],
    },
    {
      name: "OpenStatus API",
      url: "/dashboard/monitors/overview",
      tags: ["Production"],
    },
    {
      name: "OpenStatus Dashboard",
      url: "/dashboard/monitors/overview",
      tags: ["Production"],
    },
    {
      name: "Lightweight OS",
      url: "/dashboard/monitors/overview",
      tags: ["Development"],
    },
    {
      name: "Astro Status Page",
      url: "/dashboard/monitors/overview",
      tags: ["Development"],
    },
    {
      name: "Vercel Edge Ping",
      url: "/dashboard/monitors/overview",
      tags: ["Staging"],
    },
  ],
  statusPages: [
    {
      name: "OpenStatus Status",
      url: "/dashboard/status-pages/status-reports",
    },
  ],
  overview: [
    {
      name: "Overview",
      url: "/dashboard/overview",
      icon: LayoutGrid,
    },
    {
      name: "Notifiers",
      url: "/dashboard/notifiers",
      icon: Bell,
    },
    {
      name: "Settings",
      url: "/dashboard/settings/general",
      icon: Cog,
    },
    {
      name: "Status Pages",
      url: "/dashboard/status-pages",
      icon: PanelTop,
      hideOnExpanded: true,
    },
    {
      name: "Monitors",
      url: "/dashboard/monitors",
      icon: Activity,
      hideOnExpanded: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher orgs={data.orgs} />
      </SidebarHeader>
      <SidebarContent>
        <NavOverview items={data.overview} />
        <NavStatusPages statusPages={data.statusPages} />
        <NavMonitors monitors={data.monitors} />
        <div className="mt-auto p-2">
          <NavChecklist />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
