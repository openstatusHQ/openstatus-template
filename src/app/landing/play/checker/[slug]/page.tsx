import { getToolsPage } from "@/content/utils";
import { Table } from "./client";

// just random to have one
export async function generateStaticParams() {
  return [{ slug: "1" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getToolsPage("checker");
  console.log({ slug });
  return (
    <section className="prose">
      <h1>{page.metadata.title}</h1>
      <p className="text-lg">{page.metadata.summary}</p>
      <Table />
      <p>
        The data will be stored for 7 days. If you want to persist the data,
        login to your account.
      </p>
      {/* <CustomMDX source={page.content} /> */}
    </section>
  );
}
