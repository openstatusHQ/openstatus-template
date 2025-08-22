"use client";

import {
  Status,
  StatusContent,
  StatusDescription,
  StatusHeader,
  StatusTitle,
} from "@/components/status-page/status";
import { useStatusPage } from "@/components/status-page/floating-button";

export default function Page() {
  const { variant } = useStatusPage();
  return (
    <Status variant={variant}>
      <StatusHeader>
        <StatusTitle>OpenStatus API</StatusTitle>
        <StatusDescription>API for OpenStatus</StatusDescription>
      </StatusHeader>
      {/* TODO: create components */}
      <StatusContent className="flex flex-col gap-6"></StatusContent>
    </Status>
  );
}
