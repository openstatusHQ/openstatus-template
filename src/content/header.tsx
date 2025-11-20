import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { headerLinks } from "@/data/content";
import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="grid border border-border grid-cols-3 lg:grid-cols-6 gap-px bg-border [&>*]:bg-background [&>*]:px-4 [&>*]:py-4 [&>*]:hover:bg-muted">
      <Link href="/landing" className="flex items-center gap-2">
        <img
          src="/assets/openstatus-logo.svg"
          alt="openstatus"
          width={20}
          height={20}
          className="border border-border dark:border-foreground rounded-full"
        />
        <span className="hidden sm:block">openstatus</span>
      </Link>
      {headerLinks.map((section, _) => (
        <DropdownMenu key={section.label}>
          <DropdownMenuTrigger className="data-[state=open]:bg-muted group flex items-center gap-1">
            <span className="w-full text-left truncate">{section.label}</span>
            <ChevronDown
              className="relative top-[1px] ml-1 size-4 shrink-0 transition duration-300 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-none w-56">
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
        className="text-info truncate"
      >
        Dashboard
      </Link>
    </header>
  );
}
