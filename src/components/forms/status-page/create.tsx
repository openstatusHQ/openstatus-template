"use client";

import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardGroup,
  FormCardHeader,
  FormCardSeparator,
  FormCardTitle,
} from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import {
  EmptyStateContainer,
  EmptyStateText,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { FormGeneral } from "./form-general";

export function FormStatusPageCreate() {
  return (
    <FormCardGroup>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>General</FormCardTitle>
          <FormCardDescription>
            Configure the essential details for your status page.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardSeparator />
        <FormCardContent>
          <FormGeneral />
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Advanced Settings</FormCardTitle>
          <FormCardDescription>
            Configure additional features to enhance your status page.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardSeparator />
        <FormCardContent className="pb-4">
          <EmptyStateContainer>
            <EmptyStateTitle>Create and start customizing</EmptyStateTitle>
            <EmptyStateText>
              Connect your <span className="text-foreground">monitors</span>,
              set up a <span className="text-foreground">custom domain</span>,{" "}
              <span className="text-foreground">password protect</span> it and
              more...
            </EmptyStateText>
          </EmptyStateContainer>
        </FormCardContent>
      </FormCard>
    </FormCardGroup>
  );
}
