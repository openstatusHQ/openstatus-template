export const statusReports = [
  {
    id: 1,
    name: "Downtime API",
    startedAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01"),
    status: "operational",
    updates: [
      {
        id: 2,
        status: "operational" as const,
        message:
          "Everything is under control, we continue to monitor the situation.",
        date: new Date("2021-01-01"),
      },
      {
        id: 1,
        status: "investigating" as const,
        message:
          "Our hosting provider Vercel is having an increase of 400 errors. We are aware of the dependency and will be working on a solution to reduce the risk. Follow more on vercel-status.",
        date: new Date("2021-01-01"),
      },
    ],
    affected: ["OpenStatus API"],
  },
];

export type StatusReport = (typeof statusReports)[number];
