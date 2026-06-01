import { PageHeader, WarningBanner } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const alerts = [
  { title: "Budget at 82%", message: "Docs project approaching cap", href: "/app/projects/proj_docs/spend", severity: "warning" },
  { title: "Build failed", message: "admin-dashboard feature/auth-refactor", href: "/app/projects/proj_dashboard/deployments/dep_2", severity: "error" },
  { title: "DNS pending", message: "docs.acme.com awaiting TXT record", href: "/app/projects/proj_docs/domains", severity: "warning" },
  { title: "MFA not enabled", message: "Sam Rivera has not set up two-factor auth", href: "/app/team/security", severity: "info" },
];

export default function AlertsPage() {
  return (
    <div>
      <PageHeader title="Alerts" description="Active warnings requiring attention" />
      <div className="flex flex-col gap-3">
        {alerts.map((a) => (
          <Link key={a.title} href={a.href}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{a.message}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
