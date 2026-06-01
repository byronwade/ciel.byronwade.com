import Link from "next/link";
import { PageHeader, StatusPill, BudgetMeter, WarningBanner, BudgetPausedBanner } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProject, getDeployments, getPreviews, getDomains } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const [deployments, previews, domains] = await Promise.all([
    getDeployments(id),
    getPreviews(id),
    getDomains(id),
  ]);

  const latestDeploy = deployments[0];
  const budgetPct = (project.budgetUsed / project.budgetCap) * 100;

  return (
    <div>
      <PageHeader
        title={project.name}
        scope={`Project · ${project.framework}`}
        state={
          project.status === "paused"
            ? "Production paused — budget cap"
            : project.status === "ready"
              ? "Production healthy"
              : project.status === "failing"
                ? "Build failing"
                : "Needs attention"
        }
        nextAction={{ label: "Deploy", href: `#` }}
      />

      {project.status === "paused" && (
        <BudgetPausedBanner projectName={project.name} resumeHref={`?dialog=resume-project`} />
      )}

      {budgetPct >= 80 && project.status !== "paused" && (
        <WarningBanner title="Budget at 82%" message="Review spend breakdown." actionLabel="View spend" actionHref={`/app/projects/${id}/spend`} />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Production</CardTitle></CardHeader>
          <CardContent>
            {latestDeploy ? (
              <>
                <StatusPill status={latestDeploy.status} />
                <div className="text-xs text-muted-foreground mt-2">{latestDeploy.commitMessage}</div>
                <Button size="sm" variant="outline" className="mt-2" asChild>
                  <Link href={`/app/projects/${id}/deployments/${latestDeploy.id}`}>View</Link>
                </Button>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">No deployments yet</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Open previews</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2">
            {previews.slice(0, 3).map((p) => (
              <Link key={p.id} href={`/app/projects/${id}/previews/${p.id}`} className="flex items-center justify-between text-sm hover:bg-muted rounded px-2 py-1">
                <span className="truncate">{p.branch}</span>
                <StatusPill status={p.status} />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Budget</CardTitle></CardHeader>
          <CardContent>
            <BudgetMeter used={project.budgetUsed} cap={project.budgetCap} mode={project.budgetMode} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle className="text-sm">Post-deploy checklist</CardTitle></CardHeader>
        <CardContent className="text-sm flex flex-col gap-2">
          {[
            { label: "Verify custom domain", done: domains.some((d) => d.verified), href: `/app/projects/${id}/domains` },
            { label: "Set project budget", done: false, href: `/app/projects/${id}/spend?dialog=set-budget` },
            { label: "Invite reviewer", done: false, href: `/app/projects/${id}/collaborators` },
            { label: "Create passkey", done: false, href: "/auth/passkey-upgrade" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-2 hover:underline">
              <span className={item.done ? "text-emerald-600" : "text-muted-foreground"}>{item.done ? "✓" : "○"}</span>
              {item.label}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
