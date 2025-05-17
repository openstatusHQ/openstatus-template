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
} from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/common/link";
import { Form, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormAlertDialog } from "@/components/forms/form-alert-dialog";
import { InputWithAddons } from "@/components/common/input-with-addons";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import { FormGeneral } from "./form-general";

export function FormStatusPageUpdate() {
  const form = useForm();
  return (
    <FormCardGroup>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>General</FormCardTitle>
          <FormCardDescription>
            Configure the essential details for your status page.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardSeparator />
        <FormCardContent>
          <FormGeneral />
        </FormCardContent>
        <FormCardFooter>
          <Button>Submit</Button>
        </FormCardFooter>
      </FormCard>
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>Monitors</FormCardTitle>
          <FormCardDescription>
            Add monitors to your status page.
          </FormCardDescription>
        </FormCardHeader>
        <FormCardContent>
          <EmptyStateContainer>
            <EmptyStateTitle>No monitors</EmptyStateTitle>
          </EmptyStateContainer>
        </FormCardContent>
        <FormCardSeparator />
        <FormCardContent>
          <Form {...form}>
            <form>
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox />
                <div className="space-y-1 leading-none">
                  <Label>Show values</Label>
                  <FormDescription>
                    Toggle the visibility of the values on the status page.
                    Share your uptime and the number of request to your
                    endpoint.
                  </FormDescription>
                </div>
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
          <Button>
            <Lock />
            Upgrade
          </Button>
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
        <FormCardContent>
          <Form {...form}>
            <form className="grid gap-4">
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox />
                <div className="space-y-1 leading-none">
                  <Label>Enable Password Protection</Label>
                  <FormDescription>
                    Hide the page from the public
                  </FormDescription>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Password</Label>
                <Input />
              </div>
            </form>
          </Form>
        </FormCardContent>
        <FormCardFooter>
          <FormCardFooterInfo>
            Learn more about <Link href="#">Password Protection</Link>.
          </FormCardFooterInfo>
          <Button>
            <Lock />
            Upgrade
          </Button>
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
