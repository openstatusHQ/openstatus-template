"use client";

import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardGroup,
  FormCardHeader,
  FormCardSeparator,
  FormCardTitle,
} from "@/components/forms/form-card";
import {
  EmptyStateContainer,
  EmptyStateText,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { FormGeneral } from "./form-general";

export function FormMonitorCreate() {
  return (
    <FormCardGroup>
      <FormGeneral />
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Advanced Settings</FormCardTitle>
          <FormCardDescription>
            Configure additional features to enhance your monitor.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardSeparator />
        <FormCardContent className="pb-4">
          <EmptyStateContainer>
            <EmptyStateTitle>Create and start customizing</EmptyStateTitle>
            <EmptyStateText>
              Change the <span className="text-foreground">periodicity</span>,
              set up the <span className="text-foreground">regions</span>,{" "}
              <span className="text-foreground">timeout</span> or{" "}
              <span className="text-foreground">degraded</span> duration and
              more...
            </EmptyStateText>
          </EmptyStateContainer>
        </FormCardContent>
      </FormCard>
    </FormCardGroup>
  );
}
