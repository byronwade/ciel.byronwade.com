import type { Metadata } from "next";
import { MarketingPage, LegalSection } from "@/components/marketing/marketing-page";

export const metadata: Metadata = {
  title: "Fair Use Policy",
  description: "Acceptable use guidelines for the Ciel platform.",
};

export default function FairUsePage() {
  return (
    <MarketingPage title="Fair Use Policy">
      <LegalSection title="Purpose">Ciel is designed for frontend applications: static sites, SPAs, docs, and dashboards. Reasonable usage keeps the platform fast for everyone.</LegalSection>
      <LegalSection title="Prohibited uses">Cryptocurrency mining, open proxy services, bulk file storage unrelated to web delivery, and intentional bandwidth abuse.</LegalSection>
      <LegalSection title="Bot traffic">Verified crawlers are categorized separately in traffic attribution. Unmitigated bot floods may trigger protective measures or account review.</LegalSection>
      <LegalSection title="Enforcement">We prefer budget caps and alerts over surprise suspensions. Persistent abuse may result in account restriction after written notice.</LegalSection>
    </MarketingPage>
  );
}
