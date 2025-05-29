"use client";

import {
  Section,
  SectionGroup,
  SectionTitle,
} from "@/components/content/section";
import {
  MetricCard,
  MetricCardGroup,
  MetricCardHeader,
  MetricCardTitle,
  MetricCardValue,
} from "@/components/metric/metric-card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { monitors } from "@/data/monitors";
import { columns } from "@/components/data-table/monitors/columns";
import { MonitorDataTableActionBar } from "@/components/data-table/monitors/data-table-action-bar";
import { MonitorDataTableToolbar } from "@/components/data-table/monitors/data-table-toolbar";
import Link from "next/link";
import { ListFilter } from "lucide-react";

// NOTE: connect with table filter and sorting
const metrics = [
  {
    title: "Normal",
    value: monitors.filter((monitor) => monitor.status === "Normal").length,
    variant: "success" as const,
    href: "#",
  },
  {
    title: "Degraded",
    value: monitors.filter((monitor) => monitor.status === "Degraded").length,
    variant: "warning" as const,
    href: "#",
  },
  {
    title: "Failing",
    value: monitors.filter((monitor) => monitor.status === "Failing").length,
    variant: "destructive" as const,
    href: "#",
  },
  {
    title: "Inactive",
    value: monitors.filter((monitor) => monitor.status === "Inactive").length,
    variant: "default" as const,
    href: "#",
  },
  {
    title: "Slowest Endpoint",
    value: "530ms",
    variant: "ghost" as const,
    href: "#",
  },
];

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionTitle>Monitors</SectionTitle>
        <MetricCardGroup>
          {metrics.map((metric) => (
            <Link key={metric.title} href={metric.href}>
              <MetricCard variant={metric.variant}>
                <MetricCardHeader className="flex justify-between items-center gap-2">
                  <MetricCardTitle className="truncate">
                    {metric.title}
                  </MetricCardTitle>
                  <ListFilter className="size-4" />
                </MetricCardHeader>
                <MetricCardValue>{metric.value}</MetricCardValue>
              </MetricCard>
            </Link>
          ))}
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
