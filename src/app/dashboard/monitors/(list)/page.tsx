"use client";

import {
  Section,
  SectionGroup,
  SectionTitle,
} from "@/components/content/section";
import {
  MetricCard,
  MetricCardFooter,
  MetricCardGroup,
  MetricCardTitle,
  MetricCardValue,
} from "@/components/metric/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableCaption,
} from "@/components/ui/table";
import { monitors } from "@/data/monitors";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <SectionGroup>
      <Section>
        <SectionTitle>Monitors</SectionTitle>
        <MetricCardGroup>
          <MetricCard>
            <MetricCardTitle>Total Number</MetricCardTitle>
            <MetricCardValue>{monitors.length}</MetricCardValue>
            <MetricCardFooter>active monitors</MetricCardFooter>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Active Incidents</MetricCardTitle>
            <MetricCardValue>0</MetricCardValue>
            <MetricCardFooter>attention required</MetricCardFooter>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Uptime</MetricCardTitle>
            <MetricCardValue>100%</MetricCardValue>
            <MetricCardFooter>accross all regions</MetricCardFooter>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>Slowest Endpoint</MetricCardTitle>
            <MetricCardValue>530ms</MetricCardValue>
            <MetricCardFooter>OpenStatus API is slow</MetricCardFooter>
          </MetricCard>
        </MetricCardGroup>
      </Section>
      <Section>
        <div className="flex gap-2 items-center justify-between">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Columns
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your monitors.</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Last Incident</TableHead>
              <TableHead className="w-12">P50</TableHead>
              <TableHead className="w-12">P90</TableHead>
              <TableHead className="w-12">P99</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monitors.map((monitor, i) => (
              <TableRow
                key={monitor.name}
                onClick={() => router.push("/dashboard/monitors/overview")}
              >
                <TableCell>{monitor.name}</TableCell>
                <TableCell>
                  <span className="text-green-500">{monitor.status}</span>
                </TableCell>
                <TableCell>
                  {monitor.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="py-0">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {i === 4 ? "15 days ago" : "-"}
                </TableCell>
                <TableCell className="text-muted-foreground font-mono">
                  130ms
                </TableCell>
                <TableCell className="text-muted-foreground font-mono">
                  169ms
                </TableCell>
                <TableCell className="text-muted-foreground font-mono">
                  530ms
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </SectionGroup>
  );
}
