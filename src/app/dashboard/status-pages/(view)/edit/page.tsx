import { Example } from "@/components/form/example";
import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus Status</SectionTitle>
        </SectionHeader>
        <Example />
      </Section>
    </SectionGroup>
  );
}
