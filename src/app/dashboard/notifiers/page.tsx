import { Link } from "@/components/common/link";
import {
  ActionCard,
  ActionCardDescription,
  ActionCardHeader,
  ActionCardTitle,
} from "@/components/content/action-card";
import { ActionCardGroup } from "@/components/content/action-card";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { FormCard, FormCardContent } from "@/components/forms/form-card";
import { FormSlack } from "@/components/forms/notifier/form-slack";
import { FormDiscord } from "@/components/forms/notifier/form-discord";
import { Button } from "@/components/ui/button";
import { FormSms } from "@/components/forms/notifier/form-sms";
import { FormEmail } from "@/components/forms/notifier/form-email";
import { FormWebhook } from "@/components/forms/notifier/form-webhook";
import {
  FormSheetContent,
  FormSheetDescription,
  FormSheetFooter,
  FormSheetHeader,
  FormSheetTitle,
  FormSheetTrigger,
} from "@/components/forms/form-sheet";
import { FormSheet } from "@/components/forms/form-sheet";
import { SlackIcon } from "@/components/icons/slack";
import { DiscordIcon } from "@/components/icons/discord";
import { PagerDutyIcon } from "@/components/icons/pagerduty";
import { OpsGenieIcon } from "@/components/icons/opsgenie";
import { Mail, Webhook, MessageCircle } from "lucide-react";

const config = {
  slack: {
    icon: SlackIcon,
    label: "Slack",
    form: FormSlack,
  },
  discord: {
    icon: DiscordIcon,
    label: "Discord",
    form: FormDiscord,
  },
  email: {
    icon: Mail,
    label: "Email",
    form: FormEmail,
  },
  sms: {
    icon: MessageCircle,
    label: "SMS",
    form: FormSms,
  },
  webhook: {
    icon: Webhook,
    label: "Webhook",
    form: FormWebhook,
  },
  opsgenie: {
    icon: OpsGenieIcon,
    label: "OpsGenie",
    form: undefined,
  },
  pagerduty: {
    icon: PagerDutyIcon,
    label: "PagerDuty",
    form: undefined,
  },
};

export default function Page() {
  return (
    <SectionGroup>
      <SectionHeader>
        <SectionTitle>Notifiers</SectionTitle>
      </SectionHeader>
      <Section>
        <EmptyStateContainer>
          <EmptyStateTitle>No notifier found</EmptyStateTitle>
        </EmptyStateContainer>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Create a new notifier</SectionTitle>
          <SectionDescription>
            Define your notifiers to receive notifications when incidents.{" "}
            <Link href="#">Learn more</Link>.
          </SectionDescription>
        </SectionHeader>
        <ActionCardGroup className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "slack",
              "email",
              "sms",
              "discord",
              // "Telegram",
              "webhook",
              "opsgenie",
              "pagerduty",
            ] as const
          ).map((notifier) => {
            const Icon = config[notifier].icon;
            const Form = config[notifier].form;
            return (
              <FormSheet key={notifier}>
                <FormSheetTrigger asChild>
                  <ActionCard className="cursor-pointer h-full w-full">
                    <ActionCardHeader>
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-md bg-muted border border-border flex items-center justify-center">
                          <Icon className="size-3" />
                        </div>
                        <ActionCardTitle>
                          {config[notifier].label}
                        </ActionCardTitle>
                      </div>
                      <ActionCardDescription>
                        Send notifications to {config[notifier].label}
                      </ActionCardDescription>
                    </ActionCardHeader>
                  </ActionCard>
                </FormSheetTrigger>
                <FormSheetContent>
                  <FormSheetHeader>
                    <FormSheetTitle>Notifier</FormSheetTitle>
                    <FormSheetDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </FormSheetDescription>
                  </FormSheetHeader>
                  <FormCard className="border-none overflow-auto">
                    <FormCardContent className="my-4">
                      {Form ? <Form id="notifier-form" /> : null}
                    </FormCardContent>
                  </FormCard>
                  <FormSheetFooter>
                    <Button type="submit" form="notifier-form">
                      Save changes
                    </Button>
                  </FormSheetFooter>
                </FormSheetContent>
              </FormSheet>
            );
          })}
          <ActionCard className="border-dashed">
            <ActionCardHeader>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-md bg-muted border border-border flex items-center justify-center" />
                <ActionCardTitle className="text-muted-foreground">
                  Your Notifier
                </ActionCardTitle>
              </div>
              <ActionCardDescription>
                Missing a channel?{" "}
                <Link href="mailto:ping@openstatus.dev">Contact us</Link>
              </ActionCardDescription>
            </ActionCardHeader>
          </ActionCard>
        </ActionCardGroup>
      </Section>
    </SectionGroup>
  );
}
