import { MarketingHeader } from "@/components/shells/marketing-header";
import { MarketingFooter } from "@/components/shells/marketing-footer";
import { TrustBanner } from "@/components/ciel/trust-banner";
import { getActiveIncidents } from "@/lib/mock";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const incidents = await getActiveIncidents();

  return (
    <>
      {incidents.map((inc) => (
        <TrustBanner
          key={inc.id}
          title={inc.title}
          message={inc.updates[inc.updates.length - 1]?.message ?? ""}
          href="/status"
        />
      ))}
      <MarketingHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</main>
      <MarketingFooter />
    </>
  );
}
