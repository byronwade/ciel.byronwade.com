import type { Incident } from "@/types";

export const mockIncidents: Incident[] = [
  {
    id: "inc_1",
    title: "Elevated domain verification delays",
    status: "monitoring",
    impact: "minor",
    startedAt: "2026-06-01T08:00:00Z",
    updates: [
      { timestamp: "2026-06-01T08:00:00Z", message: "We are investigating delays in DNS verification for custom domains." },
      { timestamp: "2026-06-01T09:00:00Z", message: "Root cause identified: upstream DNS propagation delays. Retries are queued." },
      { timestamp: "2026-06-01T10:00:00Z", message: "Verification times returning to normal. Monitoring continues." },
    ],
  },
];

export const mockIncidentHistory: Incident[] = [
  ...mockIncidents,
  {
    id: "inc_0",
    title: "Build queue slowdown",
    status: "resolved",
    impact: "minor",
    startedAt: "2026-05-20T14:00:00Z",
    resolvedAt: "2026-05-20T16:30:00Z",
    updates: [
      { timestamp: "2026-05-20T14:00:00Z", message: "Build queue experiencing elevated wait times." },
      { timestamp: "2026-05-20T16:30:00Z", message: "Resolved. Additional build workers provisioned." },
    ],
  },
];

export async function getActiveIncidents(): Promise<Incident[]> {
  return mockIncidents.filter((i) => i.status !== "resolved");
}

export async function getIncidentHistory(): Promise<Incident[]> {
  return mockIncidentHistory;
}
