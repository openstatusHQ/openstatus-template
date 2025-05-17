import { AppHeader, AppHeaderContent } from "@/components/nav/app-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavBreadcrumb } from "@/components/nav/nav-breadcrumb";
import { Cog, CreditCard, User } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader>
        <AppHeaderContent>
          <SidebarTrigger />
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
        </AppHeaderContent>
      </AppHeader>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
