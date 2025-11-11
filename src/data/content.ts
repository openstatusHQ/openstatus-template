import { getComparePages, getProductPages } from "@/content/utils";

const products = getProductPages();

const productsSection = {
  label: "Products",
  items: products.map((product) => ({
    label: product.metadata.title,
    href: `/landing/${product.slug}`,
  })),
};

const resourcesSection = {
  label: "Resources",
  items: [
    {
      label: "Blog",
      href: "/landing/blog",
    },
    {
      label: "Pricing",
      href: "/landing/pricing",
    },
    {
      label: "Docs",
      href: "https://docs.openstatus.dev",
    },
    {
      label: "External Status",
      href: "/landing/external-status",
    },
    {
      label: "OSS Friends",
      href: "/landing/oss-friends",
    },
  ],
};

const companySection = {
  label: "Company",
  items: [
    {
      label: "About",
      href: "/landing/about",
    },
    {
      label: "Changelog",
      href: "/landing/changelog",
    },
    {
      label: "I'm an LLM",
      href: "https://www.openstatus.dev/llms.txt",
    },
    {
      label: "Terms",
      href: "/landing/terms",
    },
    {
      label: "Privacy",
      href: "/landing/privacy",
    },
  ],
};

const compareSection = {
  label: "Compare",
  items: getComparePages().map((page) => ({
    label: page.metadata.title,
    href: `/landing/compare/${page.slug}`,
  })),
};

const toolsSection = {
  label: "Tools",
  items: [
    {
      label: "Global Speed Checker",
      href: "https://openstatus.dev/play/checker",
    },
    {
      label: "Uptime SLA Calculator",
      href: "https://openstatus.dev/play/uptime-sla",
    },
    {
      label: "cURL Builder",
      href: "https://openstatus.dev/play/curl",
    },
    {
      label: "Theme Explorer",
      href: "https://themes.openstatus.dev",
    },
    {
      label: "All Status Codes",
      href: "https://openstat.us",
    },
    {
      label: "Vercel Edge Ping",
      href: "https://light.openstatus.dev",
    },
  ],
};

const communitySection = {
  label: "Community",
  items: [
    {
      label: "Discord",
      href: "https://openstatus.dev/discord",
    },
    {
      label: "GitHub",
      href: "https://openstatus.dev/github",
    },
    {
      label: "X",
      href: "https://openstatus.dev/x",
    },
    {
      label: "BlueSky",
      href: "https://openstatus.dev/bluesky",
    },
    {
      label: "YouTube",
      href: "https://openstatus.dev/youtube",
    },
    {
      label: "LinkedIn",
      href: "https://openstatus.dev/linkedin",
    },
  ],
};

export const headerLinks = [productsSection, resourcesSection];

export const footerLinks = [
  productsSection,
  resourcesSection,
  companySection,
  compareSection,
  toolsSection,
  communitySection,
];
