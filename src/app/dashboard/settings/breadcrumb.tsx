"use client";

import { User } from "lucide-react";

import { CreditCard } from "lucide-react";

import { NavBreadcrumb } from "@/components/nav/nav-breadcrumb";
import { Cog } from "lucide-react";

export function Breadcrumb() {
  return (
    <NavBreadcrumb
      items={[
        { type: "page", label: "Settings" },
        {
          type: "select",
          items: [
            { value: "general", label: "General", icon: Cog },
            { value: "billing", label: "Billing", icon: CreditCard },
            { value: "account", label: "Account", icon: User },
          ],
        },
      ]}
    />
  );
}
