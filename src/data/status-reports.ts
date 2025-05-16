export const statusReports = [
  {
    id: 1,
    name: "Downtime API",
    startedAt: new Date("2025-01-01 12:00:00"),
    updatedAt: new Date("2025-01-01 12:30:00"),
    status: "operational",
    duration: "30 min.",
    updates: [
      {
        id: 2,
        status: "operational" as const,
        message:
          "Everything is under control, we continue to monitor the situation.",
        date: new Date("2025-01-01 12:30:00"),
        updatedAt: new Date("2025-01-01 12:30:00"),
      },
      {
        id: 1,
        status: "investigating" as const,
        message:
          "Our hosting provider Vercel is having an increase of 400 errors. We are aware of the dependency and will be working on a solution to reduce the risk. Follow more on vercel-status.",
        date: new Date("2025-01-01 12:00:00"),
        updatedAt: new Date("2025-01-01 12:00:00"),
      },
    ],
    affected: ["OpenStatus API"],
  },
  {
    id: 2,
    name: "Downtime API",
    startedAt: new Date("2025-01-04 12:10:00"),
    updatedAt: new Date("2025-01-04 12:30:00"),
    status: "operational",
    duration: "20 min.",
    updates: [
      {
        id: 2,
        status: "operational" as const,
        message:
          "Everything is under control, we continue to monitor the situation.",
        date: new Date("2025-01-04 12:30:00"),
        updatedAt: new Date("2025-01-04 12:30:00"),
      },
      {
        id: 1,
        status: "investigating" as const,
        message:
          "Our hosting provider Vercel is having an increase of 400 errors. We are aware of the dependency and will be working on a solution to reduce the risk. Follow more on vercel-status.",
        date: new Date("2025-01-04 12:00:00"),
        updatedAt: new Date("2025-01-04 12:00:00"),
      },
    ],
    affected: ["OpenStatus API"],
  },
];

export type StatusReport = (typeof statusReports)[number];
