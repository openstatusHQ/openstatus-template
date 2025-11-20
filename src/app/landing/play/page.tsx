import { components } from "@/content/mdx";
import { playSection } from "@/data/content";
import Link from "next/link";

export default function Page() {
  return (
    <section className="prose">
      <h1>{playSection.label}</h1>
      <components.Grid cols={2}>
        {playSection.items.map((tool) => (
          <div key={tool.href}>
            <p>
              <strong>{tool.label}</strong>
            </p>
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
