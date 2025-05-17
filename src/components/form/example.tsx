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
} from "@/components/form/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/common/link";
import { Form, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormAlertDialog } from "@/components/form/form-alert-dialog";
import { InputWithAddons } from "../common/input-with-addons";

export function Example() {
  const form = useForm();
  return (
    <FormCardGroup>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Basic Information</FormCardTitle>
          <FormCardDescription>
            The public status page for your project.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <Form {...form}>
            <form className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>Title</Label>
                <Input placeholder="My Status Page" />
                <FormDescription>
                  The title of your status page.
                </FormDescription>
              </div>
              <div className="grid gap-1.5">
                <Label>Slug</Label>
                <InputWithAddons
                  placeholder="status"
                  trailing=".openstatus.dev"
                />
                <FormDescription>
                  The subdomain for your status page. At least 3 chars.
                </FormDescription>
              </div>
            </form>
          </Form>
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
        <FormCardUpgrade />
        <FormCardHeader>
          <FormCardTitle>Custom Domain</FormCardTitle>
          <FormCardDescription>
            Use your own domain for your status page.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <div className="grid gap-1.5">
            <Label>Domain</Label>
            <InputWithAddons
              placeholder="status.openstatus.dev"
              leading="https://"
            />
          </div>
        </FormCardContent>
        <FormCardFooter>
          <FormCardFooterInfo>
            Learn more about <Link href="#">Custom Domain</Link>.
          </FormCardFooterInfo>
          <Button>Upgrade</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
        <FormCardUpgrade />
        <FormCardHeader>
          <FormCardTitle>Password Protection</FormCardTitle>
          <FormCardDescription>
            Protect your status page with a password.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardSeparator />
        <FormCardContent>
          <div className="grid gap-1.5">
            <Label>Password</Label>
            <Input />
          </div>
        </FormCardContent>
        <FormCardSeparator />
        <FormCardContent>
          <div className="grid gap-1.5">
            <Label>Password</Label>
            <Input />
          </div>
        </FormCardContent>
        <FormCardFooter>
          <FormCardFooterInfo>
            Learn more about <Link href="#">Password Protection</Link>.
          </FormCardFooterInfo>
          <Button>Upgrade</Button>
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
