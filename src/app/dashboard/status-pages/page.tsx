import {
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";

export default function Page() {
  return (
    <SectionGroup>
      <SectionHeader>
        <SectionTitle>Status Pages</SectionTitle>
        <SectionDescription>
          Create and manage your status pages.
        </SectionDescription>
        {/* add data-table here */}
      </SectionHeader>
    </SectionGroup>
  );
}
