import { MarketingPage, ChangelogEntry } from "@/components/marketing/marketing-page";

export default function ChangelogPage() {
  return (
    <MarketingPage title="Changelog" description="What's new in Ciel.">
      <ChangelogEntry version="0.4.0" date="June 1, 2026" items={["Traffic attribution charts on usage and spend pages", "Hierarchical budgets at workspace, project, and environment level", "Parsed build failure summaries with fix deep-links"]} />
      <ChangelogEntry version="0.3.0" date="May 15, 2026" items={["Passkey-first authentication", "Preview protection modes: password, team, link-only", "Import wizard for Vercel, Netlify, and Render"]} />
      <ChangelogEntry version="0.2.0" date="May 1, 2026" items={["DNS concierge with registrar-aware instructions", "Route-backed dialogs for deep-linkable overlays", "Unified event stream for logs and activity"]} />
      <ChangelogEntry version="0.1.0" date="April 15, 2026" items={["Initial public beta", "Git-connected deploys with preview environments", "Custom domains with automatic SSL"]} />
    </MarketingPage>
  );
}
