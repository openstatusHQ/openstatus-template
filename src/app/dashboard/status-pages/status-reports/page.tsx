import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/content/section";
import { DataTable } from "@/components/ui/data-table/data-table";
import { statusReports } from "@/data/status-reports";
import { columns } from "./columns";

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
        <DataTable columns={columns} data={statusReports} />
      </Section>
    </SectionGroup>
  );
}
