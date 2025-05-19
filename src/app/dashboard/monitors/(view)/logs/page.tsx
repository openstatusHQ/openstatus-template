// import {
//   EmptyStateContainer,
//   EmptyStateTitle,
// } from "@/components/content/empty-state";
import {
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";

import { Section } from "@/components/content/section";
import { columns } from "@/components/data-table/response-logs/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { responseLogs } from "@/data/response-logs";
import { X } from "lucide-react";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus API</SectionTitle>
          <SectionDescription>https://api.openstatus.dev</SectionDescription>
        </SectionHeader>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Last 30d
          </Button>
          <Button variant="ghost" size="sm">
            <X />
            Reset
          </Button>
        </div>
      </Section>
      <Section>
        {/* <EmptyStateContainer>
          <EmptyStateTitle>Coming Soon</EmptyStateTitle>
        </EmptyStateContainer> */}
        <DataTable
          columns={columns}
          data={Array.from({ length: 100 }).map(() => responseLogs[0])}
        />
      </Section>
    </SectionGroup>
  );
}
