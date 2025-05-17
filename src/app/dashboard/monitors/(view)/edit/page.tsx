import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { FormStatusPageUpdate } from "@/components/forms/status-page/update";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus API</SectionTitle>
        </SectionHeader>
        <FormStatusPageUpdate />
      </Section>
    </SectionGroup>
  );
}
