import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function ExportsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Export" scope={project.name} description="Portable config export — no lock-in by design" />
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-sm">Export package</CardTitle></CardHeader>
        <CardContent className="text-sm flex flex-col gap-3">
          <p className="text-muted-foreground">Download a portable JSON config including build settings, environment variable keys, domain mappings, and redirect rules.</p>
          <ul className="list-disc pl-5 text-muted-foreground flex flex-col gap-1">
            <li>Build & framework settings</li>
            <li>Environment variable names (not values)</li>
            <li>Domain and routing config</li>
            <li>Redirect and header rules</li>
          </ul>
          <Button variant="outline" size="sm" className="w-fit">Download config.json</Button>
        </CardContent>
      </Card>
    </div>
  );
}
