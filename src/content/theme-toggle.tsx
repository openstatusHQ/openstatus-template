"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Laptop, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center gap-px bg-border [&>*]:bg-background [&>*]:p-4 [&>*]:flex-1 [&>*]:flex [&>*]:items-center [&>*]:justify-center",
          className
        )}
        {...props}
      >
        <div>
          <Sun className="h-6 w-6" />
        </div>
        <div>
          <Moon className="h-6 w-6" />
        </div>
        <div>
          <Laptop className="h-6 w-6" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-px bg-border [&>*]:bg-background [&>*]:p-4 [&>*]:flex-1 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:hover:bg-muted [&>*]:data-[active=true]:bg-muted",
        className
      )}
      {...props}
    >
      <button data-active={theme === "light"} onClick={() => setTheme("light")}>
        <Sun className="h-6 w-6" />
      </button>
      <button data-active={theme === "dark"} onClick={() => setTheme("dark")}>
        <Moon className="h-6 w-6" />
      </button>
      <button
        data-active={theme === "system"}
        onClick={() => setTheme("system")}
      >
        <Laptop className="h-6 w-6" />
      </button>
    </div>
  );
}
