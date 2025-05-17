import {
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionHeaderRow,
  SectionTitle,
} from "@/components/content/section";

import { Section } from "@/components/content/section";
import {
  MetricCard,
  MetricCardGroup,
  MetricCardTitle,
  MetricCardValue,
} from "@/components/metric/metric-card";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>Overview</SectionTitle>
          <SectionDescription>
            Welcome to your OpenStatus dashboard.
          </SectionDescription>
        </SectionHeader>
        <MetricCardGroup>
          <MetricCard>
            <MetricCardTitle>Total Monitors</MetricCardTitle>
            <MetricCardValue>10</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Total Status Pages</MetricCardTitle>
            <MetricCardValue>0</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Total Incidents</MetricCardTitle>
            <MetricCardValue>0</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Total Uptime</MetricCardTitle>
            <MetricCardValue>100%</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Total Downtime</MetricCardTitle>
            <MetricCardValue>0s</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Slowest Endpoint</MetricCardTitle>
            <MetricCardValue>1,567ms</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Last Report</MetricCardTitle>
            <MetricCardValue>35 days ago</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Last Maintenance</MetricCardTitle>
            <MetricCardValue>None</MetricCardValue>
          </MetricCard>
        </MetricCardGroup>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Incidents</SectionTitle>
          <SectionDescription>
            Incidents over the last 30 days.
          </SectionDescription>
        </SectionHeader>
        <EmptyStateContainer>
          <EmptyStateTitle>No incidents found</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
      <Section>
        <SectionHeaderRow>
          <SectionHeader>
            <SectionTitle>Reports</SectionTitle>
            <SectionDescription>
              Reports over the last 30 days.
            </SectionDescription>
          </SectionHeader>
          <Button data-section="action" size="sm" variant="ghost">
            <Plus />
            Create
          </Button>
        </SectionHeaderRow>
        <EmptyStateContainer>
          <EmptyStateTitle>No reports found</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
      <Section>
        <SectionHeaderRow>
          <SectionHeader>
            <SectionTitle>Maintenance</SectionTitle>
            <SectionDescription>
              Maintenance over the last 30 days.
            </SectionDescription>
          </SectionHeader>
          <Button data-section="action" size="sm" variant="ghost">
            <Plus />
            Create
          </Button>
        </SectionHeaderRow>
        <EmptyStateContainer>
          <EmptyStateTitle>No maintenances found</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
    </SectionGroup>
  );
}
