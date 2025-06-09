"use client";

import React, { createContext, useContext, useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export const VARIANT = ["success", "degraded", "error", "info"] as const;
export type VariantType = (typeof VARIANT)[number];

export const CARD_TYPE = ["detailed", "compact"] as const;
export type CardType = (typeof CARD_TYPE)[number];

interface StatusPageContextType {
  variant: VariantType;
  setVariant: (variant: VariantType) => void;
  cardType: CardType;
  setCardType: (cardType: CardType) => void;
}

const StatusPageContext = createContext<StatusPageContextType | null>(null);

export function useStatusPage() {
  const context = useContext(StatusPageContext);
  if (!context) {
    throw new Error("useStatusPage must be used within a StatusPageProvider");
  }
  return context;
}

export function StatusPageProvider({
  children,
  defaultVariant = "success",
}: {
  children: React.ReactNode;
  defaultVariant?: VariantType;
}) {
  const [variant, setVariant] = useState<VariantType>(defaultVariant);
  const [cardType, setCardType] = useState<CardType>("detailed");

  return (
    <StatusPageContext.Provider
      value={{ variant, setVariant, cardType, setCardType }}
    >
      {children}
    </StatusPageContext.Provider>
  );
}

export function FloatingButton({ className }: { className?: string }) {
  const { variant, setVariant, cardType, setCardType } = useStatusPage();

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="size-12 rounded-full"
          >
            <Settings className="size-5" />
            <span className="sr-only">Open status page settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Status Page Settings</h4>
              <p className="text-sm text-muted-foreground">
                Configure the status page appearance
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Variant</label>
                <Select
                  value={variant}
                  onValueChange={(v) => setVariant(v as VariantType)}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VARIANT.map((v) => (
                      <SelectItem key={v} value={v} className="capitalize">
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Card Type</label>
                <Select
                  value={cardType}
                  onValueChange={(v) => setCardType(v as CardType)}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CARD_TYPE.map((v) => (
                      <SelectItem key={v} value={v} className="capitalize">
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <div className="flex justify-start">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
