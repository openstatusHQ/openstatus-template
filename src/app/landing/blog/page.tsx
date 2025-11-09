import { getBlogPosts } from "@/content/utils";
import { ContentList } from "../content-list";
import { BlogCategory } from "./category";

export default function BlogListPage() {
  const allBlogs = getBlogPosts();
  return (
    <div className="prose">
      <h1>Blog</h1>
      <BlogCategory />
      <ContentList data={allBlogs} prefix="/landing/blog" />
    </div>
  );
}
