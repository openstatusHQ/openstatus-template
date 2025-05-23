import {
  FormCard,
  FormCardDescription,
  FormCardFooter,
  FormCardGroup,
  FormCardHeader,
  FormCardTitle,
} from "@/components/forms/form-card";
import { FormAlertDialog } from "@/components/forms/form-alert-dialog";
import { FormGeneral } from "./form-general";
import { FormMonitors } from "./form-monitors";
import { FormCustomDomain } from "./form-custom-domain";
import { FormPasswordProtection } from "./form-password-protection";

export function FormStatusPageUpdate() {
  return (
    <FormCardGroup>
      <FormGeneral />
      <FormMonitors />
      <FormCustomDomain />
      <FormPasswordProtection />
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
