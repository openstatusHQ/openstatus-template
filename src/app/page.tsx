"use client";

import { Link } from "@/components/common/link";
import { GitHubIcon } from "@/components/icons/github";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import NextLink from "next/link";
import { useState, useEffect } from "react";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://template.openstatus.dev";

const REGISTRY_ITEMS = [
  "metric-card.json",
  "action-card.json",
  "form-card.json",
  "section.json",
  "empty-state.json",
];

const DEFAULT_INDEX = 2;

export default function Home() {
  const { copy, isCopied } = useCopyToClipboard();
  const [selected, setSelected] = useState(REGISTRY_ITEMS[DEFAULT_INDEX]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col items-center gap-2 p-4">
          <Badge variant="secondary">Coming soon</Badge>
          <h1 className="text-center text-2xl sm:text-3xl font-bold max-w-xl">
            Welcome to the OpenStatus-Template
          </h1>
          <p className="text-foreground/70 text-sm sm:text-base text-center max-w-[38rem]">
            We&apos;ve created this template to help you get started with your{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @shadcn/ui
            </Link>{" "}
            project. It uses{" "}
            <Link
              href="https://nextjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @nextjs
            </Link>{" "}
            in an SPA mode and can be exported statically{" "}
            <span className="text-foreground font-medium">(BYO router)</span>.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="relative text-xs text-foreground/70 font-mono flex items-center gap-2 max-w-[320px] sm:max-w-[620px] transition-all duration-300 ease-in-out"
          onClick={() => {
            const url = `pnpm dlx shadcn@latest add ${BASE_URL}/r/${selected}`;
            copy(url, {
              successMessage: `Copied ${selected} url to clipboard.`,
            });
          }}
        >
          <div className="block sm:hidden truncate">
            pnpm dlx shadcn@latest add {BASE_URL}/r/{selected}
          </div>
          <div className="hidden sm:flex items-center">
            pnpm dlx shadcn@latest add {BASE_URL}/r/
            <SelectWheel
              items={REGISTRY_ITEMS}
              value={selected}
              onChange={setSelected}
              className="w-[120px] h-6"
            />
          </div>
          {isCopied ? (
            <CheckIcon className="shrink-0" />
          ) : (
            <CopyIcon className="shrink-0" />
          )}
        </Button>
        <div className="flex items-center justify-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <NextLink
              href="https://github.com/openstatusHQ/openstatus-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              GitHub
            </NextLink>
          </Button>
          <Button size="sm" asChild>
            <NextLink href="/dashboard/onboarding">Dashboard</NextLink>
          </Button>
        </div>
      </main>
      <footer className="flex items-center justify-center gap-4 border-t border-border p-4">
        <p className="text-foreground/70 text-center">
          Powered by{" "}
          <Link
            href="https://openstatus.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStatus
          </Link>
        </p>
        <ThemeToggle />
      </footer>
    </div>
  );
}

// NOTE: a bit hacky and not a11y compliant, but it works for now

interface SelectWheelProps {
  items: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

function SelectWheel({ items, value, onChange, className }: SelectWheelProps) {
  // internal render count includes two placeholders
  const count = items.length + 2;

  const initialRenderIdx = value ? items.indexOf(value) + 1 : DEFAULT_INDEX + 1;
  const [selectedIndex, setSelectedIndex] = useState(initialRenderIdx);

  const theta = (2 * Math.PI) / count;
  const radius = 28;

  const firstReal = 1;
  const lastReal = items.length; // render index of last real item

  useEffect(() => {
    if (value) {
      const idx = items.indexOf(value);
      if (idx !== -1) setSelectedIndex(idx + 1);
    }
  }, [value, items]);

  const getItem = (renderIdx: number) => {
    if (renderIdx === 0 || renderIdx === count - 1) return null;
    return items[renderIdx - 1];
  };

  const moveTo = (idx: number) => {
    if (idx < firstReal || idx > lastReal) return;
    setSelectedIndex(idx);
    const item = getItem(idx);
    if (item) onChange?.(item);
  };

  const moveBy = (delta: number) => {
    let idx = selectedIndex + delta;
    // skip empty placeholders
    while (!getItem(idx) && idx >= firstReal && idx <= lastReal) {
      idx += delta > 0 ? 1 : -1;
    }
    moveTo(idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        moveBy(1);
        break;
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        moveBy(-1);
        break;
      case "Home":
        e.preventDefault();
        moveTo(firstReal);
        break;
      case "End":
        e.preventDefault();
        moveTo(lastReal);
        break;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full focus:outline-none border border-transparent focus:border-ring focus:ring-ring/50 focus:ring-2 rounded-md",
        className
      )}
      role="listbox"
      aria-label="Select component"
      aria-activedescendant={`wheel-option-${selectedIndex}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="rounded-md h-full w-full [perspective:1000px] [transform-style:preserve-3d]">
        <div
          className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-out"
          style={{
            transform: `translateZ(-${radius}px) rotateX(${
              -selectedIndex * theta
            }rad)`,
          }}
        >
          {/* placeholder at start */}
          {(() => {
            const angle = 0;
            return (
              <div
                key="placeholder-start"
                id="wheel-option-0"
                role="option"
                aria-selected={selectedIndex === 0}
                aria-disabled
                className="absolute left-1/2 top-1/2 h-6 w-full -translate-x-1/2 -translate-y-1/2 select-none [backface-visibility:hidden]"
                style={{
                  transform: `rotateX(${angle}rad) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            );
          })()}

          {items.map((item, idx) => {
            const renderIdx = idx + 1; // account for first placeholder
            const angle = theta * renderIdx;
            return (
              <div
                key={item}
                className={cn(
                  "absolute left-1/2 top-1/2 h-6 w-full -translate-x-1/2 -translate-y-1/2 select-none [backface-visibility:hidden] transition-transform duration-500 ease-out flex items-center justify-start cursor-pointer"
                )}
                style={{
                  transform: `rotateX(${angle}rad) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
                onClick={(e) => {
                  if (selectedIndex !== renderIdx) {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIndex(renderIdx);
                    onChange?.(item);
                  }
                }}
                role="option"
                id={`wheel-option-${renderIdx}`}
                aria-selected={renderIdx === selectedIndex}
              >
                <span
                  className={cn(
                    "text-xs transition-colors",
                    renderIdx === selectedIndex
                      ? "text-foreground"
                      : "text-muted-foreground/70"
                  )}
                >
                  {item}
                </span>
              </div>
            );
          })}

          {/* placeholder at end */}
          {(() => {
            const angle = theta * (count - 1);
            return (
              <div
                key="placeholder-end"
                id={`wheel-option-${count - 1}`}
                role="option"
                aria-selected={selectedIndex === count - 1}
                aria-disabled
                className="absolute left-1/2 top-1/2 h-6 w-full -translate-x-1/2 -translate-y-1/2 select-none [backface-visibility:hidden]"
                style={{
                  transform: `rotateX(${angle}rad) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}
