export const marketingNav = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", href: "/compare" },
  { label: "Docs", href: "/docs" },
  { label: "Security", href: "/security" },
  { label: "Status", href: "/status" },
] as const;

export const footerNav = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Fair Use", href: "/fair-use" },
  { label: "Contact", href: "/contact" },
  { label: "Changelog", href: "/changelog" },
] as const;

export const compareSlugs = ["vercel", "netlify", "railway", "render", "cloudflare"] as const;

export const docsNav = [
  { label: "Getting Started", href: "/docs/getting-started" },
  { label: "Import from Vercel", href: "/docs/import-from-vercel" },
  { label: "Import from Netlify", href: "/docs/import-from-netlify" },
  { label: "CLI", href: "/docs/cli" },
  { label: "Domains", href: "/docs/domains" },
  { label: "Preview Protection", href: "/docs/preview-protection" },
  { label: "Pricing", href: "/docs/pricing" },
  { label: "Security", href: "/docs/security" },
  { label: "Incident Playbooks", href: "/docs/incident-playbooks" },
] as const;

export const workspaceNav = [
  { label: "Overview", href: "/app/overview", icon: "LayoutDashboard" },
  { label: "Projects", href: "/app/projects", icon: "FolderKanban" },
  { label: "Activity", href: "/app/activity", icon: "Activity" },
  { label: "Usage", href: "/app/usage", icon: "BarChart3" },
  { label: "Billing", href: "/app/billing", icon: "CreditCard" },
  { label: "Team", href: "/app/team/members", icon: "Users" },
  { label: "Alerts", href: "/app/alerts", icon: "Bell" },
  { label: "Integrations", href: "/app/integrations", icon: "Plug" },
  { label: "Support", href: "/app/support", icon: "LifeBuoy" },
] as const;

export const teamNav = [
  { label: "Members", href: "/app/team/members" },
  { label: "Invites", href: "/app/team/invites" },
  { label: "Roles", href: "/app/team/roles" },
  { label: "Apps", href: "/app/team/apps" },
  { label: "Security", href: "/app/team/security" },
  { label: "Sessions", href: "/app/team/sessions" },
] as const;

export const settingsNav = [
  { label: "Profile", href: "/app/settings/profile" },
  { label: "Preferences", href: "/app/settings/preferences" },
  { label: "API Tokens", href: "/app/settings/api-tokens" },
] as const;

export const projectNav = (projectId: string) =>
  [
    { label: "Overview", href: `/app/projects/${projectId}/overview`, icon: "LayoutDashboard" },
    { label: "Deployments", href: `/app/projects/${projectId}/deployments`, icon: "Rocket" },
    { label: "Previews", href: `/app/projects/${projectId}/previews`, icon: "Eye" },
    { label: "Branches", href: `/app/projects/${projectId}/branches`, icon: "GitBranch" },
    { label: "Logs", href: `/app/projects/${projectId}/logs`, icon: "ScrollText" },
    { label: "Analytics", href: `/app/projects/${projectId}/analytics`, icon: "BarChart3" },
    { label: "Domains", href: `/app/projects/${projectId}/domains`, icon: "Globe" },
    { label: "Environment", href: `/app/projects/${projectId}/environment/production`, icon: "Variable" },
    { label: "Build", href: `/app/projects/${projectId}/build`, icon: "Hammer" },
    { label: "Protection", href: `/app/projects/${projectId}/protection`, icon: "Shield" },
    { label: "Spend", href: `/app/projects/${projectId}/spend`, icon: "Wallet" },
    { label: "Activity", href: `/app/projects/${projectId}/activity`, icon: "Activity" },
    { label: "Settings", href: `/app/projects/${projectId}/settings/general`, icon: "Settings" },
  ] as const;

export const projectSettingsNav = (projectId: string) =>
  [
    { label: "General", href: `/app/projects/${projectId}/settings/general` },
    { label: "Retention", href: `/app/projects/${projectId}/settings/retention` },
    { label: "Danger", href: `/app/projects/${projectId}/settings/danger` },
  ] as const;

export const newProjectSteps = [
  { label: "Source", href: "/app/projects/new/source" },
  { label: "Repository", href: "/app/projects/new/repository" },
  { label: "Framework", href: "/app/projects/new/framework" },
  { label: "Environment", href: "/app/projects/new/environment" },
  { label: "Domain", href: "/app/projects/new/domain" },
  { label: "Review", href: "/app/projects/new/review" },
] as const;

export const authRoutes = [
  { label: "Login", href: "/auth/login" },
  { label: "Signup", href: "/auth/signup" },
  { label: "Check Email", href: "/auth/check-email" },
  { label: "Verify Email", href: "/auth/verify-email" },
  { label: "Verify Code", href: "/auth/verify-code" },
  { label: "Forgot Password", href: "/auth/forgot-password" },
  { label: "Reset Password", href: "/auth/reset-password" },
  { label: "Passkey Upgrade", href: "/auth/passkey-upgrade" },
  { label: "MFA Setup", href: "/auth/mfa/setup" },
  { label: "MFA Challenge", href: "/auth/mfa/challenge" },
  { label: "MFA Recovery", href: "/auth/mfa/recovery" },
  { label: "Recovery Codes", href: "/auth/recovery-codes" },
  { label: "SSO", href: "/auth/sso" },
  { label: "Invite Accept", href: "/auth/invite/accept" },
  { label: "Device Approval", href: "/auth/device-approval" },
  { label: "Re-auth", href: "/auth/re-auth" },
] as const;
