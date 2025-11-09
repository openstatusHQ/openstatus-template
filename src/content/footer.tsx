import { Link } from "@/components/common/link";
import { links } from "@/data/content";

export function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border [&>div]:p-4">
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
      <div>
        <p className="text-muted-foreground">
          Powered by <Link href="https://openstatus.dev">openstatus</Link>.
        </p>
      </div>
    </footer>
  );
}
