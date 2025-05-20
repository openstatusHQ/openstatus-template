"use client";

import { ChartBarUptime } from "@/components/chart/chart-bar-uptime";
import { ChartAreaLatency } from "@/components/chart/chart-area-latency";
import { MetricExample } from "@/components/metric/example";
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
import { auditLogs } from "@/data/audit-logs";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "@/components/data-table/audit-logs/columns";
import { BlockWrapper } from "@/components/content/block-wrapper";
import { DataTablePaginationSimple } from "@/components/ui/data-table/data-table-pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DatePicker from "@/components/date-picker";

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
          <SectionTitle>Timeline</SectionTitle>
          <SectionDescription>
            What&apos;s happening on your monitor
          </SectionDescription>
        </SectionHeader>
        <BlockWrapper>
          <DataTable
            columns={columns}
            data={auditLogs}
            paginationComponent={DataTablePaginationSimple}
          />
        </BlockWrapper>
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
