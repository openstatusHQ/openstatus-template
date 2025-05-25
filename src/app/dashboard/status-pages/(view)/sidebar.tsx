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
import { ExternalLink } from "lucide-react";
import { statusPages } from "@/data/status-pages";
import { monitors } from "@/data/monitors";
import { TableCellLink } from "@/components/data-table/table-cell-link";
import { TableCellNumber } from "@/components/data-table/table-cell-number";
import { formatDistanceStrict } from "date-fns";
import { TableCellBoolean } from "@/components/data-table/table-cell-boolean";

// NOTE:
const BADGE_URL =
  "https://openstatus.dev/status-page/hello-world/badge?size=sm&theme=light";

const report = statusReports[0];
const maintenance = maintenances[0];
const statusPage = statusPages[0];
const monitor = monitors[0];

export function Sidebar() {
  const duration = formatDistanceStrict(
    maintenance.startDate,
    maintenance.endDate
  );
  const [amount, unit] = duration.split(" ");

  return (
    <SidebarRight
      header="Status Page"
      metadata={[
        {
          label: "Overview",
          items: [
            {
              label: "Slug",
              value: <Link href="#">{statusPage.slug}</Link>,
            },
            { label: "Domain", value: statusPage.domain },
            {
              label: "Favicon",
              value: (
                <div className="rounded border bg-muted size-4 overflow-hidden">
                  <img src={statusPage.favicon} alt="favicon" />
                </div>
              ),
            },
            {
              label: "Badge",
              value: (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="align-middle">
                      <img className="h-5" src={BADGE_URL} />
                    </TooltipTrigger>
                    <TooltipContent>Learn more about the badge.</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ),
            },
          ],
        },
        {
          label: "Configuration",
          items: [
            {
              label: "Protected",
              value: <TableCellBoolean value={statusPage.protected} />,
            },
            {
              label: "Show values",
              value: <TableCellBoolean value={statusPage.showValues} />,
            },
          ],
        },
        {
          label: "Monitors",
          items: [
            {
              label: "Name",
              value: (
                <TableCellLink
                  href="/dashboard/monitors/overview"
                  value={monitor.name}
                />
              ),
            },
            {
              label: "URL",
              value: monitor.url,
              isNested: true,
            },
          ],
        },
        {
          label: "Last Report",
          items: [
            {
              label: "Name",
              value: (
                <TableCellLink
                  href="/dashboard/status-pages/reports"
                  value={report.name}
                />
              ),
            },
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
            {
              label: "Name",
              value: (
                <TableCellLink
                  href="/dashboard/status-pages/maintenances"
                  value={maintenance.title}
                />
              ),
            },
            {
              label: "Started",
              value: <SidebarTooltipDate date={maintenance.startDate} />,
              isNested: true,
            },
            {
              label: "Duration",
              value: <TableCellNumber value={amount} unit={unit} />,
              isNested: true,
            },
          ],
        },
      ]}
      footerButton={{
        children: (
          <>
            <ExternalLink />
            <span>Visit Status Page</span>
          </>
        ),
      }}
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
