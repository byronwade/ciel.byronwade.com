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

export type HealthTone = "success" | "warning" | "danger";

export interface RegionHealth {
  id: string;
  label: string;
  latencyMs: number;
  tone: HealthTone;
  series: number[];
}

export interface HealthMetric {
  label: string;
  value: string;
  delta: { value: string; direction: "up" | "down" | "flat" };
  deltaGood: boolean;
  hint: string;
  series: number[];
  tone: HealthTone;
}

export interface SystemHealth {
  score: number;
  uptime: string;
  regions: RegionHealth[];
  metrics: HealthMetric[];
  /** Per-day incident-free intensity for the activity grid (last ~18 weeks). */
  incidentFreeDays: number[];
  recentEvents: { id: string; message: string; at: string; tone: HealthTone }[];
}

export const mockSystemHealth: SystemHealth = {
  score: 98,
  uptime: "99.98%",
  regions: [
    { id: "us-east-1", label: "us-east-1", latencyMs: 142, tone: "success", series: [120, 134, 128, 140, 132, 145, 138, 142] },
    { id: "eu-west-1", label: "eu-west-1", latencyMs: 119, tone: "success", series: [110, 115, 108, 122, 117, 113, 120, 119] },
    { id: "ap-south-1", label: "ap-south-1", latencyMs: 268, tone: "warning", series: [180, 210, 230, 245, 260, 255, 270, 268] },
    { id: "us-west-2", label: "us-west-2", latencyMs: 98, tone: "success", series: [104, 99, 101, 96, 100, 94, 97, 98] },
    { id: "edge", label: "edge", latencyMs: 41, tone: "success", series: [48, 44, 46, 42, 45, 40, 43, 41] },
  ],
  metrics: [
    { label: "Uptime", value: "99.98%", delta: { value: "0.02%", direction: "up" }, deltaGood: true, hint: "30-day", series: [99.9, 99.92, 99.95, 99.93, 99.97, 99.96, 99.98], tone: "success" },
    { label: "p95 latency", value: "142ms", delta: { value: "8ms", direction: "down" }, deltaGood: true, hint: "last hour", series: [168, 160, 158, 150, 148, 145, 142], tone: "success" },
    { label: "Error rate", value: "0.04%", delta: { value: "0.01%", direction: "down" }, deltaGood: true, hint: "last hour", series: [0.08, 0.07, 0.06, 0.05, 0.05, 0.04, 0.04], tone: "success" },
    { label: "Throughput", value: "3.2k/s", delta: { value: "320", direction: "up" }, deltaGood: true, hint: "requests", series: [2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2], tone: "success" },
  ],
  incidentFreeDays: Array.from({ length: 126 }, (_, i) => {
    // Mostly incident-free (high values); a few dips around past incidents.
    const dips = new Set([34, 35, 78, 112, 113]);
    if (dips.has(i)) return 0;
    return 2 + ((i * 7) % 3);
  }),
  recentEvents: [
    { id: "evt_1", message: "Latency returned to baseline", at: "12m ago", tone: "success" },
    { id: "evt_2", message: "ap-south-1 elevated latency under watch", at: "1h ago", tone: "warning" },
    { id: "evt_3", message: "Edge cache hit ratio recovered", at: "3h ago", tone: "success" },
    { id: "evt_4", message: "Log pipeline upgrade completed", at: "6h ago", tone: "success" },
  ],
};

export async function getSystemHealth(): Promise<SystemHealth> {
  return mockSystemHealth;
}
