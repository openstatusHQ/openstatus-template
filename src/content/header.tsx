import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/data/content";
import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="flex border border-border divide-x divide-border [&>*]:px-4 [&>*]:py-4 [&>*]:hover:bg-muted">
      <Link href="/landing">openstatus</Link>
      {links.map((section, index) => (
        <DropdownMenu key={index}>
          <DropdownMenuTrigger className="data-[state=open]:bg-muted group flex items-center gap-1">
            {section.label}
            <ChevronDown
              className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
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
      <Link href="/dashboard">Pricing</Link>
      <Link href="https://docs.openstatus.dev">Docs</Link>
      <Link
        href="https://app.openstatus.dev/login"
        className="ml-auto font-semibold"
      >
        Login
      </Link>
    </header>
  );
}
