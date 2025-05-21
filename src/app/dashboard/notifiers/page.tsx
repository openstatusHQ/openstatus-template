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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormSms } from "@/components/forms/notifier/form-sms";
import { FormEmail } from "@/components/forms/notifier/form-email";
import { FormWebhook } from "@/components/forms/notifier/form-webhook";

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
          {[
            "Slack",
            "Email",
            "SMS",
            "Discord",
            // "Telegram",
            "Webhook",
            "OpsGenie",
            "PagerDuty",
          ].map((notifier) => (
            <Sheet key={notifier}>
              <SheetTrigger asChild>
                <ActionCard>
                  <ActionCardHeader>
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-md bg-muted border border-border" />
                      <ActionCardTitle>{notifier}</ActionCardTitle>
                    </div>
                    <ActionCardDescription>
                      Send notifications to {notifier}
                    </ActionCardDescription>
                  </ActionCardHeader>
                </ActionCard>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="border-b">
                  <SheetTitle>Notifier</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <FormCard className="border-none">
                  <FormCardContent>
                    {notifier === "Slack" && <FormSlack />}
                    {notifier === "Discord" && <FormDiscord />}
                    {notifier === "Email" && <FormEmail />}
                    {notifier === "SMS" && <FormSms />}
                    {notifier === "Webhook" && <FormWebhook />}
                  </FormCardContent>
                </FormCard>
                <SheetFooter className="border-t">
                  <Button type="submit" form="notifier-form">
                    Save changes
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </ActionCardGroup>
      </Section>
    </SectionGroup>
  );
}
