"use client";

import { Input } from "@/components/ui/input";
import { regions } from "@/data/regions";
import { cn } from "@/lib/utils";
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
  return (
    <div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by region, flag, location code, or continent"
        className="p-4 h-auto! rounded-none text-base md:text-base"
      />
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Status</th>
            <th>DNS</th>
            <th>Connect</th>
            <th>TLS</th>
            <th>TTFB</th>
            <th className="text-right!">Latency</th>
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
  );
}
