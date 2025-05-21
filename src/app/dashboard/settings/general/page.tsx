import { Link } from "@/components/common/link";
import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { DataTable as MembersDataTable } from "@/components/data-table/settings/members/data-table";
import { DataTable as ApiKeyDataTable } from "@/components/data-table/settings/api-key/data-table";
import {
  FormCardDescription,
  FormCardFooterInfo,
  FormCardGroup,
  FormCardHeader,
  FormCardTitle,
  FormCardUpgrade,
} from "@/components/forms/form-card";
import {
  FormCard,
  FormCardContent,
  FormCardFooter,
} from "@/components/forms/form-card";
import { FormWorkspace } from "@/components/forms/settings/form-workspace";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";
import { FormSlug } from "@/components/forms/settings/form-slug";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>General</SectionTitle>
          <SectionDescription>
            Manage your workspace settings.
          </SectionDescription>
        </SectionHeader>
        <FormCardGroup>
          <FormWorkspace />
          <FormSlug />
          <FormCard>
            <FormCardUpgrade />
            <FormCardHeader>
              <FormCardTitle>Team</FormCardTitle>
              <FormCardDescription>
                Manage your team members.
              </FormCardDescription>
            </FormCardHeader>
            <FormCardContent>
              <Tabs defaultValue="members">
                <TabsList>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                  <MembersDataTable />
                </TabsContent>
                <TabsContent value="pending"></TabsContent>
              </Tabs>
            </FormCardContent>
            <FormCardFooter>
              <FormCardFooterInfo>
                This feature is available on the <Link href="#">Pro plan</Link>.
              </FormCardFooterInfo>
              <Button size="sm">
                <Lock />
                Upgrade
              </Button>
            </FormCardFooter>
          </FormCard>
          <FormCard>
            <FormCardHeader>
              <FormCardTitle>API Key</FormCardTitle>
              <FormCardDescription>
                Create and revoke your API key.
              </FormCardDescription>
            </FormCardHeader>
            <FormCardContent>
              <ApiKeyDataTable />
            </FormCardContent>
            <FormCardFooter>
              <FormCardFooterInfo>
                Trigger monitors via CLI or API or create your own status page.{" "}
                <Link href="#">Learn more</Link>.
              </FormCardFooterInfo>
              <Button variant="destructive" size="sm">
                Revoke
              </Button>
            </FormCardFooter>
          </FormCard>
        </FormCardGroup>
      </Section>
    </SectionGroup>
  );
}
