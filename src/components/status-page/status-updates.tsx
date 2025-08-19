import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function StatusUpdates() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            Get updates
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          Subscribe to status updates.
        </PopoverContent>
      </Popover>
    </div>
  );
}
