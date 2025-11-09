import { getProducts } from "@/content/utils";

const products = getProducts();

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
];
