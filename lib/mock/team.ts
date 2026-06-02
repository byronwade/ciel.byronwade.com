import type { TeamMember, AuthorizedApp } from "@/types";

export const mockTeamMembers: TeamMember[] = [
  { id: "tm_1", name: "Alex Chen", email: "alex@acme.com", role: "owner", mfaEnabled: true, lastActive: "2026-06-01T10:00:00Z" },
  { id: "tm_2", name: "Jordan Lee", email: "jordan@acme.com", role: "developer", mfaEnabled: true, lastActive: "2026-06-01T09:30:00Z" },
  { id: "tm_3", name: "Sam Rivera", email: "sam@acme.com", role: "developer", mfaEnabled: false, lastActive: "2026-05-30T16:00:00Z" },
  { id: "tm_4", name: "Casey Morgan", email: "casey@acme.com", role: "viewer", mfaEnabled: false, lastActive: "2026-05-28T12:00:00Z" },
  { id: "tm_5", name: "Riley Park", email: "riley@acme.com", role: "admin", mfaEnabled: true, lastActive: "2026-06-01T10:40:00Z" },
  { id: "tm_6", name: "Devon Kim", email: "devon@acme.com", role: "developer", mfaEnabled: false, lastActive: "2026-05-22T08:30:00Z" },
  { id: "tm_7", name: "Morgan Diaz", email: "morgan@contractor.dev", role: "viewer", mfaEnabled: true, lastActive: "2026-05-31T14:10:00Z" },
  { id: "tm_8", name: "Taylor Quinn", email: "taylor@acme.com", role: "developer", mfaEnabled: true, lastActive: "2026-06-01T11:08:00Z" },
];

export const mockAuthorizedApps: AuthorizedApp[] = [
  { id: "app_1", name: "GitHub", scopes: ["repo:read", "repo:write", "webhook:manage"], authorizedAt: "2026-01-15T00:00:00Z", lastUsed: "2026-06-01T11:00:00Z" },
  { id: "app_2", name: "Slack Notifications", scopes: ["deploy:notify", "alert:read"], authorizedAt: "2026-03-01T00:00:00Z", lastUsed: "2026-05-31T18:00:00Z" },
  { id: "app_3", name: "Linear", scopes: ["issue:read", "issue:write"], authorizedAt: "2026-03-18T00:00:00Z", lastUsed: "2026-06-01T09:50:00Z" },
  { id: "app_4", name: "Sentry", scopes: ["error:read", "release:notify"], authorizedAt: "2026-04-22T00:00:00Z", lastUsed: "2026-05-30T21:00:00Z" },
  { id: "app_5", name: "Figma", scopes: ["file:read"], authorizedAt: "2026-05-12T00:00:00Z" },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  return mockTeamMembers;
}

export async function getAuthorizedApps(): Promise<AuthorizedApp[]> {
  return mockAuthorizedApps;
}
