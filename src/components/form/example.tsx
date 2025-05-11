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
} from "@/components/form/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/common/link";
import { Form, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormAlertDialog } from "@/components/form/form-alert-dialog";

export function Example() {
  const form = useForm();
  return (
    <FormCardGroup>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Password Protection</FormCardTitle>
          <FormCardDescription>
            Protect your status page with a password.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <Form {...form}>
            <div className="grid gap-1.5">
              <Label>Password</Label>
              <Input />
              <FormDescription>
                This is a description for the password field.
              </FormDescription>
            </div>
          </Form>
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
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
