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
  {
    id: "prev_4",
    projectId: "proj_storefront",
    branch: "feature/cart-recovery",
    commit: "y4z5a6b",
    commitMessage: "Add abandoned cart recovery banner",
    url: "https://feature-cart-recovery-proj-storefront.ciel.app",
    status: "building",
    protection: "team",
    createdAt: "2026-06-01T11:08:00Z",
    buildDuration: 0,
  },
  {
    id: "prev_5",
    projectId: "proj_storefront",
    branch: "feature/wishlist",
    commit: "d1e2f3g",
    commitMessage: "Introduce wishlist sharing links",
    url: "https://feature-wishlist-proj-storefront.ciel.app",
    status: "ready",
    protection: "link",
    createdAt: "2026-05-31T17:25:00Z",
    buildDuration: 142,
  },
  {
    id: "prev_6",
    projectId: "proj_portal",
    branch: "feature/sso",
    commit: "h4i5j6k",
    commitMessage: "Add SAML SSO login screen",
    url: "https://feature-sso-proj-portal.ciel.app",
    status: "protected",
    protection: "password",
    createdAt: "2026-05-31T12:40:00Z",
    buildDuration: 173,
  },
  {
    id: "prev_7",
    projectId: "proj_landing",
    branch: "feature/countdown",
    commit: "s9t0u1v",
    commitMessage: "Add launch countdown timer",
    url: "https://feature-countdown-proj-landing.ciel.app",
    status: "failing",
    protection: "public",
    createdAt: "2026-05-31T22:48:00Z",
    buildDuration: 41,
  },
  {
    id: "prev_8",
    projectId: "proj_blog",
    branch: "post/2026-roadmap",
    commit: "w2x3y4z",
    commitMessage: "Publish 2026 roadmap post",
    url: "https://post-2026-roadmap-proj-blog.ciel.app",
    status: "queued",
    protection: "team",
    createdAt: "2026-06-01T11:12:00Z",
    buildDuration: 0,
  },
];

export async function getPreviews(projectId?: string): Promise<Preview[]> {
  if (projectId) return mockPreviews.filter((p) => p.projectId === projectId);
  return mockPreviews;
}

export async function getPreview(id: string): Promise<Preview | undefined> {
  return mockPreviews.find((p) => p.id === id);
}
