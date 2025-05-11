import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
} from "@/components/nav/app-header";
import { NavActions } from "@/components/nav/nav-actions";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./sidebar";
import { Breadcrumb } from "./breadcrumb";

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
      <main className="flex-1">
        <div className="flex flex-1 flex-row">
          <div className="flex-1 w-full">{children}</div>
          <SidebarProvider className="flex-0">
            <Sidebar />
          </SidebarProvider>
        </div>
      </main>
    </div>
  );
}
