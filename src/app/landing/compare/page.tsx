import { Link } from "@/components/common/link";
import { components } from "@/content/mdx";
import { getComparePages } from "@/content/utils";

export default function Page() {
  return (
    <section className="prose">
      <h1>Compare openstatus with uptime and status page solutions</h1>
      <components.Grid cols={2}>
        {getComparePages().map((page) => (
          <div key={page.slug}>
            <p>
              <strong>{page.metadata.title}</strong>
            </p>
            <p>{page.metadata.summary}</p>
            <Link href={`/landing/compare/${page.slug}`}>Read more</Link>
          </div>
        ))}
      </components.Grid>
    </section>
  );
}
