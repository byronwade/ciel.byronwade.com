import type { TeamMember, AuthorizedApp } from "@/types";

export const mockTeamMembers: TeamMember[] = [
  { id: "tm_1", name: "Alex Chen", email: "alex@acme.com", role: "owner", mfaEnabled: true, lastActive: "2026-06-01T10:00:00Z" },
  { id: "tm_2", name: "Jordan Lee", email: "jordan@acme.com", role: "developer", mfaEnabled: true, lastActive: "2026-06-01T09:30:00Z" },
  { id: "tm_3", name: "Sam Rivera", email: "sam@acme.com", role: "developer", mfaEnabled: false, lastActive: "2026-05-30T16:00:00Z" },
  { id: "tm_4", name: "Casey Morgan", email: "casey@acme.com", role: "viewer", mfaEnabled: false, lastActive: "2026-05-28T12:00:00Z" },
];

export const mockAuthorizedApps: AuthorizedApp[] = [
  { id: "app_1", name: "GitHub", scopes: ["repo:read", "repo:write", "webhook:manage"], authorizedAt: "2026-01-15T00:00:00Z", lastUsed: "2026-06-01T11:00:00Z" },
  { id: "app_2", name: "Slack Notifications", scopes: ["deploy:notify", "alert:read"], authorizedAt: "2026-03-01T00:00:00Z", lastUsed: "2026-05-31T18:00:00Z" },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  return mockTeamMembers;
}

export async function getAuthorizedApps(): Promise<AuthorizedApp[]> {
  return mockAuthorizedApps;
}
