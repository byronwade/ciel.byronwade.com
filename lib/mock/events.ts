import type { CielEvent } from "@/types";

export const mockEvents: CielEvent[] = [
  { id: "evt_1", type: "build", message: "Build failed: VITE_API_URL is not defined", timestamp: "2026-06-01T09:16:00Z", projectId: "proj_dashboard", actor: "Jordan Lee" },
  { id: "evt_2", type: "billing", message: "Budget threshold reached: 82% of project cap", timestamp: "2026-06-01T08:45:00Z", projectId: "proj_docs" },
  { id: "evt_3", type: "dns", message: "TXT record missing for docs.acme.com", timestamp: "2026-06-01T09:30:00Z", projectId: "proj_docs" },
  { id: "evt_4", type: "security", message: "Secret DATABASE_URL accessed by deployment", timestamp: "2026-06-01T08:00:00Z", projectId: "proj_marketing", actor: "System" },
  { id: "evt_5", type: "activity", message: "Deployment promoted to production", timestamp: "2026-06-01T10:30:00Z", projectId: "proj_marketing", actor: "Alex Chen" },
  { id: "evt_6", type: "runtime", message: "High bot traffic detected on /api/search", timestamp: "2026-05-31T22:00:00Z", projectId: "proj_marketing" },
];

export async function getEvents(projectId?: string): Promise<CielEvent[]> {
  if (projectId) return mockEvents.filter((e) => e.projectId === projectId);
  return mockEvents;
}
