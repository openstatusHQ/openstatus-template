"use client";

import { InputWithAddons } from "@/components/common/input-with-addons";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
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
        <Tabs defaultValue="http">
          <TabsList>
            <TabsTrigger value="http">HTTP</TabsTrigger>
            <TabsTrigger value="tcp">TCP</TabsTrigger>
          </TabsList>
          <TabsContent value="http" className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    defaultValue="GET"
                    placeholder="Select a method"
                  />
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
            <div className="grid gap-1.5">
              <Label>Body</Label>
              <Textarea />
              <FormDescription>Write your payload</FormDescription>
            </div>
            <div className="grid gap-1.5">
              <Label>Assertions</Label>
              <FormDescription>
                Validate the response to ensure your service is working as
                expected.
                <br />
                By default, we check for a{" "}
                <span className="text-foreground font-medium">
                  2xx status code
                </span>
                .
              </FormDescription>
              <div className="flex gap-1.5">
                <Button variant="outline">
                  <Plus />
                  Status assertion
                </Button>
                <Button variant="outline">
                  <Plus />
                  Header assertion
                </Button>
                <Button variant="outline">
                  <Plus />
                  Body assertion
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tcp" className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>URI</Label>
              <Input placeholder="127.0.0.0.1:8080" />
            </div>
            <EmptyStateContainer>
              <EmptyStateTitle>No assertions for TCP</EmptyStateTitle>
            </EmptyStateContainer>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
