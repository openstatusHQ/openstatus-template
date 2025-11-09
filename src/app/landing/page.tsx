import { formatDate, getBlogPosts } from "@/content/utils";
import Link from "next/link";

export default function Page() {
  const allBlogs = getBlogPosts();
  return (
    <section>
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
              className="flex flex-col space-y-1 mb-4"
              href={`/landing/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-muted-foreground tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-foreground tracking-tight">
                  {post.metadata.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
