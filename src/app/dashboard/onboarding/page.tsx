import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "@/components/forms/form-card";
import { CreateMonitorForm } from "@/components/forms/onboarding/create-monitor";
import { CreatePageForm } from "@/components/forms/onboarding/create-page";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>Getting Started</SectionTitle>
          <SectionDescription>
            Welcome to OpenStatus. Let&apos;s get you set up.
          </SectionDescription>
        </SectionHeader>
      </Section>
      <Section>
        <SectionHeader>
          <SectionDescription className="tabular-nums">
            Step <span className="font-medium text-foreground">1</span> of{" "}
            <span className="font-medium text-foreground">2</span>
          </SectionDescription>
        </SectionHeader>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Create a monitor</FormCardTitle>
            <FormCardDescription>
              Get uptime, response time and more for your website or API.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent>
            <CreateMonitorForm id="create-monitor-form" />
          </FormCardContent>
          <FormCardFooter>
            <Button form="create-monitor-form">Submit</Button>
          </FormCardFooter>
        </FormCard>
      </Section>
      <Section>
        <SectionHeader>
          <SectionDescription className="tabular-nums">
            Step <span className="font-medium text-foreground">2</span> of{" "}
            <span className="font-medium text-foreground">2</span>
          </SectionDescription>
        </SectionHeader>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Create a page</FormCardTitle>
            <FormCardDescription>
              Inform your users about the status of your website or API.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent>
            <CreatePageForm id="create-page-form" />
          </FormCardContent>
          <FormCardFooter>
            <Button form="create-page-form">Submit</Button>
          </FormCardFooter>
        </FormCard>
      </Section>
    </SectionGroup>
  );
}
