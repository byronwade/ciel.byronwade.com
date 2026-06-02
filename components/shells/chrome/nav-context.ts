import {
  LayoutDashboard,
  FolderKanban,
  Activity,
  BarChart3,
  CreditCard,
  Users,
  Bell,
  Plug,
  LifeBuoy,
  Rocket,
  Eye,
  GitBranch,
  ScrollText,
  Globe,
  Variable,
  Hammer,
  Shield,
  Wallet,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { mockProjects } from "@/lib/mock";

export interface NavEntry {
  label: string;
  href: string;
  icon: LucideIcon;
}

export type ChromeKind = "workspace" | "project";

export interface ChromeContext {
  kind: ChromeKind;
  projectId?: string;
  /** Title shown in launcher panel + identity (workspace or project name). */
  title: string;
  subtitle: string;
  /** Full navigation for this context (used in the launcher browse panel). */
  nav: NavEntry[];
  /** Curated subset that fits in the horizontal floating dock. */
  primary: NavEntry[];
}

const workspaceNav: NavEntry[] = [
  { label: "Overview", href: "/app/overview", icon: LayoutDashboard },
  { label: "Projects", href: "/app/projects", icon: FolderKanban },
  { label: "Activity", href: "/app/activity", icon: Activity },
  { label: "Usage", href: "/app/usage", icon: BarChart3 },
  { label: "Billing", href: "/app/billing", icon: CreditCard },
  { label: "Team", href: "/app/team/members", icon: Users },
  { label: "Alerts", href: "/app/alerts", icon: Bell },
  { label: "Integrations", href: "/app/integrations", icon: Plug },
  { label: "Support", href: "/app/support", icon: LifeBuoy },
];

const workspacePrimary = ["Overview", "Projects", "Usage", "Team", "Activity"];

function projectNav(id: string): NavEntry[] {
  return [
    { label: "Overview", href: `/app/projects/${id}/overview`, icon: LayoutDashboard },
    { label: "Deployments", href: `/app/projects/${id}/deployments`, icon: Rocket },
    { label: "Previews", href: `/app/projects/${id}/previews`, icon: Eye },
    { label: "Branches", href: `/app/projects/${id}/branches`, icon: GitBranch },
    { label: "Logs", href: `/app/projects/${id}/logs`, icon: ScrollText },
    { label: "Analytics", href: `/app/projects/${id}/analytics`, icon: BarChart3 },
    { label: "Domains", href: `/app/projects/${id}/domains`, icon: Globe },
    { label: "Environment", href: `/app/projects/${id}/environment/production`, icon: Variable },
    { label: "Build", href: `/app/projects/${id}/build`, icon: Hammer },
    { label: "Protection", href: `/app/projects/${id}/protection`, icon: Shield },
    { label: "Spend", href: `/app/projects/${id}/spend`, icon: Wallet },
    { label: "Activity", href: `/app/projects/${id}/activity`, icon: Activity },
    { label: "Settings", href: `/app/projects/${id}/settings/general`, icon: Settings },
  ];
}

const projectPrimary = ["Overview", "Deployments", "Previews", "Domains", "Analytics"];

function pick(nav: NavEntry[], labels: string[]): NavEntry[] {
  return labels
    .map((l) => nav.find((n) => n.label === l))
    .filter((n): n is NavEntry => Boolean(n));
}

/** Resolve the active chrome context from the pathname (project vs workspace). */
export function resolveChrome(pathname: string): ChromeContext {
  const parts = pathname.split("/").filter(Boolean); // e.g. ["app","projects","proj_docs","overview"]
  const inProject =
    parts[0] === "app" && parts[1] === "projects" && parts[2] && parts[2] !== "new";

  if (inProject) {
    const id = parts[2];
    const project = mockProjects.find((p) => p.id === id);
    const nav = projectNav(id);
    return {
      kind: "project",
      projectId: id,
      title: project?.name ?? "Project",
      subtitle: "Project",
      nav,
      primary: pick(nav, projectPrimary),
    };
  }

  return {
    kind: "workspace",
    title: "Acme Corp",
    subtitle: "Workspace",
    nav: workspaceNav,
    primary: pick(workspaceNav, workspacePrimary),
  };
}

/** Active-state matcher for nav entries. */
export function isNavActive(href: string, pathname: string): boolean {
  // Environment entry points at /environment/production; match the section.
  const base = href.replace(/\/(production|preview|staging)$/, "");
  return pathname === href || pathname === base || pathname.startsWith(base + "/");
}
