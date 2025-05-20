"use client";

import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardFooterInfo,
  FormCardGroup,
  FormCardHeader,
  FormCardSeparator,
  FormCardTitle,
  FormCardUpgrade,
} from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/common/link";
import { Form, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormAlertDialog } from "@/components/forms/form-alert-dialog";
import { Lock } from "lucide-react";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { FormGeneral } from "./form-general";
import { Input } from "@/components/ui/input";
import { FormResponseTime } from "./form-response-time";

export function FormMonitorUpdate() {
  const form = useForm();
  return (
    <FormCardGroup>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>General</FormCardTitle>
          <FormCardDescription>
            Define your request and assertions. Choose between HTTP or TCP.
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
          <FormCardTitle>Scheduling & Regions</FormCardTitle>
          <FormCardDescription>
            Configure the scheduling and regions for your monitor.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <EmptyStateContainer>
            <EmptyStateTitle>No scheduling or regions</EmptyStateTitle>
          </EmptyStateContainer>
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormResponseTime />
      <FormCard>
        <FormCardUpgrade />
        <FormCardHeader>
          <FormCardTitle>OpenTelemetry</FormCardTitle>
          <FormCardDescription>
            Configure your OpenTelemetry Exporter.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <Form {...form}>
            <form>
              <div className="grid gap-1.5">
                <Label>Endpoint</Label>
                <Input placeholder="https://otel.openstatus.dev/api/v1/metrics" />
              </div>
            </form>
          </Form>
        </FormCardContent>
        <FormCardFooter>
          <FormCardFooterInfo>
            Learn more about <Link href="#">OTel</Link>.
          </FormCardFooterInfo>
          <Button>
            <Lock />
            Upgrade
          </Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Status Pages</FormCardTitle>
          <FormCardDescription>
            Add status pages to your monitor.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <Form {...form}>
            <form>
              <div className="grid gap-1.5">
                <Label>Description</Label>
                <Input placeholder="My Status Page" />
                <FormDescription>
                  Provide your users with information about it.
                </FormDescription>
              </div>
            </form>
          </Form>
        </FormCardContent>
        <FormCardSeparator />
        <FormCardContent>
          <EmptyStateContainer>
            <EmptyStateTitle>No status pages</EmptyStateTitle>
          </EmptyStateContainer>
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Notifiers</FormCardTitle>
          <FormCardDescription>
            Get notified when your monitor is degraded or down.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <EmptyStateContainer>
            <EmptyStateTitle>No notifiers</EmptyStateTitle>
          </EmptyStateContainer>
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard variant="destructive">
        <FormCardHeader>
          <FormCardTitle>Danger Zone</FormCardTitle>
          <FormCardDescription>
            This action cannot be undone.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardFooter variant="destructive" className="justify-end">
          <FormAlertDialog
            title="OpenStatus API"
            confirmationValue="delete monitor"
          />
        </FormCardFooter>
      </FormCard>
    </FormCardGroup>
  );
}
