import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
      <PopoverContent align="end">Subscribe to status updates.</PopoverContent>
    </Popover>
  );
}
