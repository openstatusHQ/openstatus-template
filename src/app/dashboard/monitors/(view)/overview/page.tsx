"use client";

import { ChartBarUptime } from "@/components/chart/chart-bar-uptime";
import { ChartAreaLatency } from "@/components/chart/chart-area-latency";
import { MetricExample } from "@/components/metric/example";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
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
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandSeparator,
} from "@/components/ui/command";
import { groupedRegions, Region, regions } from "@/data/regions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { regionMetrics } from "@/data/region-metrics";
import { columns as regionColumns } from "@/components/data-table/response-logs/regions/columns";

export default function Page() {
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(
    regions.map((r) => r.code)
  );

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {selectedRegions.length === regions.length
                  ? "All Regions"
                  : `${selectedRegions.length} Regions`}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[200px] p-0">
              <CommandRegion
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions}
              />
            </PopoverContent>
          </Popover>
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
        <DataTable data={regionMetrics} columns={regionColumns} />
      </Section>
    </SectionGroup>
  );
}

function CommandRegion({
  selectedRegions,
  setSelectedRegions,
}: {
  selectedRegions: Region[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search region..." />
      <CommandList>
        <CommandGroup forceMount>
          <CommandItem
            onSelect={() => {
              const items = document.querySelectorAll(
                '[data-slot="command-item"][data-disabled="false"]'
              );
              const codes: Region[] = [];

              items.forEach((item) => {
                const code = item.getAttribute("data-value");
                if (code && code !== "select-all") {
                  codes.push(code as Region);
                }
              });

              if (codes.length === selectedRegions.length) {
                setSelectedRegions([]);
              } else {
                setSelectedRegions(codes);
              }
            }}
            value="select-all"
          >
            Toggle selection
          </CommandItem>
        </CommandGroup>
        <CommandSeparator alwaysRender />
        {Object.entries(groupedRegions).map(([continent, regionCodes]) => (
          <CommandGroup key={continent} heading={continent}>
            {regions
              .filter((region) => regionCodes.includes(region.code))
              .map((region) => (
                <CommandItem
                  key={region.code}
                  value={region.code}
                  keywords={[
                    region.code,
                    region.location,
                    region.continent,
                    region.flag,
                  ]}
                  onSelect={() => {
                    setSelectedRegions((prev) =>
                      prev.includes(region.code)
                        ? prev.filter((r) => r !== region.code)
                        : [...prev, region.code]
                    );
                  }}
                >
                  <span className="mr-1">{region.flag}</span>
                  {region.code}
                  <span className="ml-1 text-muted-foreground text-xs truncate">
                    {region.location}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedRegions.includes(region.code)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
        <CommandEmpty>No region found.</CommandEmpty>
      </CommandList>
    </Command>
  );
}
