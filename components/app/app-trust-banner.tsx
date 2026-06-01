import { TrustBanner } from "@/components/ciel/trust-banner";
import { getActiveIncidents } from "@/lib/mock";

export async function AppTrustBanner() {
  const incidents = await getActiveIncidents();
  const active = incidents[0];
  if (!active) return null;

  return (
    <TrustBanner
      title={active.title}
      message={active.updates.at(-1)?.message ?? ""}
      href="/app/status"
    />
  );
}
