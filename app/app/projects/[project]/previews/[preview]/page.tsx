import Link from "next/link";
import { PageHeader, StatusPill, PreviewAccessCard } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPreview, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function PreviewDetailPage({
  params,
}: {
  params: Promise<{ project: string; preview: string }>;
}) {
  const { project: projectId, preview: previewId } = await params;
  const [preview, project] = await Promise.all([
    getPreview(previewId),
    getProject(projectId),
  ]);
  if (!preview || !project) notFound();

  return (
    <div>
      <PageHeader
        title={`Preview: ${preview.branch}`}
        scope={project.name}
        state={preview.protection === "public" ? "Publicly accessible" : "Protected"}
        nextAction={{ label: "Share", href: "?dialog=share-preview" }}
      />

      {preview.protection === "public" && (
        <div className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm mb-4">
          This preview is publicly accessible. <Link href={`/app/projects/${projectId}/protection`} className="underline">Enable protection</Link>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm">Comments</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No comments yet. Share this preview with stakeholders.
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-sm">Deployment facts</CardTitle></CardHeader>
          <CardContent className="text-sm flex flex-col gap-2">
            <div className="flex justify-between"><span>Status</span><StatusPill status={preview.status} /></div>
            <div className="flex justify-between"><span>Commit</span><span className="font-mono">{preview.commit.slice(0, 7)}</span></div>
            <div className="flex justify-between"><span>Build</span><span>{preview.buildDuration}s</span></div>
            <Button size="sm" className="mt-2" asChild>
              <Link href={`?dialog=promote-preview`}>Promote to production</Link>
            </Button>
          </CardContent>
        </Card>

        <PreviewAccessCard preview={preview} />
      </div>

      <Card className="mt-4">
        <Tabs defaultValue="logs">
          <CardHeader>
            <TabsList>
              <TabsTrigger value="logs">Build logs</TabsTrigger>
              <TabsTrigger value="diff">Route diff</TabsTrigger>
              <TabsTrigger value="share">Share settings</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="logs"><pre className="text-xs font-mono">Build output for {preview.branch}...</pre></TabsContent>
            <TabsContent value="diff"><Button variant="outline" size="sm" asChild><Link href="?panel=deployment-diff">Open diff panel</Link></Button></TabsContent>
            <TabsContent value="share"><Button variant="outline" size="sm" asChild><Link href="?dialog=share-preview">Configure sharing</Link></Button></TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
