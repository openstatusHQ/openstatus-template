import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { FormStatusPageUpdate } from "@/components/form/status-pages/update";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus Status</SectionTitle>
        </SectionHeader>
        <FormStatusPageUpdate />
      </Section>
    </SectionGroup>
  );
}
