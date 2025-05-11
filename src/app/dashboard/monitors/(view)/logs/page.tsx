import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { SectionGroup, SectionTitle } from "@/components/content/section";

import { Section } from "@/components/content/section";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionTitle>Logs</SectionTitle>
      </Section>
      <Section>
        <EmptyStateContainer>
          <EmptyStateTitle>Coming Soon</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
    </SectionGroup>
  );
}
