import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";

export function StatusUpdates({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(className)}
          {...props}
        >
          Get updates
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 overflow-hidden">
        <Tabs defaultValue="email">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="rss">RSS</TabsTrigger>
            <TabsTrigger value="atom">Atom</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 px-2 pb-2 border-b">
              <p className="text-sm text-foreground">
                Get email notifications whenever a report has been created or
                resolved
              </p>
              <Input placeholder="notify@me.com" />
            </div>
            <div className="px-2 pb-2">
              <Button className="w-full">Subscribe</Button>
            </div>
          </TabsContent>
          <TabsContent value="rss" className="px-2 pb-2">
            <Input
              placeholder="https://status.openstatus.dev/feed/rss"
              disabled
            />
          </TabsContent>
          <TabsContent value="atom" className="px-2 pb-2">
            <Input
              placeholder="https://status.openstatus.dev/feed/atom"
              disabled
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
