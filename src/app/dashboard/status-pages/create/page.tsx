import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { FormStatusPageCreate } from "@/components/forms/status-page/create";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>Create Status Page</SectionTitle>
        </SectionHeader>
        <FormStatusPageCreate />
      </Section>
    </SectionGroup>
  );
}
