import type { Metadata } from "next";

export const TITLE = "OpenStatus Template";
export const DESCRIPTION =
  "We've created this template to help you get started with your @shadcn/ui project. It uses @nextjs in an SPA mode and can be exported statically (BYO router).";

export const defaultMetadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  metadataBase: new URL("https://template.openstatus.dev"),
};

export const twitterMetadata: Metadata["twitter"] = {
  title: TITLE,
  description: DESCRIPTION,
  card: "summary_large_image",
};

export const ogMetadata: Metadata["openGraph"] = {
  title: TITLE,
  description: DESCRIPTION,
  type: "website",
};
