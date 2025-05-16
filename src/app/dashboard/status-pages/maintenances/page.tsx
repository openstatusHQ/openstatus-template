import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/content/section";
import { DataTable } from "@/components/ui/data-table/data-table";
import { maintenances } from "@/data/maintenances";
import { columns } from "./columns";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus Status</SectionTitle>
          <SectionDescription>
            See our maintenances and scheduled downtimes.
          </SectionDescription>
        </SectionHeader>
        <DataTable columns={columns} data={maintenances} />
      </Section>
    </SectionGroup>
  );
}
