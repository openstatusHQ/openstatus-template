/**
 * TODO:
 * - add different header
 * - add different chart/tracker
 * - add subscription popover (choose which one you'd like to allow)
 * - use the '@/components/status-page` for the components
 */

import { Link } from "@/components/common/link";
import { StatusUpdates } from "@/components/status-page/status-updates";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

const nav = [
  { label: "Status", href: "/status-page" },
  { label: "Events", href: "/status-page/events" },
  { label: "Monitors", href: "/status-page/monitors" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <header className="w-full border-b border">
        <nav className="max-w-xl mx-auto px-3 py-2 flex items-center justify-between">
          {/* NOTE: same width as the `StatusUpdates` button */}
          <div className="w-[105px] shrink-0">
            <a href="#">
              <img
                src="https://www.openstatus.dev/icon.png"
                alt="Craft"
                className="size-8 rounded-full border"
              />
            </a>
          </div>
          <ul className="flex flex-row gap-2">
            {nav.map((item) => (
              <li key={item.label}>
                <Button variant="ghost" size="sm" asChild>
                  <NextLink href={item.href}>{item.label}</NextLink>
                </Button>
              </li>
            ))}
          </ul>
          <StatusUpdates />
        </nav>
      </header>
      <main className="max-w-xl w-full mx-auto flex-1 px-3 py-2">
        {children}
      </main>
      <footer className="w-full border-t border">
        <div className="max-w-xl mx-auto px-3 py-2">
          <p className="text-center text-muted-foreground">
            Powered by <Link href="#">OpenStatus</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
