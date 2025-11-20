import Link from "next/link";
import { formatDate, type MDXData } from "@/content/utils";

export function ContentList({
  data,
  prefix,
  withCategory = false,
}: {
  data: MDXData[];
  prefix: string;
  withCategory?: boolean;
}) {
  return (
    <section className="prose">
      <div>
        {data
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="no-underline! flex flex-col hover:bg-muted"
              href={`${prefix}/${post.slug}`}
            >
              <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
                <span className="text-muted-foreground tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </span>
                <span className="text-foreground tracking-tight">
                  {post.metadata.title}
                </span>
                {withCategory ? (
                  <span className="text-muted-foreground">
                    [{post.metadata.category}]
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
