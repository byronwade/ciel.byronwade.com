import Link from "next/link";
import { PageHeader, UnifiedEventTable } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { getEvents, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function ProjectLogsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, events] = await Promise.all([getProject(id), getEvents(id)]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Logs" scope={project.name} description="Unified build, runtime, and activity events" />
      <Card>
        <CardContent className="pt-6">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">No logs match current filters. Try expanding the time range.</p>
          ) : (
            <UnifiedEventTable events={events} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
