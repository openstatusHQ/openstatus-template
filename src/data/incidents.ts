export const incidents = [
  {
    id: 1,
    startedAt: new Date("2025-05-05 12:00:00"),
    resolvedAt: new Date("2025-05-05 14:00:00"),
    duration: "2 hour",
    monitor: "OpenStatus API",
    cause: "Status 404",
    message: `
The deployment could not be found on Vercel.
DEPLOYMENT_NOT_FOUND
    `,
  },
];

export type Incident = (typeof incidents)[number];
