import {
  Section,
  SectionDescription,
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
          <SectionDescription>Customize your monitor.</SectionDescription>
        </SectionHeader>
        {/* TODO: */}
        <FormStatusPageUpdate />
      </Section>
    </SectionGroup>
  );
}
