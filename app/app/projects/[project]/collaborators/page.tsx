import { PageHeader } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject, getTeamMembers } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function CollaboratorsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, members] = await Promise.all([getProject(id), getTeamMembers()]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Collaborators" scope={project.name} nextAction={{ label: "Add collaborator", href: "?dialog=invite-member" }} />
      <div className="flex flex-col gap-2">
        {members.map((m) => (
          <Card key={m.id}>
            <CardContent className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.email}</div>
              </div>
              <Badge variant="outline" className="capitalize">{m.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
