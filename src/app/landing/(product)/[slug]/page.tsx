import { CustomMDX } from "@/content/mdx";
import { getProducts } from "@/content/utils";

import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProducts().find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="prose">
      <h1>{product.metadata.title}</h1>
      <p className="text-lg">{product.metadata.summary}</p>
      <CustomMDX source={product.content} />
    </section>
  );
}
