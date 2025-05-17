import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Dialog } from "@/components/ui/dialog";

export function DialogCreateStatusPage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create Status Page</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Status Page</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Create a new status page to monitor your website or service.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
