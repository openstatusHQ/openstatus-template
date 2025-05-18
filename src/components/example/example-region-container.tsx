import { ChartLineRegion } from "../chart/chart-line-region";
import { Button } from "../ui/button";
import {
  MetricCard,
  MetricCardGroup,
  MetricCardValue,
  MetricCardTitle,
} from "@/components/metric/metric-card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, Filter, Zap } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ExampleRegionContainer() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <MetricCardGroup>
          <MetricCard>
            <MetricCardTitle>Region</MetricCardTitle>
            <MetricCardValue>Frankfurt</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>P50</MetricCardTitle>
            <MetricCardValue>130ms</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>P90</MetricCardTitle>
            <MetricCardValue>169ms</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>P99</MetricCardTitle>
            <MetricCardValue>530ms</MetricCardValue>
          </MetricCard>
        </MetricCardGroup>
        <ChartLineRegion />
      </div>
      <Separator />
      <div className="space-y-2">
        <MetricCardGroup>
          <MetricCard>
            <MetricCardTitle>Region</MetricCardTitle>
            <MetricCardValue>New York</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>P50</MetricCardTitle>
            <MetricCardValue>130ms</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>P90</MetricCardTitle>
            <MetricCardValue>169ms</MetricCardValue>
          </MetricCard>
          <MetricCard>
            <MetricCardTitle>P99</MetricCardTitle>
            <MetricCardValue>530ms</MetricCardValue>
          </MetricCard>
        </MetricCardGroup>
        <ChartLineRegion />
      </div>
    </div>
  );
}

export function ExampleRegionTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Location</TableHead>
          <TableHead>
            <span className="sr-only">Trend</span>
          </TableHead>
          <TableHead className="w-12">P50</TableHead>
          <TableHead className="w-12">P90</TableHead>
          <TableHead className="w-12">P99</TableHead>
          <TableHead className="w-12">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {["Frankfurt", "New York", "London", "Paris", "Tokyo"].map((region) => (
          <TableRow key={region}>
            <TableCell>{region}</TableCell>
            <TableCell>
              <ChartLineRegion className="h-[50px]" />
            </TableCell>
            <TableCell>130ms</TableCell>
            <TableCell>169ms</TableCell>
            <TableCell>530ms</TableCell>
            <TableCell className="text-right">
              <RowActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="size-8"
            aria-label="Edit item"
          >
            <Ellipsis size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Filter aria-hidden="true" />
            <span>Filter</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Zap aria-hidden="true" />
            <span>Trigger</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
