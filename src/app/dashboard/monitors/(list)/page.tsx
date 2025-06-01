"use client";

import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
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
import { CheckCircle, ListFilter } from "lucide-react";
import Link from "next/link";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>Monitors</SectionTitle>
          <SectionDescription>
            Create and manage your monitors.
          </SectionDescription>
        </SectionHeader>
        <MetricCardGroup>
          {metrics.map((metric) => {
            const isActive =
              columnFilters.find((filter) => filter.id === "status")?.value ===
              metric.title;
            return (
              <Link
                key={metric.title}
                href={`?status=${metric.title}`}
                onClick={() => {
                  if (columnFilters.length === 0 || !isActive) {
                    setColumnFilters([{ id: "status", value: metric.title }]);
                  } else {
                    setColumnFilters([]);
                  }
                }}
              >
                <MetricCard variant={metric.variant}>
                  <MetricCardHeader className="flex justify-between items-center gap-2">
                    <MetricCardTitle className="truncate">
                      {metric.title}
                    </MetricCardTitle>
                    {isActive ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      <ListFilter className="size-4" />
                    )}
                  </MetricCardHeader>
                  <MetricCardValue>{metric.value}</MetricCardValue>
                </MetricCard>
              </Link>
            );
          })}
        </MetricCardGroup>
      </Section>
      <Section>
        <DataTable
          columns={columns}
          data={monitors}
          actionBar={MonitorDataTableActionBar}
          toolbarComponent={MonitorDataTableToolbar}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </Section>
    </SectionGroup>
  );
}
