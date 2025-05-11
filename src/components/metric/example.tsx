import {
  MetricCard,
  MetricCardBadge,
  MetricCardGroup,
  MetricCardTitle,
  MetricCardValue,
} from "./metric-card";

const metrics = [
  {
    label: "UPTIME",
    value: "99.99%",
    trend: 1.01,
  },
  {
    label: "FAILS",
    value: "1",
    trend: 2,
  },
  {
    label: "DEGRADED",
    value: "0",
    trend: 0,
  },
  {
    label: "INCIDENTS",
    value: "0",
    trend: null,
  },
  {
    label: "TOTAL PINGS",
    value: "8,639",
    trend: null,
  },
  {
    label: "P50",
    value: "150ms",
    trend: 2,
  },
  {
    label: "P75",
    value: "274ms",
    trend: 1,
  },
  {
    label: "P90",
    value: "397ms",
    trend: 0.5,
  },
  {
    label: "P95",
    value: "447ms",
    trend: 0.24,
  },
  {
    label: "P99",
    value: "1,062ms",
    trend: 1.4,
  },
];

export function MetricExample() {
  return (
    <MetricCardGroup>
      {metrics.map((metric) => (
        <MetricCard key={metric.label}>
          <MetricCardTitle>{metric.label}</MetricCardTitle>
          <div className="flex flex-row items-center gap-2">
            <MetricCardValue>{metric.value}</MetricCardValue>
            {metric.trend ? <MetricCardBadge value={metric.trend} /> : null}
          </div>
        </MetricCard>
      ))}
    </MetricCardGroup>
  );
}
