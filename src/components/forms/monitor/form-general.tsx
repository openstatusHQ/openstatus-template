"use client";

import { InputWithAddons } from "@/components/common/input-with-addons";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

export function FormGeneral() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="grid gap-4">
        <div className="grid gap-1.5">
          <Label>Name</Label>
          <Input placeholder="OpenStatus API" />
          <FormDescription>Displayed on the status page.</FormDescription>
        </div>
        {/* RadioGroup for request type (HTTP, TCP) */}
        <div className="grid gap-1.5">
          <Label>Method</Label>
          <Select>
            <SelectTrigger>
              <SelectValue defaultValue="GET" placeholder="Select a method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label>URL</Label>
          <InputWithAddons
            placeholder="https://openstatus.dev"
            leading="https://"
          />
        </div>
        <div className="grid gap-1.5">
          <Label>Request Header</Label>
          <div className="flex flex-row items-center gap-2">
            <Input placeholder="Key" />
            <Input placeholder="Value" />
            <Button size="icon" variant="ghost">
              <X />
            </Button>
          </div>
          <div>
            <Button size="sm">Add Header</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
