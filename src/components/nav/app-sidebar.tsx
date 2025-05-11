"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Activity,
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
  navMain: [
    {
      title: "Monitors",
      url: "#",
      icon: Activity,
      isActive: true,
      items: [
        {
          title: "OpenStatus Marketing",
          url: "#",
        },
        {
          title: "OpenStatus API",
          url: "#",
        },
        {
          title: "OpenStatus Dashboard",
          url: "#",
        },
      ],
    },
  ],
  monitors: [
    {
      name: "OpenStatus Marketing",
      url: "#",
      tags: ["Production"],
    },
    {
      name: "OpenStatus API",
      url: "#",
      tags: ["Production"],
    },
    {
      name: "OpenStatus Dashboard",
      url: "#",
      tags: ["Production"],
    },
    {
      name: "Lightweight OS",
      url: "#",
      tags: ["Development"],
    },
    {
      name: "Astro Status Page",
      url: "#",
      tags: ["Development"],
    },
    {
      name: "Vercel Edge Ping",
      url: "#",
      tags: ["Staging"],
    },
  ],
  statusPages: [
    {
      name: "OpenStatus Status",
      url: "#",
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
