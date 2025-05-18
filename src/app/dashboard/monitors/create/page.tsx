import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { FormMonitorCreate } from "@/components/forms/monitor/create";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>Create Monitor</SectionTitle>
        </SectionHeader>
        <FormMonitorCreate />
      </Section>
    </SectionGroup>
  );
}
