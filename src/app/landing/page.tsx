import { formatDate, getBlogPosts } from "@/content/utils";
import Link from "next/link";

export default function Page() {
  const allBlogs = getBlogPosts();
  return (
    <section className="prose">
      <div className="space-y-4">
        {allBlogs
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
              className="flex flex-col no-underline!"
              href={`/landing/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <span className="text-muted-foreground tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </span>
                <span className="text-foreground tracking-tight">
                  {post.metadata.title}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
