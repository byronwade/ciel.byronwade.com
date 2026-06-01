import { PageHeader, UnifiedEventTable } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { getProject, getEvents } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function ProjectActivityPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, events] = await Promise.all([getProject(id), getEvents(id)]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Activity" scope={project.name} nextAction={{ label: "Export", href: "?dialog=export-activity" }} />
      <Card>
        <CardContent className="pt-6">
          <UnifiedEventTable events={events} />
        </CardContent>
      </Card>
    </div>
  );
}
