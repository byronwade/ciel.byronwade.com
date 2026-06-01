import type { Preview } from "@/types";

export const mockPreviews: Preview[] = [
  {
    id: "prev_1",
    projectId: "proj_marketing",
    branch: "feature/new-pricing",
    commit: "q3r4s5t",
    commitMessage: "Add new pricing page layout",
    url: "https://feature-new-pricing-proj-marketing.ciel.app",
    status: "ready",
    protection: "password",
    createdAt: "2026-05-31T16:00:00Z",
    buildDuration: 128,
  },
  {
    id: "prev_2",
    projectId: "proj_docs",
    branch: "docs/api-v2",
    commit: "i7j8k9l",
    commitMessage: "Add API v2 documentation",
    url: "https://docs-api-v2-proj-docs.ciel.app",
    status: "building",
    protection: "team",
    createdAt: "2026-06-01T11:00:00Z",
    buildDuration: 0,
  },
  {
    id: "prev_3",
    projectId: "proj_dashboard",
    branch: "feature/auth-refactor",
    commit: "e4f5g6h",
    commitMessage: "Refactor auth middleware",
    url: "https://feature-auth-refactor-proj-dashboard.ciel.app",
    status: "failing",
    protection: "public",
    createdAt: "2026-06-01T09:15:00Z",
    buildDuration: 67,
  },
];

export async function getPreviews(projectId?: string): Promise<Preview[]> {
  if (projectId) return mockPreviews.filter((p) => p.projectId === projectId);
  return mockPreviews;
}

export async function getPreview(id: string): Promise<Preview | undefined> {
  return mockPreviews.find((p) => p.id === id);
}
