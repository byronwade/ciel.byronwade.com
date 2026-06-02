import { mockProjects } from "@/lib/mock";

export interface Crumb {
  label: string;
  href: string;
}

function labelize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Build the breadcrumb trail for an /app/* pathname. */
export function resolveTrail(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "app") return [];

  const crumbs: Crumb[] = [{ label: "App", href: "/app/overview" }];

  if (parts[1] === "projects") {
    crumbs.push({ label: "Projects", href: "/app/projects" });
    if (parts[2] === "new") {
      crumbs.push({ label: "New Project", href: "/app/projects/new/source" });
      if (parts[3]) crumbs.push({ label: labelize(parts[3]), href: pathname });
    } else if (parts[2]) {
      const project = mockProjects.find((p) => p.id === parts[2]);
      crumbs.push({
        label: project?.name ?? parts[2],
        href: `/app/projects/${parts[2]}/overview`,
      });
      if (parts[3]) {
        crumbs.push({
          label: labelize(parts[3]),
          href: `/app/projects/${parts[2]}/${parts[3]}`,
        });
      }
      if (parts[4]) crumbs.push({ label: labelize(parts[4]), href: pathname });
    }
  } else if (parts[1]) {
    crumbs.push({ label: labelize(parts[1]), href: `/app/${parts[1]}` });
    if (parts[2]) crumbs.push({ label: labelize(parts[2]), href: pathname });
  }

  return crumbs;
}
