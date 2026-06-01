import Link from "next/link";
import { PageHeader, StatusPill, BudgetMeter, WarningBanner, UnifiedEventTable, BudgetPausedBanner } from "@/components/ciel";
import { FirstRunSetup } from "@/components/app/first-run-setup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getProjects,
  getDeployments,
  getDomains,
  getEvents,
  mockWorkspace,
} from "@/lib/mock";

export default async function WorkspaceOverviewPage() {
  const [projects, deployments, domains, events] = await Promise.all([
    getProjects(),
    getDeployments(),
    getDomains(),
    getEvents(),
  ]);

  const failedDeploys = deployments.filter((d) => d.status === "failing");
  const pendingDomains = domains.filter((d) => !d.verified);
  const budgetPct = (mockWorkspace.budgetUsed / mockWorkspace.budgetCap) * 100;

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Workspace operations at a glance"
        scope="Acme Corp"
        nextAction={{ label: "Create Project", href: "/app/projects/new/source" }}
      />

      <FirstRunSetup />

      {projects.filter((p) => p.status === "paused").map((p) => (
        <BudgetPausedBanner key={p.id} projectName={p.name} resumeHref={`/app/projects/${p.id}/spend?dialog=resume-project`} />
      ))}

      {budgetPct >= 75 && budgetPct < 100 && (
        <WarningBanner
          title="Budget at 82%"
          message="Docs project is driving most of the spend this cycle."
          actionLabel="Review usage"
          actionHref="/app/usage"
        />
      )}

      <div className="flex flex-col gap-4 mt-4">
        {failedDeploys.map((d) => (
          <Card key={d.id} className="border-red-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Build failed — {d.branch}</CardTitle>
                <StatusPill status="failing" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{d.parsedIssues?.[0]?.title ?? d.commitMessage}</p>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/app/projects/${d.projectId}/deployments/${d.id}`}>View deployment</Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {pendingDomains.length > 0 && (
          <Card className="border-amber-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{pendingDomains.length} domain(s) awaiting verification</CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/app/projects/${pendingDomains[0].projectId}/domains`}>View domains</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Projects</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2">
              {projects.map((p) => (
                <Link key={p.id} href={`/app/projects/${p.id}/overview`} className="flex items-center justify-between text-sm hover:bg-muted rounded px-2 py-1">
                  <span>{p.name}</span>
                  <StatusPill status={p.status} />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Workspace budget</CardTitle></CardHeader>
            <CardContent>
              <BudgetMeter used={mockWorkspace.budgetUsed} cap={mockWorkspace.budgetCap} mode={mockWorkspace.budgetMode} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Security reminders</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground flex flex-col gap-2">
              <div>1 member without MFA enabled</div>
              <div>2 authorized apps with broad scopes</div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/app/team/security">Review security</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-sm">Recent activity</CardTitle></CardHeader>
          <CardContent>
            <UnifiedEventTable events={events.slice(0, 5)} compact />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
