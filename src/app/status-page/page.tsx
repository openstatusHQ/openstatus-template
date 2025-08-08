"use client";

import {
  Status,
  StatusBanner,
  StatusContent,
  StatusDescription,
  StatusHeader,
  StatusTitle,
} from "@/components/status-page/status";
import { StatusMonitor } from "@/components/status-page/status-monitor";
import {
  StatusPageProvider,
  FloatingButton,
  useStatusPage,
} from "@/components/status-page/floating-button";
import { chartData } from "@/components/status-page/utils";
import { monitors } from "@/data/monitors";

function StatusPageContent() {
  const { variant, cardType, barType, showUptime } = useStatusPage();

  return (
    <div className="grid gap-6">
      <Status variant={variant}>
        <StatusHeader>
          <StatusTitle>Craft</StatusTitle>
          <StatusDescription>
            Stay informed about the stability
          </StatusDescription>
        </StatusHeader>
        <StatusBanner />
        <StatusContent>
          <StatusMonitor
            variant={variant}
            cardType={cardType}
            barType={barType}
            data={chartData}
            monitor={monitors[0]}
            showUptime={showUptime}
          />
          <StatusMonitor
            variant={variant}
            cardType={cardType}
            barType={barType}
            data={chartData}
            monitor={monitors[1]}
            showUptime={showUptime}
          />
        </StatusContent>
      </Status>
      <FloatingButton />
    </div>
  );
}

export default function Page() {
  return (
    <StatusPageProvider>
      <StatusPageContent />
    </StatusPageProvider>
  );
}
