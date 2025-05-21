"use client";

import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardFooterInfo,
  FormCardGroup,
  FormCardHeader,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import { FormGeneral } from "./form-general";
import { FormMonitors } from "./form-monitors";
import { FormCustomDomain } from "./form-custom-domain";

export function FormStatusPageUpdate() {
  const form = useForm();
  return (
    <FormCardGroup>
      <FormGeneral />
      <FormMonitors />
      <FormCustomDomain />
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
