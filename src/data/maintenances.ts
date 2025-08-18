export const maintenances = [
  {
    id: 1,
    title: "DB Migration",
    message:
      "We are currently performing a db migration on our system and will be down for a few hours.",
    startDate: new Date("2025-04-01 12:00:00"),
    endDate: new Date("2025-04-01 15:00:00"),
    affected: ["OpenStatus API"],
  },
  {
    id: 2,
    title: "System Upgrade",
    message:
      "We will be upgrading our core infrastructure to improve performance and reliability. Service interruptions may occur.",
    startDate: new Date("2025-03-01 11:00:00"),
    endDate: new Date("2025-03-01 15:30:00"),
    affected: ["OpenStatus API", "OpenStatus Web"],
  },
];

export type Maintenance = (typeof maintenances)[number];
