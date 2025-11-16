import { formatDate, type MDXData } from "@/content/utils";
import Link from "next/link";

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
              className="flex flex-col no-underline! hover:bg-muted"
              href={`${prefix}/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
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
