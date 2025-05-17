import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputWithAddonsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

// "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

const InputWithAddons = React.forwardRef<
  HTMLInputElement,
  InputWithAddonsProps
>(({ leading, trailing, className, ...props }, ref) => {
  return (
    <div className="border-input ring-offset-background group flex h-9 w-full rounded-md border bg-transparent focus-within:outline-none focus-within:ring-[3px] focus-within:border-ring focus-within:ring-ring/50 overflow-hidden text-base shadow-xs transition-[color,box-shadow] md:text-sm">
      {leading ? (
        <div className="border-input bg-muted border-r px-3 py-1 flex items-center justify-center">
          {leading}
        </div>
      ) : null}
      <input
        className={cn(
          "bg-background placeholder:text-muted-foreground w-full rounded-md px-3 py-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {trailing ? (
        <div className="border-input bg-muted border-l px-3 py-1 flex items-center justify-center">
          {trailing}
        </div>
      ) : null}
    </div>
  );
});

InputWithAddons.displayName = "InputWithAddons";

export { InputWithAddons };
