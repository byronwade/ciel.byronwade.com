import Link from "next/link";
import { PageHeader, StatusPill, BudgetMeter, EmptyState } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/mock";

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div>
        <PageHeader title="Projects" />
        <EmptyState
          title="No projects yet"
          description="Create your first project to connect a repository and start deploying."
          actionLabel="Create Project"
          actionHref="/app/projects/new/source"
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        nextAction={{ label: "Create Project", href: "/app/projects/new/source" }}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  <Link href={`/app/projects/${p.id}/overview`} className="hover:underline">{p.name}</Link>
                </CardTitle>
                <StatusPill status={p.status} />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="text-xs text-muted-foreground">{p.framework} · {p.repo}</div>
              <BudgetMeter used={p.budgetUsed} cap={p.budgetCap} compact />
              <div className="text-xs text-muted-foreground">
                {p.domainCount} domains · {p.previewCount} previews
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
