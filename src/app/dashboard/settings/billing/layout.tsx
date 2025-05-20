import { AppHeader, AppHeaderContent } from "@/components/nav/app-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavBreadcrumb } from "@/components/nav/nav-breadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader>
        <AppHeaderContent>
          <SidebarTrigger />
          <NavBreadcrumb
            items={[
              { type: "link", label: "Settings", href: "/dashboard/settings" },
              { type: "page", label: "Billing" },
            ]}
          />
        </AppHeaderContent>
      </AppHeader>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
