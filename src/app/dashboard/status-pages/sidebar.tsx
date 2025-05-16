import { Link } from "@/components/common/link";
import { SidebarRight } from "@/components/nav/sidebar-right";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { maintenances } from "@/data/maintenances";
import { statusReports } from "@/data/status-reports";

const report = statusReports[0];
const maintenance = maintenances[0];

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
              value: <Link href="#">openstatus</Link>,
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
          label: "Last Report",
          items: [
            { label: "Name", value: report.name },
            {
              label: "Started",
              value: <SidebarTooltipDate date={report.startedAt} />,
              isNested: true,
            },
            {
              label: "Status",
              value: <span className="text-green-500">{report.status}</span>,
              isNested: true,
            },
          ],
        },
        {
          label: "Last Maintenance",
          items: [
            { label: "Name", value: maintenance.title },
            {
              label: "Started",
              value: <SidebarTooltipDate date={maintenance.startDate} />,
              isNested: true,
            },
            {
              label: "Duration",
              value: maintenance.duration,
              isNested: true,
            },
          ],
        },
      ]}
    />
  );
}

function SidebarTooltipDate({ date }: { date: Date }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="underline decoration-dashed underline-offset-2 decoration-muted-foreground/50">
            {date.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </TooltipTrigger>
        <TooltipContent align="center" side="left">
          {date.toLocaleString("en-US")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
