"use client";

import { InputWithAddons } from "@/components/common/input-with-addons";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export function CreatePageForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <div className="grid gap-1.5">
          <Label>Slug</Label>
          <InputWithAddons placeholder="my-status" trailing=".openstatus.dev" />
          <FormDescription>
            Enter the slug of the page or generate one:{" "}
            <Button size="sm" variant="outline" type="button">
              Random slug
            </Button>
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}
