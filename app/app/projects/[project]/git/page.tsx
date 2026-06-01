import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function GitPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Git" scope={project.name} />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-mono">{project.repo}</CardTitle>
            <StatusPill status="ready" label="Connected" />
          </div>
        </CardHeader>
        <CardContent className="text-sm flex flex-col gap-3">
          <div className="flex justify-between"><span>Provider</span><span>GitHub</span></div>
          <div className="flex justify-between"><span>Production branch</span><span className="font-mono">{project.branch}</span></div>
          <div className="flex justify-between"><span>Auto-deploy</span><span>Enabled</span></div>
          <Button variant="outline" size="sm" className="w-fit" asChild>
            <Link href="?dialog=connect-git-provider">Reconnect</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
