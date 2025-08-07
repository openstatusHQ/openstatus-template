import { AppSidebar } from "@/components/nav/app-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
      <FloatingButton />
    </SidebarProvider>
  );
}

function FloatingButton() {
  return (
    <div className="fixed bottom-2 right-2 z-50">
      <Button size="sm" asChild>
        <a
          href="https://github.com/openstatusHQ/openstatus-template"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repo
        </a>
      </Button>
    </div>
  );
}
