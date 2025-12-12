import Link from "next/link";
import { getChangelogPosts } from "@/content/utils";
import { ContentList } from "../content-list";

export default function ChangelogListPage() {
  const allChangelogs = getChangelogPosts();
  return (
    <div className="prose">
      <h1>Changelog</h1>
      <p>
        Get the{" "}
        <Link
          href="https://www.openstatus.dev/changelog/feed.xml"
          target="_blank"
        >
          RSS feed
        </Link>
      </p>
      <ContentList data={allChangelogs} prefix="/landing/changelog" />
    </div>
  );
}
