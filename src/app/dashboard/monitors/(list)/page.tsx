"use client";

import {
  Section,
  SectionGroup,
  SectionTitle,
} from "@/components/content/section";
import {
  MetricCard,
  MetricCardGroup,
  MetricCardTitle,
  MetricCardValue,
} from "@/components/metric/metric-card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { monitors } from "@/data/monitors";
import { columns } from "@/components/data-table/monitors/columns";
import { MonitorDataTableActionBar } from "@/components/data-table/monitors/data-table-action-bar";
import { MonitorDataTableToolbar } from "@/components/data-table/monitors/data-table-toolbar";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionTitle>Monitors</SectionTitle>
        <MetricCardGroup>
          <MetricCard>
            <MetricCardTitle>Total Number</MetricCardTitle>
            <MetricCardValue>{monitors.length}</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Active Incidents</MetricCardTitle>
            <MetricCardValue>0</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Uptime</MetricCardTitle>
            <MetricCardValue>100%</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Slowest Endpoint</MetricCardTitle>
            <MetricCardValue>530ms</MetricCardValue>
          </MetricCard>
        </MetricCardGroup>
      </Section>
      <Section>
        <DataTable
          columns={columns}
          data={monitors}
          actionBar={MonitorDataTableActionBar}
          toolbarComponent={MonitorDataTableToolbar}
        />
      </Section>
    </SectionGroup>
  );
}
