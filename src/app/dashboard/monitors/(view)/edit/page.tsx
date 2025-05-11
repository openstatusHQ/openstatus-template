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
          <SectionTitle>OpenStatus API</SectionTitle>
        </SectionHeader>
        <Example />
      </Section>
    </SectionGroup>
  );
}
