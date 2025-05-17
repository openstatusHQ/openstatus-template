import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
} from "@/components/nav/app-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb } from "./breadcrumb";
import { NavActions } from "@/components/nav/nav-actions";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader>
        <AppHeaderContent>
          <SidebarTrigger />
          <Breadcrumb />
        </AppHeaderContent>
        <AppHeaderActions>
          <NavActions />
        </AppHeaderActions>
      </AppHeader>
      <main className="flex-1">{children}</main>
    </div>
  );
}
