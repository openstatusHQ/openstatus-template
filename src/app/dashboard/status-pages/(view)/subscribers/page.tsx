import { Link } from "@/components/common/link";
import {
  BillingOverlay,
  BillingOverlayButton,
  BillingOverlayContainer,
  BillingOverlayDescription,
} from "@/components/content/billing-overlay";
import {
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";

import { Section } from "@/components/content/section";
import { columns } from "@/components/data-table/subscriber/columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { subscribers } from "@/data/subscribers";
import { Lock } from "lucide-react";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus Status</SectionTitle>
          <SectionDescription>https://api.openstatus.dev</SectionDescription>
        </SectionHeader>
      </Section>
      <Section>
        <BillingOverlayContainer>
          <DataTable
            columns={columns}
            data={[...subscribers, ...subscribers, ...subscribers]}
          />
          <BillingOverlay>
            <BillingOverlayButton>
              <Lock />
              Upgrade to Team
            </BillingOverlayButton>
            <BillingOverlayDescription>
              Allow your users to subscribe to status page updates.{" "}
              <Link href="#">Learn more</Link>.
            </BillingOverlayDescription>
          </BillingOverlay>
        </BillingOverlayContainer>
      </Section>
    </SectionGroup>
  );
}
