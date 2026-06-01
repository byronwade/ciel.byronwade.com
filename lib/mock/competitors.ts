import type { CompetitorComparison } from "@/types";

export const mockCompetitors: CompetitorComparison[] = [
  {
    slug: "vercel",
    name: "Vercel",
    tagline: "Predictable costs without metered surprises",
    strengths: ["Excellent Next.js integration", "Fast global CDN", "Preview deployments"],
    weaknesses: ["Metered bandwidth can spike unexpectedly", "Seat pricing adds up", "Security features gated behind higher tiers"],
    migrationSteps: ["Export project settings via Ciel import", "Connect same Git repo", "Map environment variables", "Update DNS records", "Verify SSL"],
    concerns: [
      { question: "Will I lose preview URLs?", answer: "No. Ciel generates equivalent preview URLs on every branch push." },
      { question: "What about my custom domains?", answer: "Add the same domains in Ciel and update DNS. We guide you record-by-record." },
    ],
  },
  {
    slug: "netlify",
    name: "Netlify",
    tagline: "Team-wide usage caps that actually isolate projects",
    strengths: ["Simple static deploys", "Form handling", "Split testing"],
    weaknesses: ["Team-wide usage limits", "Build minute overages", "Lock-in concerns as costs rise"],
    migrationSteps: ["Import Netlify config via Ciel wizard", "Connect Git provider", "Review env var mapping", "Switch DNS"],
    concerns: [
      { question: "Can I import my netlify.toml?", answer: "Yes. Ciel parses build settings and redirects automatically." },
    ],
  },
  {
    slug: "railway",
    name: "Railway",
    tagline: "Frontend-focused without full-stack complexity",
    strengths: ["Simple pricing", "Good developer experience", "PR environments"],
    weaknesses: ["Hard limits can take workloads offline", "Logs could be clearer", "Broader platform scope adds complexity"],
    migrationSteps: ["Export Railway service config", "Create Ciel project from same repo", "Map environment variables"],
    concerns: [
      { question: "I use Railway for backend too", answer: "Ciel focuses on frontend. Keep Railway for backend services and use Ciel for static/SPA shipping." },
    ],
  },
  {
    slug: "render",
    name: "Render",
    tagline: "Explicit bandwidth budgeting per project",
    strengths: ["Clear service sizing", "Auto-deploy from Git", "Free SSL"],
    weaknesses: ["Bandwidth billed separately", "Build pipeline minute limits", "Static site logs limited"],
    migrationSteps: ["Connect same Git repo", "Import build settings", "Configure domains", "Set project budget"],
    concerns: [
      { question: "What about my Render YAML?", answer: "Ciel imports build commands and output directories from render.yaml." },
    ],
  },
  {
    slug: "cloudflare",
    name: "Cloudflare Pages",
    tagline: "Zero egress fees with full cost attribution",
    strengths: ["No egress charges", "Global network", "Workers integration"],
    weaknesses: ["Build configuration less intuitive", "Preview protection limited", "Analytics less detailed"],
    migrationSteps: ["Connect Git repo", "Configure build settings", "Map custom domains", "Set up preview protection"],
    concerns: [
      { question: "How does Ciel compare on bandwidth?", answer: "Ciel shows exactly what drives your bill — human, bot, cached, preview — so there are no mysteries." },
    ],
  },
];

export async function getCompetitor(slug: string): Promise<CompetitorComparison | undefined> {
  return mockCompetitors.find((c) => c.slug === slug);
}

export async function getCompetitors(): Promise<CompetitorComparison[]> {
  return mockCompetitors;
}
