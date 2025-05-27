import { Link } from "@/components/common/link";
import { SidebarRight } from "@/components/nav/sidebar-right";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import { statusPages } from "@/data/status-pages";
import { monitors } from "@/data/monitors";
import { TableCellLink } from "@/components/data-table/table-cell-link";
import { TableCellBoolean } from "@/components/data-table/table-cell-boolean";

// NOTE:
const BADGE_URL =
  "https://openstatus.dev/status-page/hello-world/badge?size=sm&theme=light";

const statusPage = statusPages[0];

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
          items: monitors
            // NOTE: only show the first 2 monitors
            .slice(0, 2)
            .map((monitor) => {
              const arr = [];
              const url = new URL(monitor.url);
              arr.push({
                label: "Name",
                value: (
                  <TableCellLink
                    href="/dashboard/monitors/overview"
                    value={monitor.name}
                  />
                ),
              });
              arr.push({
                label: "URL",
                value: `${url.hostname}${url.pathname}`,
                isNested: true,
              });
              return arr;
            })
            .flat(),
          // items: [
          //   {
          //     label: "Name",
          //     value: (
          //       <TableCellLink
          //         href="/dashboard/monitors/overview"
          //         value={monitor.name}
          //       />
          //     ),
          //   },
          //   {
          //     label: "URL",
          //     value: monitor.url,
          //     isNested: true,
          //   },
          // ],
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
