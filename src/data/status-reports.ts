export const statusReports = [
  {
    id: 1,
    name: "Downtime API",
    startedAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01"),
    status: "operational",
    updates: 4,
    affected: ["OpenStatus API"],
  },
];

export type StatusReport = (typeof statusReports)[number];
