import { PageHeader, PermissionScopeChip } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { getAuthorizedApps } from "@/lib/mock";

const migrationProviders = [
  { name: "Vercel", href: "/app/import/vercel" },
  { name: "Netlify", href: "/app/import/netlify" },
  { name: "Render", href: "/app/import/render" },
];

export default async function IntegrationsPage() {
  const apps = await getAuthorizedApps();

  return (
    <div>
      <PageHeader title="Integrations" nextAction={{ label: "Browse all", href: "#integrations" }} />
      <Card className="mb-6" id="integrations">
        <CardHeader>
          <CardTitle className="text-sm">Platform migration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {migrationProviders.map((p) => (
            <LinkButton key={p.href} href={p.href} variant="outline" size="sm">
              Import from {p.name}
            </LinkButton>
          ))}
          <LinkButton href="/app/import" variant="ghost" size="sm">
            View all import options
          </LinkButton>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {apps.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <CardTitle className="text-base">{app.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <PermissionScopeChip scopes={app.scopes} />
              <p className="text-xs text-muted-foreground">Last used {app.lastUsed ? new Date(app.lastUsed).toLocaleDateString() : "never"}</p>
              <LinkButton href="/app/team/apps?dialog=revoke-app" variant="outline" size="sm" className="w-fit">
                Configure
              </LinkButton>
            </CardContent>
          </Card>
        ))}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Connect Slack, Linear, or custom webhooks</p>
            <LinkButton href="/app/support" variant="outline" size="sm">
              Request integration
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
