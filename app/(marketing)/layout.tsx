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
  const primary = incidents[0];
  const extra = incidents.length - 1;

  return (
    <>
      {primary && (
        <TrustBanner
          title={extra > 0 ? `${incidents.length} active incidents` : primary.title}
          message={
            extra > 0
              ? `Latest: ${primary.title}. View all on the status page.`
              : primary.updates[primary.updates.length - 1]?.message ?? ""
          }
          href="/status"
        />
      )}
      <MarketingHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</main>
      <MarketingFooter />
    </>
  );
}
