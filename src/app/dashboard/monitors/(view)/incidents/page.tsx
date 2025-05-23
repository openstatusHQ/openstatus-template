"use client";

import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "@/components/data-table/incidents/columns";
import { incidents } from "@/data/incidents";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus API</SectionTitle>
          <SectionDescription>https://api.openstatus.dev</SectionDescription>
        </SectionHeader>
        <DataTable columns={columns} data={incidents} />
      </Section>
    </SectionGroup>
  );
}
