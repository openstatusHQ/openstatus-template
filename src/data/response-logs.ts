export const responseLogs = [
  {
    id: 1,
    url: "https://api.openstatus.dev",
    status: "200",
    latency: 150,
    timing: {
      dns: 10,
      connect: 20,
      tls: 30,
      ttfb: 40,
      transfer: 50,
    },
    assertions: [],
    region: "ams" as const,
    error: false,
    timestamp: new Date().getTime(),
    headers: {
      "Cache-Control":
        "private, no-cache, no-store, max-age=0, must-revalidate",
      "Content-Type": "text/html; charset=utf-8",
      Date: "Sun, 28 Jan 2024 08:50:13 GMT",
      Server: "Vercel",
    },
    type: "scheduled" as const,
  },
];

export type ResponseLog = (typeof responseLogs)[number];
export type Timing = ResponseLog["timing"];
