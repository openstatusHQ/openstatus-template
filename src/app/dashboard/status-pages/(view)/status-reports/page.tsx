import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionHeaderRow,
} from "@/components/content/section";
import { DataTable } from "@/components/ui/data-table/data-table";
import { statusReports } from "@/data/status-reports";
import { DataTable as UpdatesDataTable } from "@/components/data-table/status-report-updates/data-table";
import { columns } from "@/components/data-table/status-reports/columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormSheetStatusReport } from "@/components/forms/status-report/sheet";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeaderRow>
          <SectionHeader>
            <SectionTitle>OpenStatus Status</SectionTitle>
            <SectionDescription>
              See our uptime history and status reports.
            </SectionDescription>
          </SectionHeader>
          <div>
            <FormSheetStatusReport>
              <Button data-section="action" size="sm" variant="ghost">
                <Plus />
                Create Status Report
              </Button>
            </FormSheetStatusReport>
          </div>
        </SectionHeaderRow>
        <DataTable
          columns={columns}
          data={statusReports}
          rowComponent={<UpdatesDataTable />}
        />
      </Section>
    </SectionGroup>
  );
}
