import { ChartBarUptime } from "@/components/chart/chart-bar-uptime";
import { ChartAreaLatency } from "@/components/chart/chart-area-latency";
import { MetricExample } from "@/components/metric/example";
import { EmptyStateExample } from "@/components/content/example";
import { Button } from "@/components/ui/button";
import { ExampleRegionTable } from "@/components/example/example-region-container";
import { X } from "lucide-react";
import {
  Section,
  SectionDescription,
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
          <SectionDescription>https://api.openstatus.dev</SectionDescription>
        </SectionHeader>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Last 30d
          </Button>
          <Button variant="outline" size="sm">
            All Regions
          </Button>
          <Button variant="ghost" size="sm">
            <X />
            Reset
          </Button>
        </div>
        <MetricExample />
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Uptime</SectionTitle>
          <SectionDescription>
            Uptime accross all the regions
          </SectionDescription>
        </SectionHeader>
        <ChartBarUptime />
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Latency</SectionTitle>
          <SectionDescription>
            Average latency accross all the regions
          </SectionDescription>
        </SectionHeader>
        <ChartAreaLatency />
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Incidents</SectionTitle>
          <SectionDescription>
            Incidents over the last 30 days
          </SectionDescription>
        </SectionHeader>
        <EmptyStateExample />
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Regions</SectionTitle>
          <SectionDescription>
            Every region&apos;s latency over the last 24 hours
          </SectionDescription>
        </SectionHeader>
        <ExampleRegionTable />
      </Section>
    </SectionGroup>
  );
}
