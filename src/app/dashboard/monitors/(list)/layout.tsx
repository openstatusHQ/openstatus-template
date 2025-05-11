import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
} from "@/components/nav/app-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb } from "./breadcrumb";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader>
        <AppHeaderContent>
          <SidebarTrigger />
          <Breadcrumb />
        </AppHeaderContent>
        <AppHeaderActions>
          <Button size="sm">Create Monitor</Button>
        </AppHeaderActions>
      </AppHeader>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
