import { getBlogPosts } from "@/content/utils";
import Link from "next/link";

const allBlogs = getBlogPosts();
const categories = [...new Set(allBlogs.map((blog) => blog.metadata.category))];

export function BlogCategory() {
  return (
    <p className="flex flex-wrap">
      <Link className="pr-2.5" href="/landing/blog">
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          className="border-l border-border px-2.5"
          href={`/landing/blog/category/${category.toLowerCase()}`}
        >
          {category}
        </Link>
      ))}
    </p>
  );
}
