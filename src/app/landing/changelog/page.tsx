import { getChangelogPosts } from "@/content/utils";
import { ContentList } from "../content-list";

export default function ChangelogListPage() {
  const allChangelogs = getChangelogPosts();
  return (
    <div className="prose">
      <h1>Changelog</h1>
      <ContentList data={allChangelogs} prefix="/landing/changelog" />
    </div>
  );
}
