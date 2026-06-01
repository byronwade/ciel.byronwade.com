import { MarketingPage, LegalSection } from "@/components/marketing/marketing-page";

export default function TermsPage() {
  return (
    <MarketingPage title="Terms of Service">
      <LegalSection title="Acceptance">By using Ciel, you agree to these terms and our Privacy Policy.</LegalSection>
      <LegalSection title="Service">Ciel provides frontend deployment hosting with usage-based billing. We reserve the right to modify features with reasonable notice.</LegalSection>
      <LegalSection title="Acceptable use">You may not use Ciel to distribute malware, send spam, or violate applicable laws. We may suspend accounts that violate our Fair Use policy.</LegalSection>
      <LegalSection title="Billing">Plans renew monthly. Usage beyond included allowances is billed per our pricing page. You may set hard caps to prevent overages.</LegalSection>
      <LegalSection title="Limitation of liability">Ciel is provided as-is. Our liability is limited to fees paid in the preceding 12 months.</LegalSection>
    </MarketingPage>
  );
}
