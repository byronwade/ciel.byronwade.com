import Link from "next/link";
import { PageHeader, StatusPill, ParsedIssueCard, DeploymentTimeline } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDeployment, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function DeploymentDetailPage({
  params,
}: {
  params: Promise<{ project: string; deployment: string }>;
}) {
  const { project: projectId, deployment: deploymentId } = await params;
  const [deployment, project] = await Promise.all([
    getDeployment(deploymentId),
    getProject(projectId),
  ]);
  if (!deployment || !project) notFound();

  return (
    <div>
      <PageHeader
        title={`Deployment ${deployment.commit.slice(0, 7)}`}
        scope={`${project.name} · ${deployment.environment}`}
        state={deployment.status === "failing" ? "Build failed" : deployment.status === "ready" ? "Ready" : deployment.status}
        nextAction={
          deployment.status === "failing"
            ? { label: "Fix and Redeploy", href: `/app/projects/${projectId}/environment/${deployment.environment}` }
            : deployment.environment === "preview"
              ? { label: "Promote", href: `?dialog=promote-preview` }
              : undefined
        }
      />

      {deployment.parsedIssues?.map((issue) => (
        <ParsedIssueCard key={issue.title} issue={issue} />
      ))}

      <div className="grid gap-4 lg:grid-cols-3 mt-4">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-sm">Timeline</CardTitle></CardHeader>
          <CardContent>
            <DeploymentTimeline phases={deployment.phases} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{deployment.commitMessage}</CardTitle>
              <StatusPill status={deployment.status} />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="logs">
              <TabsList>
                <TabsTrigger value="logs">Build logs</TabsTrigger>
                <TabsTrigger value="meta">Metadata</TabsTrigger>
              </TabsList>
              <TabsContent value="logs">
                <pre className="text-xs font-mono bg-muted rounded-md p-4 overflow-x-auto whitespace-pre-wrap max-h-96">
                  {deployment.logs ?? "No logs available for this deployment."}
                </pre>
              </TabsContent>
              <TabsContent value="meta" className="text-sm flex flex-col gap-2">
                <div>Branch: {deployment.branch}</div>
                <div>Author: {deployment.author}</div>
                <div>URL: <a href={deployment.url} className="underline">{deployment.url}</a></div>
                <div>Duration: {deployment.duration ?? "—"}s</div>
              </TabsContent>
            </Tabs>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" asChild>
                <Link href={`?dialog=rollback-deployment`}>Rollback</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`?panel=deployment-diff`}>View diff</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
