import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = [
  { name: "Owner", desc: "Full workspace access including billing and deletion", count: 1 },
  { name: "Admin", desc: "Manage team, projects, and settings. Cannot delete workspace.", count: 0 },
  { name: "Developer", desc: "Deploy, manage env vars, and configure projects", count: 2 },
  { name: "Viewer", desc: "Read-only access to deployments, logs, and analytics", count: 1 },
];

export default function TeamRolesPage() {
  return (
    <div>
      <PageHeader title="Roles" scope="Team" />
      <div className="grid gap-3">
        {roles.map((r) => (
          <Card key={r.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{r.name}</CardTitle>
                <span className="text-xs text-muted-foreground">{r.count} members</span>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{r.desc}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
