import type { Secret } from "@/types";

export const mockSecrets: Secret[] = [
  { id: "sec_1", key: "DATABASE_URL", scope: "production", sensitive: true, lastRotated: "2026-05-15T00:00:00Z", lastAccessed: "2026-06-01T08:00:00Z", masked: true },
  { id: "sec_2", key: "API_KEY", scope: "all", sensitive: true, lastRotated: "2026-04-01T00:00:00Z", masked: true },
  { id: "sec_3", key: "VITE_API_URL", scope: "preview", sensitive: false, masked: true },
  { id: "sec_4", key: "NEXT_PUBLIC_SITE_URL", scope: "production", sensitive: false, masked: true },
  { id: "sec_5", key: "STRIPE_SECRET_KEY", scope: "production", sensitive: true, lastRotated: "2026-05-28T00:00:00Z", lastAccessed: "2026-06-01T10:45:00Z", masked: true },
  { id: "sec_6", key: "SENTRY_DSN", scope: "all", sensitive: false, lastRotated: "2026-02-10T00:00:00Z", masked: false },
  { id: "sec_7", key: "STAGING_DATABASE_URL", scope: "staging", sensitive: true, lastRotated: "2026-05-01T00:00:00Z", masked: true },
  { id: "sec_8", key: "PREVIEW_FEATURE_FLAGS", scope: "preview", sensitive: false, masked: false },
  { id: "sec_9", key: "REDIS_URL", scope: "production", sensitive: true, masked: true },
];

export async function getSecrets(): Promise<Secret[]> {
  return mockSecrets;
}
