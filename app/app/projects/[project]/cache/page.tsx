import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function CachePage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Cache" scope={project.name} />
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-sm">Build cache</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between"><span>node_modules cache</span><span className="text-muted-foreground">847 MB</span></div>
          <div className="flex justify-between"><span>Framework cache</span><span className="text-muted-foreground">124 MB</span></div>
          <div className="flex justify-between"><span>Last hit</span><span className="text-muted-foreground">98% on last build</span></div>
          <Button variant="outline" size="sm" className="w-fit mt-2">Purge cache</Button>
        </CardContent>
      </Card>
    </div>
  );
}
