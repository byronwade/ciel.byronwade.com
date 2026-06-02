import type { MetadataRoute } from "next";
import { compareSlugs, docsNav } from "@/lib/routes";

const BASE = "https://ciel.byronwade.com";

// Public, indexable marketing routes only. The /app and /auth route groups are
// noindex (see their layouts) and intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "/",
    "/pricing",
    "/pricing/calculator",
    "/compare",
    "/docs",
    "/security",
    "/security/trust-center",
    "/security/incident-history",
    "/status",
    "/status/history",
    "/changelog",
    "/roadmap",
    "/customers",
    "/templates",
    "/self-host",
    "/contact",
    "/contact-sales",
    "/privacy",
    "/terms",
    "/fair-use",
  ];

  const comparePaths = compareSlugs.map((slug) => `/compare/${slug}`);
  const docPaths = docsNav.map((d) => d.href);

  const priorityFor = (path: string) => {
    if (path === "/") return 1;
    if (path === "/pricing" || path === "/compare" || path === "/docs") return 0.8;
    return 0.6;
  };

  return [...staticPaths, ...comparePaths, ...docPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));
}
