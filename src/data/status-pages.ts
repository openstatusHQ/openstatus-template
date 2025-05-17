export const statusPages = [
  {
    id: 1,
    name: "OpenStatus Status",
    description: "See our uptime history and status reports.",
    slug: "status",
    favicon: "https://openstatus.dev/favicon.ico",
    domain: "status.openstatus.dev",
    protected: true,
    showValues: false,
    monitors: [],
  },
];

export type StatusPage = (typeof statusPages)[number];
