import { Link } from "@/components/common/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { links } from "@/data/content";

export function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-border divide-y md:divide-y-0 md:divide-x divide-border [&>div]:p-4">
        {links.map((section) => (
          <div key={section.label}>
            <p className="text-muted-foreground">{section.label}</p>
            <ul>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border border-border border-t-0 [&>div]:p-4">
        <div className="space-y-1.5">
          <p className="text-muted-foreground">
            Powered by <Link href="https://openstatus.dev">openstatus</Link>.
          </p>
          <ThemeToggle className="rounded-none" />
        </div>
      </div>
    </footer>
  );
}
