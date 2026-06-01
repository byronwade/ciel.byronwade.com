import { PageHeader, PermissionScopeChip } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthorizedApps } from "@/lib/mock";

export default async function TeamAppsPage() {
  const apps = await getAuthorizedApps();

  return (
    <div>
      <PageHeader title="Authorized Apps" scope="Team" description="OAuth apps with access to your workspace" />
      <div className="flex flex-col gap-3">
        {apps.map((app) => (
          <Card key={app.id}>
            <CardContent className="flex items-start justify-between gap-4 py-4">
              <div>
                <div className="font-medium text-sm mb-2">{app.name}</div>
                <PermissionScopeChip scopes={app.scopes} />
                <p className="text-xs text-muted-foreground mt-2">Authorized {new Date(app.authorizedAt).toLocaleDateString()}</p>
              </div>
              <Button variant="outline" size="sm" asChild><a href="?dialog=revoke-app">Revoke</a></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
