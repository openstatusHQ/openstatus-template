const randomizer = Math.random() * 50;

export const regionPercentile = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(
    new Date().setMinutes(new Date().getMinutes() - i)
  ).toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
  }),
  latency: Math.floor(Math.random() * randomizer) * 100,
})).map((item, i) => ({
  ...item,
  // TODO: improve this
  p50: item.latency * 0.5,
  p75: item.latency * 0.75,
  p90: item.latency * 0.9,
  p95: item.latency * 0.95,
  p99: item.latency * 0.99,
  // REMINDER: for error bars
  error: [4, 5, 6].includes(i) ? 1 : undefined,
}));

export type RegionPercentile = (typeof regionPercentile)[number];
