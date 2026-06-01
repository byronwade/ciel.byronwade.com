import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, "..");

const routes = [
  // Marketing
  ["app/(marketing)/page.tsx", "Landing"],
  ["app/(marketing)/pricing/page.tsx", "Pricing"],
  ["app/(marketing)/pricing/calculator/page.tsx", "Pricing Calculator"],
  ["app/(marketing)/compare/page.tsx", "Compare"],
  ["app/(marketing)/compare/vercel/page.tsx", "Compare Vercel"],
  ["app/(marketing)/compare/netlify/page.tsx", "Compare Netlify"],
  ["app/(marketing)/compare/railway/page.tsx", "Compare Railway"],
  ["app/(marketing)/compare/render/page.tsx", "Compare Render"],
  ["app/(marketing)/compare/cloudflare/page.tsx", "Compare Cloudflare"],
  ["app/(marketing)/self-host/page.tsx", "Self Host"],
  ["app/(marketing)/docs/page.tsx", "Docs"],
  ["app/(marketing)/docs/getting-started/page.tsx", "Getting Started"],
  ["app/(marketing)/docs/import-from-vercel/page.tsx", "Import from Vercel"],
  ["app/(marketing)/docs/import-from-netlify/page.tsx", "Import from Netlify"],
  ["app/(marketing)/docs/cli/page.tsx", "CLI"],
  ["app/(marketing)/docs/domains/page.tsx", "Domains Docs"],
  ["app/(marketing)/docs/preview-protection/page.tsx", "Preview Protection"],
  ["app/(marketing)/docs/pricing/page.tsx", "Pricing Docs"],
  ["app/(marketing)/docs/security/page.tsx", "Security Docs"],
  ["app/(marketing)/docs/incident-playbooks/page.tsx", "Incident Playbooks"],
  ["app/(marketing)/templates/page.tsx", "Templates"],
  ["app/(marketing)/customers/page.tsx", "Customers"],
  ["app/(marketing)/changelog/page.tsx", "Changelog"],
  ["app/(marketing)/roadmap/page.tsx", "Roadmap"],
  ["app/(marketing)/status/page.tsx", "Status"],
  ["app/(marketing)/status/history/page.tsx", "Status History"],
  ["app/(marketing)/security/page.tsx", "Security"],
  ["app/(marketing)/security/trust-center/page.tsx", "Trust Center"],
  ["app/(marketing)/security/incident-history/page.tsx", "Incident History"],
  ["app/(marketing)/contact-sales/page.tsx", "Contact Sales"],
  ["app/(marketing)/contact/page.tsx", "Contact"],
  ["app/(marketing)/terms/page.tsx", "Terms"],
  ["app/(marketing)/privacy/page.tsx", "Privacy"],
  ["app/(marketing)/fair-use/page.tsx", "Fair Use"],
  // Auth
  ["app/auth/login/page.tsx", "Login"],
  ["app/auth/signup/page.tsx", "Signup"],
  ["app/auth/check-email/page.tsx", "Check Email"],
  ["app/auth/verify-email/page.tsx", "Verify Email"],
  ["app/auth/verify-code/page.tsx", "Verify Code"],
  ["app/auth/forgot-password/page.tsx", "Forgot Password"],
  ["app/auth/reset-password/page.tsx", "Reset Password"],
  ["app/auth/passkey-upgrade/page.tsx", "Passkey Upgrade"],
  ["app/auth/mfa/setup/page.tsx", "MFA Setup"],
  ["app/auth/mfa/challenge/page.tsx", "MFA Challenge"],
  ["app/auth/mfa/recovery/page.tsx", "MFA Recovery"],
  ["app/auth/recovery-codes/page.tsx", "Recovery Codes"],
  ["app/auth/sso/page.tsx", "SSO"],
  ["app/auth/invite/accept/page.tsx", "Accept Invite"],
  ["app/auth/device-approval/page.tsx", "Device Approval"],
  ["app/auth/re-auth/page.tsx", "Re-authentication"],
  // Workspace app
  ["app/app/overview/page.tsx", "Workspace Overview"],
  ["app/app/projects/page.tsx", "Projects"],
  ["app/app/projects/new/source/page.tsx", "New Project Source"],
  ["app/app/projects/new/repository/page.tsx", "New Project Repository"],
  ["app/app/projects/new/framework/page.tsx", "New Project Framework"],
  ["app/app/projects/new/environment/page.tsx", "New Project Environment"],
  ["app/app/projects/new/domain/page.tsx", "New Project Domain"],
  ["app/app/projects/new/review/page.tsx", "New Project Review"],
  ["app/app/import/vercel/page.tsx", "Import Vercel"],
  ["app/app/import/netlify/page.tsx", "Import Netlify"],
  ["app/app/import/render/page.tsx", "Import Render"],
  ["app/app/activity/page.tsx", "Activity"],
  ["app/app/usage/page.tsx", "Usage"],
  ["app/app/billing/page.tsx", "Billing"],
  ["app/app/team/members/page.tsx", "Team Members"],
  ["app/app/team/invites/page.tsx", "Team Invites"],
  ["app/app/team/roles/page.tsx", "Team Roles"],
  ["app/app/team/apps/page.tsx", "Team Apps"],
  ["app/app/team/security/page.tsx", "Team Security"],
  ["app/app/team/sessions/page.tsx", "Team Sessions"],
  ["app/app/alerts/page.tsx", "Alerts"],
  ["app/app/notifications/page.tsx", "Notifications"],
  ["app/app/integrations/page.tsx", "Integrations"],
  ["app/app/settings/profile/page.tsx", "Profile Settings"],
  ["app/app/settings/preferences/page.tsx", "Preferences"],
  ["app/app/settings/api-tokens/page.tsx", "API Tokens"],
  ["app/app/support/page.tsx", "Support"],
  ["app/app/status/page.tsx", "App Status"],
  ["app/app/design-system/page.tsx", "Design System"],
  // Project routes - use dynamic segments
  ["app/app/projects/[project]/overview/page.tsx", "Project Overview"],
  ["app/app/projects/[project]/deployments/page.tsx", "Deployments"],
  ["app/app/projects/[project]/deployments/[deployment]/page.tsx", "Deployment Detail"],
  ["app/app/projects/[project]/previews/page.tsx", "Previews"],
  ["app/app/projects/[project]/previews/[preview]/page.tsx", "Preview Detail"],
  ["app/app/projects/[project]/branches/page.tsx", "Branches"],
  ["app/app/projects/[project]/logs/page.tsx", "Logs"],
  ["app/app/projects/[project]/analytics/page.tsx", "Analytics"],
  ["app/app/projects/[project]/assets/page.tsx", "Assets"],
  ["app/app/projects/[project]/domains/page.tsx", "Domains"],
  ["app/app/projects/[project]/domains/[domain]/page.tsx", "Domain Detail"],
  ["app/app/projects/[project]/dns/page.tsx", "DNS"],
  ["app/app/projects/[project]/environment/[target]/page.tsx", "Environment"],
  ["app/app/projects/[project]/build/page.tsx", "Build"],
  ["app/app/projects/[project]/cache/page.tsx", "Cache"],
  ["app/app/projects/[project]/routing/page.tsx", "Routing"],
  ["app/app/projects/[project]/protection/page.tsx", "Protection"],
  ["app/app/projects/[project]/spend/page.tsx", "Spend"],
  ["app/app/projects/[project]/activity/page.tsx", "Project Activity"],
  ["app/app/projects/[project]/collaborators/page.tsx", "Collaborators"],
  ["app/app/projects/[project]/git/page.tsx", "Git"],
  ["app/app/projects/[project]/exports/page.tsx", "Exports"],
  ["app/app/projects/[project]/settings/general/page.tsx", "General Settings"],
  ["app/app/projects/[project]/settings/retention/page.tsx", "Retention Settings"],
  ["app/app/projects/[project]/settings/danger/page.tsx", "Danger Settings"],
];

function makePage(title, isClient = false) {
  const directive = isClient ? `"use client";\n\n` : "";
  return `${directive}import { PageHeader } from "@/components/ciel";

export default function Page() {
  return (
    <div>
      <PageHeader title="${title}" description="Ciel — ${title.toLowerCase()}" />
      <p className="text-sm text-muted-foreground">${title} content.</p>
    </div>
  );
}
`;
}

for (const [route, title] of routes) {
  const filePath = path.join(root, route);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, makePage(title));
  }
}

// Redirect pages
const redirects = [
  ["app/login/page.tsx", "/auth/login"],
  ["app/signup/page.tsx", "/auth/signup"],
];

for (const [route, dest] of redirects) {
  const filePath = path.join(root, route);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    `import { redirect } from "next/navigation";
export default function Page() { redirect("${dest}"); }
`
  );
}

console.log(`Scaffolded ${routes.length} routes`);
