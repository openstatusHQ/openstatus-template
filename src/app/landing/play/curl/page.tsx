import { getToolsPage } from "@/content/utils";
import { CustomMDX } from "@/content/mdx";
import { CurlBuilderProvider, Form } from "./client";

export default function Page() {
  const page = getToolsPage("curl");
  return (
    <section className="prose">
      <h1>{page.metadata.title}</h1>
      <p className="text-lg">{page.metadata.summary}</p>
      <CurlBuilderProvider>
        <Form />
      </CurlBuilderProvider>
      <CustomMDX source={page.content} />
    </section>
  );
}
