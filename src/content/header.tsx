import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { headerLinks } from "@/data/content";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function Header() {
  return (
    <header className="grid grid-cols-3 gap-px border border-border bg-border lg:grid-cols-6 [&>*]:bg-background [&>*]:px-4 [&>*]:py-4 [&>*]:hover:bg-muted">
      <ContextMenu>
        <ContextMenuTrigger className="group" asChild>
          <Link href="/landing" className="relative flex items-center gap-2">
            <img
              src="/assets/openstatus-logo.svg"
              alt="openstatus"
              width={20}
              height={20}
              className="rounded-full border border-border dark:border-foreground"
            />
            <span className="hidden sm:block">openstatus</span>
            <div className="absolute bottom-0 right-0.5 group-hover:block hidden">
              <span className="text-[10px] text-muted-foreground/50">
                [right click]
              </span>
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className="rounded-none min-w-[var(--radix-dropdown-menu-trigger-width)]">
          <ContextMenuItem className="rounded-none px-2 py-3 font-mono" asChild>
            {/* FIXME: use relative path */}
            <a
              href="https://openstatus.dev/assets/logos/OpenStatus.svg"
              download="openstatus.svg"
            >
              Download Name SVG
            </a>
          </ContextMenuItem>
          <ContextMenuItem className="rounded-none px-2 py-3 font-mono" asChild>
            <a
              href="https://openstatus.dev/assets/logos/OpenStatus-Logo.svg"
              download="openstatus-logo.svg"
            >
              Download Logo SVG
            </a>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {headerLinks.map((section, _) => (
        <DropdownMenu key={section.label}>
          <DropdownMenuTrigger className="group flex items-center gap-1 data-[state=open]:bg-muted">
            <span className="w-full truncate text-left">{section.label}</span>
            <ChevronDown
              className="relative top-[1px] ml-1 size-4 shrink-0 transition duration-300 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="rounded-none min-w-[var(--radix-dropdown-menu-trigger-width)]"
            alignOffset={0}
            sideOffset={0}
          >
            {section.items.map((item) => (
              <DropdownMenuItem
                key={item.href}
                className="rounded-none px-2 py-3 font-mono"
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
      <Link href="/landing/pricing" className="truncate">
        Pricing
      </Link>
      <Link href="https://docs.openstatus.dev" className="truncate">
        Docs
      </Link>
      <Link
        href="https://app.openstatus.dev/login"
        className="truncate text-info"
      >
        Dashboard
      </Link>
    </header>
  );
}
