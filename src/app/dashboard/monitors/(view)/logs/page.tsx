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
import { columns } from "@/components/data-table/response-logs/columns";
import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { responseLogs } from "@/data/response-logs";
import { Lock, X } from "lucide-react";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>OpenStatus API</SectionTitle>
          <SectionDescription>https://api.openstatus.dev</SectionDescription>
        </SectionHeader>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Last 7 days
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DatePicker />
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="sm">
            <X />
            Reset
          </Button>
        </div>
      </Section>
      <Section>
        <BillingOverlayContainer>
          <DataTable
            columns={columns}
            data={Array.from({ length: 100 }).map(() => responseLogs[0])}
          />
          <BillingOverlay>
            <BillingOverlayButton>
              <Lock />
              Upgrade to Pro
            </BillingOverlayButton>
            <BillingOverlayDescription>
              Access response headers, timing phases and more for each request.{" "}
              <Link href="#">Learn more</Link>.
            </BillingOverlayDescription>
          </BillingOverlay>
        </BillingOverlayContainer>
      </Section>
    </SectionGroup>
  );
}
