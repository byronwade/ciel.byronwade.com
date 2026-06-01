import { PageHeader, BudgetMeter, TrafficAttributionChart, BudgetPausedBanner } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProject, getTrafficAttribution } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function SpendPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, traffic] = await Promise.all([getProject(id), getTrafficAttribution()]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader
        title="Spend & Usage"
        scope={project.name}
        nextAction={{ label: "Set Budget", href: "?dialog=set-budget" }}
      />

      {project.status === "paused" && (
        <BudgetPausedBanner projectName={project.name} resumeHref="?dialog=resume-project" />
      )}

      <Tabs defaultValue="production">
        <TabsList>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="staging">Staging</TabsTrigger>
        </TabsList>
        <TabsContent value="production" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Production budget</CardTitle></CardHeader>
            <CardContent>
              <BudgetMeter used={project.budgetUsed} cap={project.budgetCap} mode={project.budgetMode} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Preview environment cap: $25/mo · Used: $12.40
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="staging" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Staging environment cap: $10/mo · Used: $0
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="mt-4">
        <CardHeader><CardTitle className="text-sm">Traffic attribution</CardTitle></CardHeader>
        <CardContent>
          <TrafficAttributionChart data={traffic} />
        </CardContent>
      </Card>
    </div>
  );
}
