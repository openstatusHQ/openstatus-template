import { Link } from "@/components/common/link";
import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import { DataTable as ApiKeyDataTable } from "@/components/data-table/settings/api-key/data-table";
import {
  FormCardDescription,
  FormCardFooterInfo,
  FormCardGroup,
  FormCardHeader,
  FormCardTitle,
} from "@/components/forms/form-card";
import {
  FormCard,
  FormCardContent,
  FormCardFooter,
} from "@/components/forms/form-card";
import { FormWorkspace } from "@/components/forms/settings/form-workspace";
import { Button } from "@/components/ui/button";
import { FormSlug } from "@/components/forms/settings/form-slug";
import { FormMembers } from "@/components/forms/settings/form-members";

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
          <FormMembers />
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
