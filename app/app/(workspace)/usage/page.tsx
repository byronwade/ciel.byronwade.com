import Link from "next/link";
import { PageHeader, BudgetMeter, TrafficAttributionChart, WarningBanner } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockWorkspace, getTrafficAttribution } from "@/lib/data";

export default async function UsagePage() {
  const traffic = await getTrafficAttribution();
  const budgetPct = Math.round((mockWorkspace.budgetUsed / mockWorkspace.budgetCap) * 100);

  return (
    <div>
      <PageHeader
        title="Usage"
        description="Workspace-level traffic and budget controls"
        scope="Acme Corp"
        nextAction={{ label: "Set Budget", href: "/app/usage?dialog=set-budget" }}
      />
      {budgetPct >= 80 && (
        <div className="mb-4">
          <WarningBanner
          title="Budget approaching cap"
          message={`Workspace is at ${budgetPct}% of the monthly cap. Preview traffic from docs is the primary driver.`}
          actionLabel="Adjust budget"
          actionHref="/app/usage?dialog=set-budget"
          />
        </div>
      )}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attribution">Traffic Attribution</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Workspace budget</CardTitle></CardHeader>
            <CardContent>
              <BudgetMeter used={mockWorkspace.budgetUsed} cap={mockWorkspace.budgetCap} mode={mockWorkspace.budgetMode} />
              <p className="text-sm text-muted-foreground mt-4">
                Mode: Grace buffer — allows 10% overage before pausing affected environments.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attribution" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Traffic breakdown</CardTitle></CardHeader>
            <CardContent>
              <TrafficAttributionChart data={traffic} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forecast" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              At current pace, workspace will reach 95% of cap by June 18. Preview traffic from docs project is the primary driver.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
