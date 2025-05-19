"use client";

import { FormDescription } from "@/components/ui/form";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export function NotifierForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="grid gap-4">
        <div className="grid gap-1.5">
          <Label>Name</Label>
          <Input placeholder="My Notifier" />
          <FormDescription>
            Enter a descriptive name for your notifier.
          </FormDescription>
        </div>
        <div className="grid gap-1.5">
          <Label>Webhook URL</Label>
          <Input placeholder="https://example.com/webhook" />
        </div>
      </form>
    </Form>
  );
}
