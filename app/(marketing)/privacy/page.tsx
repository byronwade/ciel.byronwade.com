import { MarketingPage, LegalSection } from "@/components/marketing/marketing-page";

export default function PrivacyPage() {
  return (
    <MarketingPage title="Privacy Policy">
      <LegalSection title="Data we collect">Account information (email, name), deployment metadata, usage metrics, and payment information processed by our billing provider.</LegalSection>
      <LegalSection title="How we use it">To provide the service, calculate billing, improve reliability, and communicate about your account.</LegalSection>
      <LegalSection title="Secrets">Environment variables are encrypted at rest. Access is logged and requires step-up authentication to reveal.</LegalSection>
      <LegalSection title="Third parties">We use subprocessors for payment, email, and infrastructure. A full list is available in our Trust Center.</LegalSection>
      <LegalSection title="Your rights">You may export your data, request deletion, and opt out of non-essential communications.</LegalSection>
    </MarketingPage>
  );
}
