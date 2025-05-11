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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
          {["Slack", "Email", "SMS", "Discord", "Telegram", "Webhook"].map(
            (notifier) => (
              <Sheet key={notifier}>
                <SheetTrigger asChild>
                  {/* ActionCard */}
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
                  <SheetHeader>
                    <SheetTitle>Notifier</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 p-4">Hello World</div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )
          )}
        </ActionCardGroup>
      </Section>
    </SectionGroup>
  );
}
