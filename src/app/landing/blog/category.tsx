import { getBlogPosts } from "@/content/utils";
import Link from "next/link";

const allBlogs = getBlogPosts();
const categories = [...new Set(allBlogs.map((blog) => blog.metadata.category))];

export function BlogCategory() {
  return (
    <p className="flex divide-x divide-border gap-2.5">
      <Link className="pr-2.5" href="/landing/blog">
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          className="pr-2"
          href={`/landing/blog/category/${category.toLowerCase()}`}
        >
          {category}
        </Link>
      ))}
    </p>
  );
}
