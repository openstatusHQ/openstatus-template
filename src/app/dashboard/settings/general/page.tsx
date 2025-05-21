import { Link } from "@/components/common/link";
import {
  Section,
  SectionDescription,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Ellipsis, Lock } from "lucide-react";

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
          <FormCard>
            <FormCardHeader>
              <FormCardTitle>Slug</FormCardTitle>
              <FormCardDescription>
                The unique slug for your workspace.
              </FormCardDescription>
            </FormCardHeader>
            <FormCardContent>
              <Button variant="outline" size="sm">
                easy-peasy
                <Copy size={16} className="text-muted-foreground" />
              </Button>
            </FormCardContent>
            <FormCardFooter className="[&>:last-child]:ml-0">
              <FormCardFooterInfo>
                Used when interacting with the API or for help on Discord.
              </FormCardFooterInfo>
            </FormCardFooter>
          </FormCard>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Maximilian Kaske</TableCell>
                        <TableCell>max@openstatus.dev</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>2021-01-01</TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-5"
                              aria-label="Edit member"
                            >
                              <Ellipsis size={16} aria-hidden="true" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
              <Table>
                <TableBody>
                  <TableRow className="[&>:not(:last-child)]:border-r">
                    <TableHead className="bg-muted/50 h-auto">
                      Created At
                    </TableHead>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  </TableRow>
                  <TableRow className="[&>:not(:last-child)]:border-r">
                    <TableHead className="bg-muted/50 h-auto">Token</TableHead>
                    <TableCell>os_3ZJh...</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
