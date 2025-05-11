"use client";

import { NavBreadcrumb } from "@/components/nav/nav-breadcrumb";
import { Pencil } from "lucide-react";
import { Logs } from "lucide-react";
import { LayoutGrid } from "lucide-react";

// TODO: make it dynamic

export function Breadcrumb() {
  return (
    <NavBreadcrumb
      items={[
        {
          type: "link",
          label: "Status Pages",
          href: "/dashboard/status-pages",
        },
        { type: "page", label: "OpenStatus Status" },
        {
          type: "select",
          items: [
            { value: "overview", label: "Overview", icon: LayoutGrid },
            { value: "logs", label: "Logs", icon: Logs },
            { value: "edit", label: "Edit", icon: Pencil },
          ],
        },
      ]}
    />
  );
}
