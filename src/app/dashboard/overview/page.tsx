import {
  SectionDescription,
  SectionGroup,
  SectionHeader,
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
        <SectionHeader>
          <SectionTitle>Reports</SectionTitle>
          <SectionDescription>
            Reports over the last 30 days.
          </SectionDescription>
        </SectionHeader>
        <EmptyStateContainer>
          <EmptyStateTitle>No reports found</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Maintenance</SectionTitle>
          <SectionDescription>
            Maintenance over the last 30 days.
          </SectionDescription>
        </SectionHeader>
        <EmptyStateContainer>
          <EmptyStateTitle>No maintenance found</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
    </SectionGroup>
  );
}
