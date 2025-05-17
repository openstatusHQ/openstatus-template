import { InputWithAddons } from "@/components/common/input-with-addons";
import { FormDescription } from "@/components/ui/form";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export function FormGeneral() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="grid gap-4">
        <div className="grid gap-1.5">
          <Label>Title</Label>
          <Input placeholder="My Status Page" />
          <FormDescription>
            Enter a descriptive name for your status page.
          </FormDescription>
        </div>
        <div className="grid gap-1.5">
          <Label>Slug</Label>
          <InputWithAddons placeholder="status" trailing=".openstatus.dev" />
          <FormDescription>
            Choose a unique subdomain for your status page (minimum 3
            characters).
          </FormDescription>
        </div>
        <div className="grid gap-1.5">
          <Label>Favicon</Label>
          <div className="flex flex-row items-center space-x-2">
            <div className="size-[36px] bg-muted rounded-md border"></div>
            <Input type="file" />
          </div>
        </div>
        <div className="grid gap-1.5 col-span-full">
          <Label>Description</Label>
          <Textarea />
          <FormDescription>
            Provide a brief overview of your status page purpose.
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}
