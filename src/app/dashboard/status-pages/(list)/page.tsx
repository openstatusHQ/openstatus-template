import {
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { statusPages } from "@/data/status-pages";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table/data-table";

export default function Page() {
  return (
    <SectionGroup>
      <SectionHeader>
        <SectionTitle>Status Pages</SectionTitle>
        <SectionDescription>
          Create and manage your status pages.
        </SectionDescription>
        <DataTable columns={columns} data={statusPages} />
      </SectionHeader>
    </SectionGroup>
  );
}
