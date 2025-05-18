"use client";

import * as React from "react";
import {
  File,
  Forward,
  MoreHorizontal,
  Pencil,
  Zap,
  Trash2,
  CopyPlus,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const data = [
  [
    {
      label: "Edit",
      icon: Pencil,
      variant: "default" as const,
    },
    {
      label: "Share",
      icon: Forward,
      variant: "default" as const,
    },
    {
      label: "Copy ID",
      icon: Copy,
      variant: "default" as const,
    },
    {
      label: "Duplicate",
      icon: CopyPlus,
      variant: "default" as const,
    },
    {
      label: "Export",
      icon: File,
      variant: "default" as const,
    },
  ],
  [
    {
      label: "Delete",
      icon: Trash2,
      variant: "destructive" as const,
    },
  ],
];

export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground lg:inline-block">
        Last ping 5m ago
        <span className="relative inline-flex ml-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Zap />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Trigger Monitor</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data.map((group, index) => (
            <React.Fragment key={group[0].label}>
              <DropdownMenuGroup>
                {group.map((item) => (
                  <DropdownMenuItem key={item.label} variant={item.variant}>
                    <item.icon className="text-muted-foreground" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              {index < data.length - 1 ? <DropdownMenuSeparator /> : null}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
