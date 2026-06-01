import type { Deployment } from "@/types";

export const mockDeployments: Deployment[] = [
  {
    id: "dep_1",
    projectId: "proj_marketing",
    status: "ready",
    environment: "production",
    branch: "main",
    commit: "a1b2c3d",
    commitMessage: "Update hero section copy",
    author: "Alex Chen",
    url: "https://acme.com",
    createdAt: "2026-06-01T10:30:00Z",
    duration: 142,
    phases: [
      { name: "Queued", status: "ready", duration: 3 },
      { name: "Clone", status: "ready", duration: 8 },
      { name: "Build", status: "ready", duration: 98 },
      { name: "Upload", status: "ready", duration: 22 },
      { name: "Route Verify", status: "ready", duration: 11 },
    ],
  },
  {
    id: "dep_2",
    projectId: "proj_dashboard",
    status: "failing",
    environment: "preview",
    branch: "feature/auth-refactor",
    commit: "e4f5g6h",
    commitMessage: "Refactor auth middleware",
    author: "Jordan Lee",
    url: "https://feature-auth-refactor-proj-dashboard.ciel.app",
    createdAt: "2026-06-01T09:15:00Z",
    duration: 67,
    phases: [
      { name: "Queued", status: "ready", duration: 2 },
      { name: "Clone", status: "ready", duration: 6 },
      { name: "Build", status: "failing", duration: 59 },
    ],
    parsedIssues: [
      {
        title: "Missing environment variable",
        description: "Build failed because VITE_API_URL is not defined.",
        likelyCause: "The variable exists in production but not in preview environment.",
        fixAction: "Add VITE_API_URL to preview environment",
        fixHref: "/app/projects/proj_dashboard/environment/preview",
        severity: "error",
      },
    ],
    logs: `[10:15:02] Cloning repository acme/admin-dashboard...
[10:15:08] Installing dependencies...
[10:15:45] Running build: vite build
[10:16:12] ERROR: VITE_API_URL is not defined
[10:16:12] Build failed with exit code 1`,
  },
  {
    id: "dep_3",
    projectId: "proj_docs",
    status: "building",
    environment: "preview",
    branch: "docs/api-v2",
    commit: "i7j8k9l",
    commitMessage: "Add API v2 documentation",
    author: "Sam Rivera",
    url: "https://docs-api-v2-proj-docs.ciel.app",
    createdAt: "2026-06-01T11:00:00Z",
    phases: [
      { name: "Queued", status: "ready", duration: 1 },
      { name: "Clone", status: "ready", duration: 5 },
      { name: "Build", status: "building" },
    ],
  },
  {
    id: "dep_4",
    projectId: "proj_marketing",
    status: "queued",
    environment: "preview",
    branch: "fix/mobile-nav",
    commit: "m0n1o2p",
    commitMessage: "Fix mobile navigation overflow",
    author: "Alex Chen",
    url: "https://fix-mobile-nav-proj-marketing.ciel.app",
    createdAt: "2026-06-01T11:05:00Z",
    phases: [{ name: "Queued", status: "queued" }],
  },
];

export async function getDeployments(projectId?: string): Promise<Deployment[]> {
  if (projectId) return mockDeployments.filter((d) => d.projectId === projectId);
  return mockDeployments;
}

export async function getDeployment(id: string): Promise<Deployment | undefined> {
  return mockDeployments.find((d) => d.id === id);
}
