import { getProductPages } from "@/content/utils";

const products = getProductPages();

export const links = [
  {
    label: "Resources",
    items: [
      {
        label: "Monitoring",
        href: "/",
      },
      {
        label: "Status Page",
        href: "/status-page",
      },
      {
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        label: "Developer",
        href: "/landing",
      },
      {
        label: "Blog",
        href: "/landing/blog",
      },
    ],
  },
  {
    label: "Products",
    items: products.map((product) => ({
      label: product.metadata.title,
      href: `/landing/${product.slug}`,
    })),
  },
  {
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
    ],
  },
  {
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
  },
];
