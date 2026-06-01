import { PageHeader, TrafficAttributionChart } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject, getTrafficAttribution } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, traffic] = await Promise.all([getProject(id), getTrafficAttribution()]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Analytics" scope={project.name} description="Traffic attribution and performance metrics" />
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        {[
          { label: "Page views", value: "124K" },
          { label: "Unique visitors", value: "38K" },
          { label: "Avg response", value: "42ms" },
        ].map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">{m.label}</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold tabular-nums">{m.value}</div></CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-sm">Traffic attribution</CardTitle></CardHeader>
        <CardContent><TrafficAttributionChart data={traffic} /></CardContent>
      </Card>
    </div>
  );
}
