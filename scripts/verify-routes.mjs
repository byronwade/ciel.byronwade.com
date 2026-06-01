import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..", "app");

const REQUIRED_ROUTES = [
  "app/(workspace)/import",
  "app/(workspace)/design-system",
  "app/projects/[project]/overview",
  "app/projects/[project]/deployments/[deployment]",
  "auth/login",
  "auth/logout",
  "(marketing)",
  "(marketing)/compare/[competitor]",
  "(marketing)/docs/[slug]",
];

function findPages(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...findPages(full, rel));
      continue;
    }

    if (entry.name === "page.tsx") {
      pages.push(rel.replace(/\/page\.tsx$/, ""));
    }
  }

  return pages;
}

const pages = findPages(appDir);
const missing = REQUIRED_ROUTES.filter((route) => !pages.includes(route));

const minRoutes = 85;

console.log(`Found ${pages.length} routes`);

if (pages.length < minRoutes) {
  console.error(`Expected at least ${minRoutes} routes, found ${pages.length}`);
  process.exit(1);
}

if (missing.length > 0) {
  console.error("Missing required routes:");
  missing.forEach((r) => console.error(`  - ${r}`));
  process.exit(1);
}

console.log("Route verification passed.");
