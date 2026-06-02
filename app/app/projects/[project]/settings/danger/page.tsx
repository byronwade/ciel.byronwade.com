import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function DangerSettingsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Danger Zone" scope={project.name} />
      <Card className="border-destructive/30">
        <CardHeader><CardTitle className="text-sm text-destructive">Delete project</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Permanently delete {project.name} and all deployments. Export config first.</p>
          <Button variant="destructive" className="w-fit" asChild>
            <a href={`?dialog=delete-project`}>Delete project</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
