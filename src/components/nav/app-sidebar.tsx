"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutGrid,
  Workflow,
  Cog,
  Bell,
} from "lucide-react";

import { NavMonitors } from "@/components/nav/nav-monitors";
import { NavUser } from "@/components/nav/nav-user";
import { TeamSwitcher } from "@/components/nav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavStatusPages } from "@/components/nav/nav-status-pages";
import { NavOverview } from "@/components/nav/nav-overview";
// This is sample data.
const data = {
  user: {
    name: "mxkaske",
    email: "max@openstatus.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "OpenStatus",
      logo: GalleryVerticalEnd,
      plan: "Startup",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Enterprise",
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
      name: "Integrations",
      url: "#",
      icon: Workflow,
    },
    {
      name: "Notifiers",
      url: "/dashboard/notifiers",
      icon: Bell,
    },
    {
      name: "Settings",
      url: "#",
      icon: Cog,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavOverview items={data.overview} />
        <NavStatusPages statusPages={data.statusPages} />
        <NavMonitors monitors={data.monitors} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
