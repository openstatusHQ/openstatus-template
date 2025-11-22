import { components } from "@/content/mdx";
import Link from "next/link";

export default function Page() {
  return (
    <section className="prose">
      <h1>Playground (Tools)</h1>
      <components.Grid cols={2}>
        {PLAY.map((tool) => (
          <div key={tool.href}>
            <p>
              <strong>{tool.label}</strong>
            </p>
            <p className="text-muted-foreground">{tool.description}</p>
            <Link href={tool.href}>
              {tool.href
                .replace(/^https:\/\/(www\.)?/, "")
                .replace("/landing", "")}
            </Link>
          </div>
        ))}
      </components.Grid>
    </section>
  );
}

const PLAY = [
  {
    label: "Global Speed Checker",
    description: "Test the latency of your website worldwide",
    href: "/landing/play/checker",
  },
  {
    label: "cURL Builder",
    description: "Curl your website",
    href: "/landing/play/curl",
  },
  {
    label: "Uptime SLA Calculator",
    description: "Calculate downtime duration or uptime percentage",
    href: "/landing/play/uptime-sla",
  },
  {
    label: "Theme Explorer",
    description: "Explore themes for your status page",
    href: "https://themes.openstatus.dev",
  },
  {
    label: "All Status Codes",
    description: "Explore all HTTP status codes",
    href: "https://openstat.us",
  },
  {
    label: "Vercel Edge Ping",
    description: "Use edge functions to ping your website",
    href: "https://light.openstatus.dev",
  },
  {
    label: "React Data Table",
    description: "Shadcn tanstack table with nuqs integration",
    href: "https://logs.run",
  },
  {
    label: "Shadcn Time Picker",
    description: "Shadcn time picker with date-fns integration",
    href: "https://time.openstatus.dev",
  },
  {
    label: "Astro Status Page",
    description: "Astro status page with openstatus integration",
    href: "https://astro.openstat.us",
  },
];
