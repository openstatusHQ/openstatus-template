import { Link } from "@/components/common/link";
import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionTitle,
} from "@/components/content/section";
import {
  FormCardDescription,
  FormCardFooterInfo,
  FormCardHeader,
  FormCardTitle,
} from "@/components/forms/form-card";
import {
  FormCard,
  FormCardContent,
  FormCardFooter,
} from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Ellipsis } from "lucide-react";

export default function Page() {
  return (
    <SectionGroup>
      <Section>
        <SectionHeader>
          <SectionTitle>General</SectionTitle>
        </SectionHeader>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Organization</FormCardTitle>
            <FormCardDescription>
              Manage your organization name.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent>
            <div className="grid gap-1.5">
              <Label>Name</Label>
              <Input />
            </div>
          </FormCardContent>
          <FormCardFooter>
            <Button size="sm">Submit</Button>
          </FormCardFooter>
        </FormCard>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Organization Slug</FormCardTitle>
            <FormCardDescription>
              This is the unique slug for your organization.
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
              Used when interacting with the API or Support.
            </FormCardFooterInfo>
          </FormCardFooter>
        </FormCard>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Members</SectionTitle>
        </SectionHeader>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Team</FormCardTitle>
            <FormCardDescription>Manage your team members.</FormCardDescription>
          </FormCardHeader>
          <FormCardContent>
            {/* TABS with members and pending invitations as table */}
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
          </FormCardContent>
          <FormCardFooter>
            <FormCardFooterInfo>
              This feature is avaiable on the <Link href="#">Pro plan</Link>.
            </FormCardFooterInfo>
            {/* Add dialog instead of button */}
            <Button size="sm">Upgrade</Button>
          </FormCardFooter>
        </FormCard>
      </Section>
    </SectionGroup>
  );
}
