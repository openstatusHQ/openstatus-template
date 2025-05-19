"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FormDescription } from "@/components/ui/form";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { monitors } from "@/data/monitors";
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
        <div className="grid gap-1.5">
          <Label>Monitors</Label>
          <FormDescription>
            Select the monitors you want to notify.
          </FormDescription>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="all" />
              <Label htmlFor="all">Select all</Label>
            </div>
            {monitors.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox id={item.id} />
                <Label htmlFor={item.id}>{item.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
