import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-row">
      <div className="flex-1 w-full">{children}</div>
      <SidebarProvider className="flex-0">
        <Sidebar />
      </SidebarProvider>
    </div>
  );
}
