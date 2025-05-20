"use client";

import { Form, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export function CreateMonitorForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <div className="grid gap-1.5">
          <Label>URL</Label>
          <Input placeholder="https://api.openstatus.dev" />
          <FormDescription>
            Enter the URL of the website you want to monitor.
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}
