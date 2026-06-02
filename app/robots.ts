import type { MetadataRoute } from "next";

const BASE = "https://ciel.byronwade.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Authenticated app and transient auth flows should not be indexed.
        disallow: ["/app/", "/auth/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
