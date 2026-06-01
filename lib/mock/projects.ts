import type { Project } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "proj_marketing",
    name: "Marketing Site",
    slug: "marketing-site",
    framework: "Next.js",
    repo: "acme/marketing-site",
    branch: "main",
    status: "ready",
    productionUrl: "https://acme.com",
    budgetCap: 150,
    budgetUsed: 82,
    budgetMode: "grace_buffer",
    lastDeployedAt: "2026-06-01T10:30:00Z",
    domainCount: 2,
    previewCount: 3,
  },
  {
    id: "proj_docs",
    name: "Documentation",
    slug: "docs",
    framework: "Astro",
    repo: "acme/docs",
    branch: "main",
    status: "paused",
    productionUrl: "https://docs.acme.com",
    budgetCap: 100,
    budgetUsed: 100,
    budgetMode: "hard_stop",
    lastDeployedAt: "2026-05-31T18:00:00Z",
    domainCount: 1,
    previewCount: 5,
  },
  {
    id: "proj_dashboard",
    name: "Admin Dashboard",
    slug: "admin-dashboard",
    framework: "React (Vite)",
    repo: "acme/admin-dashboard",
    branch: "develop",
    status: "failing",
    productionUrl: "https://admin.acme.com",
    budgetCap: 200,
    budgetUsed: 45,
    budgetMode: "auto_scale",
    lastDeployedAt: "2026-05-30T14:22:00Z",
    domainCount: 1,
    previewCount: 2,
  },
];

export async function getProjects(): Promise<Project[]> {
  return mockProjects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  return mockProjects.find((p) => p.id === id);
}
