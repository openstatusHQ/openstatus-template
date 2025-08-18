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

function StatusEventContent() {
  const { variant } = useStatusPage();
  return (
    <div className="grid gap-6">
      <Status variant={variant}>
        <StatusHeader>
          <StatusTitle>Craft</StatusTitle>
          <StatusDescription>
            Stay informed about the stability
          </StatusDescription>
        </StatusHeader>
        <StatusContent>{/*  */}</StatusContent>
      </Status>
      <FloatingButton />
    </div>
  );
}

export default function Page() {
  return (
    <StatusPageProvider>
      <StatusEventContent />
    </StatusPageProvider>
  );
}
