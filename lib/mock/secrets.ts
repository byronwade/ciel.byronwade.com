import type { Secret } from "@/types";

export const mockSecrets: Secret[] = [
  { id: "sec_1", key: "DATABASE_URL", scope: "production", sensitive: true, lastRotated: "2026-05-15T00:00:00Z", lastAccessed: "2026-06-01T08:00:00Z", masked: true },
  { id: "sec_2", key: "API_KEY", scope: "all", sensitive: true, lastRotated: "2026-04-01T00:00:00Z", masked: true },
  { id: "sec_3", key: "VITE_API_URL", scope: "preview", sensitive: false, masked: true },
  { id: "sec_4", key: "NEXT_PUBLIC_SITE_URL", scope: "production", sensitive: false, masked: true },
];

export async function getSecrets(): Promise<Secret[]> {
  return mockSecrets;
}
