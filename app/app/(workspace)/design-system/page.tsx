import {
  StatusPill,
  BudgetMeter,
  EmptyState,
  WarningBanner,
  PageHeader,
  BudgetPausedBanner,
  TrafficAttributionChart,
  DeploymentTimeline,
  ParsedIssueCard,
  SecretRow,
  DnsRecordCard,
  PermissionScopeChip,
  PreviewAccessCard,
  UnifiedEventTable,
} from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDeployments, mockEvents, mockPreviews, mockSecrets, mockTrafficAttribution } from "@/lib/mock";

export default function DesignSystemPage() {
  const deployment = mockDeployments[0];
  const failingDeployment = mockDeployments[1];
  const secret = mockSecrets[0];
  const preview = mockPreviews[0];
  const events = mockEvents.slice(0, 4);
  const parsedIssue = failingDeployment.parsedIssues?.[0];

  return (
    <div>
      <PageHeader title="Design System" description="Ciel component library reference for product UI" />
      <div className="grid gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm">Status Pills</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {(["ready", "warning", "failing", "paused", "protected", "building", "queued"] as const).map((s) => (
              <StatusPill key={s} status={s} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Budget Meter</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <BudgetMeter used={82} cap={100} mode="grace_buffer" />
            <BudgetMeter used={100} cap={100} mode="hard_stop" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Budget Paused Banner</CardTitle></CardHeader>
          <CardContent>
            <BudgetPausedBanner projectName="Docs Site" resumeHref="?dialog=resume-project" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Warning Banner</CardTitle></CardHeader>
          <CardContent>
            <WarningBanner title="Budget approaching cap" message="Review traffic attribution." actionLabel="View spend" actionHref="/app/usage" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Empty State</CardTitle></CardHeader>
          <CardContent>
            <EmptyState title="No projects yet" description="Create your first project to start deploying." actionLabel="Create Project" actionHref="/app/projects/new/source" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Deployment Timeline</CardTitle></CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Successful build</p>
              <DeploymentTimeline phases={deployment.phases} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Failed build</p>
              <DeploymentTimeline phases={failingDeployment.phases} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Parsed Issue Card</CardTitle></CardHeader>
          <CardContent>
            {parsedIssue && <ParsedIssueCard issue={parsedIssue} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Traffic Attribution Chart</CardTitle></CardHeader>
          <CardContent>
            <TrafficAttributionChart data={mockTrafficAttribution} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Secret Row</CardTitle></CardHeader>
          <CardContent>
            <SecretRow secret={secret} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">DNS Record Card</CardTitle></CardHeader>
          <CardContent>
            <DnsRecordCard record={{ type: "CNAME", name: "docs", value: "ciel-dns.ciel.app", status: "found" }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Permission Scope Chip</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <PermissionScopeChip scopes={["read:deployments", "write:env", "read:logs"]} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Preview Access Card</CardTitle></CardHeader>
          <CardContent className="max-w-md">
            <PreviewAccessCard preview={preview} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Unified Event Table</CardTitle></CardHeader>
          <CardContent>
            <UnifiedEventTable events={events} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
