import {
  CircleMinus,
  Siren,
  Send,
  CircleCheck,
  CircleAlert,
} from "lucide-react";

export const config = {
  "incident.created": {
    icon: Siren,
    color: "text-red-500",
    title: "Incident Created",
  },
  "incident.resolved": {
    icon: CircleCheck,
    color: "text-green-500",
    title: "Incident Resolved",
  },
  "monitor.failed": {
    icon: CircleMinus,
    color: "text-red-500",
    title: "Monitor Failed",
  },
  "notification.sent": {
    icon: Send,
    color: "text-blue-500",
    title: "Notification Sent",
  },
  "monitor.recovered": {
    icon: CircleCheck,
    color: "text-green-500",
    title: "Monitor Recovered",
  },
  "monitor.degraded": {
    icon: CircleAlert,
    color: "text-yellow-500",
    title: "Monitor Degraded",
  },
} as const;
