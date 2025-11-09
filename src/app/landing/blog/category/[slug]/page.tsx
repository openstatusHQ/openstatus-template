import { getBlogPosts } from "@/content/utils";
import { ContentList } from "@/app/landing/content-list";
import { BlogCategory } from "@/app/landing/blog/category";

const baseUrl = "http://localhost:3000";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const categories = [...new Set(posts.map((post) => post.metadata.category))];

  console.log(categories);

  return categories.map((category) => ({
    slug: category.toLowerCase(),
  }));
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allBlogs = getBlogPosts().filter(
    (post) => post.metadata.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <div className="prose">
      <h1 className="capitalize">Blog | {slug}</h1>
      <BlogCategory />
      <ContentList data={allBlogs} prefix="/landing/blog" />
    </div>
  );
}
