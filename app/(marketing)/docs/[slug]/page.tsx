import { DocsLayout } from "@/components/marketing/docs-layout";

const docPages: Record<string, { title: string; content: string[] }> = {
  "getting-started": {
    title: "Getting Started",
    content: [
      "Create a Ciel account with email, passkey, or SSO.",
      "Create your workspace and choose your primary goal.",
      "Connect GitHub or GitLab, select a repository, and confirm build settings.",
      "Add environment variables, choose a domain strategy, and deploy.",
    ],
  },
  "import-from-vercel": {
    title: "Import from Vercel",
    content: [
      "Use the Ciel import wizard at /app/import/vercel.",
      "Authenticate with Vercel and select projects to migrate.",
      "Review mapped environment variables, build settings, and domains.",
      "Update DNS records to point to Ciel after verification.",
    ],
  },
  "import-from-netlify": {
    title: "Import from Netlify",
    content: [
      "Ciel parses netlify.toml for build commands, publish directories, and redirects.",
      "Map environment variables and confirm preview branch rules.",
      "Switch DNS with guided record-by-record verification.",
    ],
  },
  cli: {
    title: "CLI",
    content: [
      "Install: npm i -g @ciel/cli",
      "Login: ciel login",
      "Deploy: ciel deploy",
      "Link project: ciel link",
    ],
  },
  domains: {
    title: "Domains",
    content: [
      "Add apex, subdomain, wildcard, or preview subdomain domains.",
      "Ciel detects your DNS provider and shows registrar-specific instructions.",
      "Monitor record-by-record status: found, missing, mismatched, TTL pending.",
      "SSL certificates issue automatically after verification.",
    ],
  },
  "preview-protection": {
    title: "Preview Protection",
    content: [
      "Choose public, password, link-only, or team-only access per preview.",
      "Set expiration for temporary review links.",
      "Share previews with recipients and optional messages.",
    ],
  },
  pricing: {
    title: "Pricing",
    content: [
      "Set workspace, project, and environment-level budgets independently.",
      "Choose hard stop, grace buffer, auto-scale ceiling, or prepaid-only modes.",
      "Review traffic attribution to understand human, bot, crawler, and preview traffic.",
    ],
  },
  security: {
    title: "Security",
    content: [
      "Passkeys are the recommended authentication method.",
      "Secrets are masked by default; reveal requires step-up reauth.",
      "Review authorized apps and their scopes on the team security page.",
      "Activity timeline tracks secret access, deploys, and token changes.",
    ],
  },
  "incident-playbooks": {
    title: "Incident Playbooks",
    content: [
      "Build failure: check parsed issue summary, then raw logs.",
      "Budget pause: review traffic attribution, adjust cap, resume with consequences preview.",
      "Domain broken: check DNS timeline and last known good configuration.",
      "Security concern: rotate affected secrets and review activity timeline.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(docPages).map((slug) => ({ slug }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docPages[slug];
  if (!doc) return null;

  return (
    <DocsLayout activeHref={`/docs/${slug}`}>
      <h1 className="text-2xl font-bold not-prose">{doc.title}</h1>
      <ol className="not-prose mt-6 flex flex-col gap-3 list-decimal pl-5">
        {doc.content.map((item) => (
          <li key={item} className="text-muted-foreground">{item}</li>
        ))}
      </ol>
    </DocsLayout>
  );
}
