import { Link } from "@/components/common/link";
import { ThemeToggle } from "@/content/theme-toggle";
import { footerLinks } from "@/data/content";

export function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-border gap-px bg-border [&>div]:bg-background [&>div]:p-4">
        {footerLinks.map((section) => (
          <div key={section.label}>
            <p className="text-muted-foreground">{section.label}</p>
            <ul>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block w-full">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 border border-border border-t-0 gap-px bg-border [&>*]:bg-background">
        <p className="text-muted-foreground p-4">
          Powered by <Link href="https://openstatus.dev">openstatus</Link>.
        </p>
        <div>
          <Link
            href="https://status.openstatus.dev"
            className="flex items-center gap-2 w-full p-4"
          >
            Operational
            <div className="size-2.5 rounded-full bg-success" />
          </Link>
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <ThemeToggle className="rounded-none" />
        </div>
      </div>
    </footer>
  );
}
