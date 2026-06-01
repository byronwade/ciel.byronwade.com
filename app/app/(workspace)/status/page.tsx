import { PageHeader, StatusPill } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveIncidents } from "@/lib/mock";
import Link from "next/link";

export default async function AppStatusPage() {
  const incidents = await getActiveIncidents();

  return (
    <div>
      <PageHeader title="Platform Status" />
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <StatusPill status={incidents.length ? "warning" : "ready"} label={incidents.length ? "Degraded" : "All systems operational"} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incidents.map((inc) => (
            <div key={inc.id} className="text-sm mb-2">{inc.title}: {inc.updates.at(-1)?.message}</div>
          ))}
          <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">View public status page →</Link>
        </CardContent>
      </Card>
    </div>
  );
}
