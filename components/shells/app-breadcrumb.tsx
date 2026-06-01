"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { mockProjects } from "@/lib/mock";

function labelize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AppBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] !== "app") return null;

  const crumbs: { label: string; href?: string }[] = [{ label: "App", href: "/app/overview" }];

  if (parts[1] === "projects") {
    crumbs.push({ label: "Projects", href: "/app/projects" });
    if (parts[2] === "new") {
      crumbs.push({ label: "New Project", href: "/app/projects/new/source" });
      if (parts[3]) crumbs.push({ label: labelize(parts[3]) });
    } else if (parts[2]) {
      const project = mockProjects.find((p) => p.id === parts[2]);
      crumbs.push({ label: project?.name ?? parts[2], href: `/app/projects/${parts[2]}/overview` });
      if (parts[3]) crumbs.push({ label: labelize(parts[3]) });
      if (parts[4]) crumbs.push({ label: parts[4] });
    }
  } else {
    crumbs.push({ label: labelize(parts[1]), href: `/app/${parts[1]}` });
    if (parts[2]) crumbs.push({ label: labelize(parts[2]) });
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <span key={crumb.label + i} className="contents">
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {i === crumbs.length - 1 || !crumb.href ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={crumb.href} />}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
