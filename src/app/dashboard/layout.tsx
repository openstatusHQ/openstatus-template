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
    <div className="fixed bottom-4 right-4 z-50">
      <Button asChild className="group" size="sm">
        <a
          href="https://github.com/openstatusHQ/data-table-filters"
          target="_blank"
          rel="noreferrer"
        >
          <span className="mr-1">GitHub</span>
          <ArrowRight className="relative mb-[1px] inline h-4 w-0 transition-all group-hover:w-4" />
          <ChevronRight className="relative mb-[1px] inline h-4 w-4 transition-all group-hover:w-0" />
        </a>
      </Button>
    </div>
  );
}
