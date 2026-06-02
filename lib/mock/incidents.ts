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
  {
    id: "inc_2",
    title: "Build queue backlog in iad1",
    status: "investigating",
    impact: "major",
    startedAt: "2026-06-01T10:30:00Z",
    updates: [
      { timestamp: "2026-06-01T10:30:00Z", message: "We are investigating elevated build wait times in the iad1 region." },
      { timestamp: "2026-06-01T10:55:00Z", message: "Builds are queuing 4-6 minutes longer than normal. Investigation ongoing." },
    ],
  },
  {
    id: "inc_3",
    title: "Edge SSL handshake failures",
    status: "identified",
    impact: "critical",
    startedAt: "2026-06-01T09:40:00Z",
    updates: [
      { timestamp: "2026-06-01T09:40:00Z", message: "Some visitors are seeing SSL handshake errors on custom domains." },
      { timestamp: "2026-06-01T10:05:00Z", message: "Root cause identified: a bad certificate bundle rolled out to a subset of edge nodes." },
      { timestamp: "2026-06-01T10:20:00Z", message: "Rolling back the affected bundle across all regions." },
    ],
  },
  {
    id: "inc_4",
    title: "Scheduled maintenance — log pipeline upgrade",
    status: "monitoring",
    impact: "none",
    startedAt: "2026-06-01T06:00:00Z",
    updates: [
      { timestamp: "2026-06-01T06:00:00Z", message: "Scheduled upgrade of the log ingestion pipeline has begun. No customer impact expected." },
      { timestamp: "2026-06-01T07:30:00Z", message: "Upgrade complete. Monitoring log delivery latency." },
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
  {
    id: "inc_5",
    title: "Preview deployments unavailable",
    status: "resolved",
    impact: "major",
    startedAt: "2026-05-14T11:00:00Z",
    resolvedAt: "2026-05-14T12:45:00Z",
    updates: [
      { timestamp: "2026-05-14T11:00:00Z", message: "Preview URLs are returning 503 errors." },
      { timestamp: "2026-05-14T11:40:00Z", message: "Cause identified: preview router lost connection to the build cache." },
      { timestamp: "2026-05-14T12:45:00Z", message: "Resolved. Preview router reconnected and backlog cleared." },
    ],
  },
  {
    id: "inc_6",
    title: "Global dashboard outage",
    status: "resolved",
    impact: "critical",
    startedAt: "2026-04-28T03:10:00Z",
    resolvedAt: "2026-04-28T05:20:00Z",
    updates: [
      { timestamp: "2026-04-28T03:10:00Z", message: "The Ciel dashboard is unreachable for all users." },
      { timestamp: "2026-04-28T03:55:00Z", message: "Identified: a failed config rollout took the API gateway offline." },
      { timestamp: "2026-04-28T05:20:00Z", message: "Resolved. Config reverted and all services restored." },
    ],
  },
];

export async function getActiveIncidents(): Promise<Incident[]> {
  return mockIncidents.filter((i) => i.status !== "resolved");
}

export async function getIncidentHistory(): Promise<Incident[]> {
  return mockIncidentHistory;
}
