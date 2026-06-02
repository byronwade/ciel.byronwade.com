import type { CielEvent } from "@/types";

export const mockEvents: CielEvent[] = [
  { id: "evt_1", type: "build", message: "Build failed: VITE_API_URL is not defined", timestamp: "2026-06-01T09:16:00Z", projectId: "proj_dashboard", actor: "Jordan Lee" },
  { id: "evt_2", type: "billing", message: "Budget threshold reached: 82% of project cap", timestamp: "2026-06-01T08:45:00Z", projectId: "proj_docs" },
  { id: "evt_3", type: "dns", message: "TXT record missing for docs.acme.com", timestamp: "2026-06-01T09:30:00Z", projectId: "proj_docs" },
  { id: "evt_4", type: "security", message: "Secret DATABASE_URL accessed by deployment", timestamp: "2026-06-01T08:00:00Z", projectId: "proj_marketing", actor: "System" },
  { id: "evt_5", type: "activity", message: "Deployment promoted to production", timestamp: "2026-06-01T10:30:00Z", projectId: "proj_marketing", actor: "Alex Chen" },
  { id: "evt_6", type: "runtime", message: "High bot traffic detected on /api/search", timestamp: "2026-05-31T22:00:00Z", projectId: "proj_marketing" },
  { id: "evt_7", type: "build", message: "Production build succeeded for Storefront", timestamp: "2026-06-01T11:05:30Z", projectId: "proj_storefront", actor: "Alex Chen", metadata: { duration: "218s", commit: "u1v2w3x" } },
  { id: "evt_8", type: "build", message: "Build failed: Cannot find module 'stripe'", timestamp: "2026-05-31T22:49:00Z", projectId: "proj_landing", actor: "Taylor Quinn" },
  { id: "evt_9", type: "dns", message: "SSL certificate issuance pending for status.acme.com", timestamp: "2026-05-31T20:16:00Z", projectId: "proj_status" },
  { id: "evt_10", type: "billing", message: "Project exceeded budget cap (117%) — grace buffer active", timestamp: "2026-05-31T23:10:00Z", projectId: "proj_landing", metadata: { used: "$140", cap: "$120" } },
  { id: "evt_11", type: "security", message: "Deployment protection enabled (password)", timestamp: "2026-05-31T13:06:00Z", projectId: "proj_portal", actor: "Alex Chen" },
  { id: "evt_12", type: "runtime", message: "p95 latency elevated on /checkout", timestamp: "2026-06-01T10:50:00Z", projectId: "proj_storefront", metadata: { region: "iad1", p95: "820ms" } },
  { id: "evt_13", type: "activity", message: "Riley Park added to the team as admin", timestamp: "2026-05-30T09:15:00Z", projectId: "proj_portal", actor: "Alex Chen" },
  { id: "evt_14", type: "activity", message: "Rolled back production to deployment dep_5", timestamp: "2026-06-01T11:20:00Z", projectId: "proj_storefront", actor: "Jordan Lee", metadata: { from: "dep_6", to: "dep_5" } },
  { id: "evt_15", type: "security", message: "MFA disabled for sam@acme.com", timestamp: "2026-05-30T16:05:00Z", projectId: "proj_dashboard", actor: "System" },
  { id: "evt_16", type: "dns", message: "DNS records still pending for go.acme.com", timestamp: "2026-05-31T22:52:00Z", projectId: "proj_landing" },
];

export async function getEvents(projectId?: string): Promise<CielEvent[]> {
  if (projectId) return mockEvents.filter((e) => e.projectId === projectId);
  return mockEvents;
}
