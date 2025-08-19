"use client";

import {
  FloatingButton,
  StatusPageProvider,
} from "@/components/status-page/floating-button";
import {
  Status,
  StatusContent,
  StatusDescription,
  StatusHeader,
  StatusTitle,
} from "@/components/status-page/status";
import { useStatusPage } from "@/components/status-page/floating-button";
import { ChartLineRegion } from "@/components/chart/chart-line-region";
import { StatusMonitorTitle } from "@/components/status-page/status-monitor";
import { StatusMonitorDescription } from "@/components/status-page/status-monitor";
import { monitors } from "@/data/monitors";

function StatusMonitorContent() {
  const { variant } = useStatusPage();
  return (
    <div className="flex flex-col gap-6">
      <Status variant={variant}>
        <StatusHeader>
          <StatusTitle>Craft</StatusTitle>
          <StatusDescription>
            Stay informed about the stability
          </StatusDescription>
        </StatusHeader>
        {/* TODO: create components */}
        <StatusContent className="flex flex-col gap-6">
          {monitors
            .filter((monitor) => monitor.public)
            .map((monitor) => (
              <div
                key={monitor.id}
                className="group flex flex-col gap-2 hover:bg-muted/50 border border-transparent hover:border-border/50 rounded-lg px-3 -mx-3 py-2 -my-2"
              >
                <div className="">
                  <div className="flex flex-row items-center gap-2">
                    <StatusMonitorTitle>{monitor.name}</StatusMonitorTitle>
                    <StatusMonitorDescription>
                      {monitor.description}
                    </StatusMonitorDescription>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono truncate">
                    {monitor.url}
                  </div>
                </div>
                <ChartLineRegion className="h-[50px]" />
              </div>
            ))}
        </StatusContent>
      </Status>
      <FloatingButton />
    </div>
  );
}

export default function Page() {
  return (
    <StatusPageProvider>
      <StatusMonitorContent />
    </StatusPageProvider>
  );
}
