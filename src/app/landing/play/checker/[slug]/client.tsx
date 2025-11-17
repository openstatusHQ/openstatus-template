"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { regions } from "@/data/regions";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const STATUS_CODES = {
  "1": "text-muted-foreground",
  "2": "text-success",
  "3": "text-info",
  "4": "text-warning",
  "5": "text-destructive",
};

const r = regions.map((region) => {
  const latency = Math.random() * 1000;
  const status = Math.random() < 0.9 ? 200 : 500;
  return { region: region.code, latency, status };
});

export function Table() {
  const [input, setInput] = useState("");
  const [sort, setSort] = useState<{
    value: "latency" | "status" | "region";
    desc: boolean;
  }>({ value: "latency", desc: false });
  return (
    <div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by region, flag, location code, or continent"
        className="p-4 h-auto! rounded-none text-base md:text-base"
      />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Status</th>
              <th>DNS</th>
              <th>Connect</th>
              <th>TLS</th>
              <th>TTFB</th>
              <th className="text-right! p-0!">
                <TableSort
                  onClick={() =>
                    setSort({ value: "latency", desc: !sort.desc })
                  }
                  direction={
                    sort.value === "latency"
                      ? sort.desc
                        ? "desc"
                        : "asc"
                      : undefined
                  }
                >
                  Latency
                </TableSort>
              </th>
            </tr>
          </thead>
          <tbody>
            {r
              .filter(({ region }) => {
                const regionConfig = regions.find((r) => r.code === region);
                return [
                  regionConfig?.code,
                  regionConfig?.location,
                  regionConfig?.flag,
                  regionConfig?.continent,
                ].some((value) =>
                  value?.toLowerCase().includes(input.toLowerCase())
                );
              })
              .sort((a, b) => {
                if (sort.value === "status") {
                  return sort.desc ? b.status - a.status : a.status - b.status;
                }
                if (sort.value === "latency") {
                  return sort.desc
                    ? b.latency - a.latency
                    : a.latency - b.latency;
                }
                return sort.desc
                  ? b.region.localeCompare(a.region)
                  : a.region.localeCompare(b.region);
              })
              .map(({ region, latency, status }) => {
                const regionConfig = regions.find((r) => r.code === region);
                return (
                  <tr key={region}>
                    <td>
                      {regionConfig?.flag} {regionConfig?.code}{" "}
                      <span className="text-muted-foreground">
                        {regionConfig?.location}
                      </span>
                    </td>
                    <td
                      className={cn(
                        STATUS_CODES[
                          status.toString()[0] as keyof typeof STATUS_CODES
                        ]
                      )}
                    >
                      {status}
                    </td>
                    <td>
                      <br />
                    </td>
                    <td>
                      <br />
                    </td>
                    <td>
                      <br />
                    </td>
                    <td>
                      <br />
                    </td>
                    <td className="text-right!">
                      {Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 0,
                      }).format(latency)}
                      ms
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableSort({
  children,
  className,
  direction,
  ...props
}: React.ComponentProps<typeof Button> & { direction?: "asc" | "desc" }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full p-4 h-auto! rounded-none text-base md:text-base",
        className
      )}
      {...props}
    >
      {children}
      <span className="flex flex-col">
        <ChevronUp
          className={cn(
            "-mb-0.5 size-3",
            direction === "asc"
              ? "text-accent-foreground"
              : "text-muted-foreground"
          )}
        />
        <ChevronDown
          className={cn(
            "-mt-0.5 size-3",
            direction === "desc"
              ? "text-accent-foreground"
              : "text-muted-foreground"
          )}
        />
      </span>
    </Button>
  );
}
