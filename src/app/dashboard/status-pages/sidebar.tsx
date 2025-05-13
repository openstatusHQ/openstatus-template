import { Link } from "@/components/common/link";
import { SidebarRight } from "@/components/nav/sidebar-right";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  return (
    <SidebarRight
      header="Status Page"
      metadata={[
        {
          label: "Overview",
          items: [
            {
              label: "Slug",
              value: "openstatus",
            },
            { label: "Domain", value: "status.openstatus.dev" },
            {
              label: "favicon",
              value: <div className="rounded border bg-muted size-4" />,
            },
          ],
        },
        {
          label: "Configuration",
          items: [
            { label: "Protected", value: "true" },
            { label: "Show values", value: "true" },
          ],
        },
        {
          label: "Montitors",
          items: [
            { label: "Name", value: "OpenStatus API" },
            {
              label: "URL",
              value: "https://api.openstatus.dev",
              isNested: true,
            },
          ],
        },
        {
          label: "Latest Reports",
          items: [
            { label: "Name", value: <Link href="#">Downtime API</Link> },
            {
              label: "Status",
              value: <span className="text-green-500">Operational</span>,
              isNested: true,
            },
            {
              label: "Started",
              value: (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="underline decoration-dashed underline-offset-2 decoration-muted-foreground/50">
                        {new Date().toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="left">
                      {new Date().toLocaleString("en-US")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ),
              isNested: true,
            },
          ],
        },
        {
          label: "Latest Maintenances",
        },
      ]}
    />
  );
}
