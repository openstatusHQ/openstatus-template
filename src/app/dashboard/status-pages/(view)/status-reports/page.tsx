import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/content/section";
import { DataTable } from "@/components/ui/data-table/data-table";
import { statusReports } from "@/data/status-reports";
import { DataTable as UpdatesDataTable } from "@/components/data-table/status-report-updates/data-table";
import { columns } from "@/components/data-table/status-reports/columns";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus Status</SectionTitle>
          <SectionDescription>
            See our uptime history and status reports.
          </SectionDescription>
        </SectionHeader>
        <DataTable
          columns={columns}
          data={statusReports}
          rowComponent={<UpdatesDataTable />}
        />
      </Section>
    </SectionGroup>
  );
}
