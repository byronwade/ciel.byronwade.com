import { StatusPill } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveIncidents, getIncidentHistory } from "@/lib/mock";
import Link from "next/link";

export default async function StatusPage() {
  const incidents = await getActiveIncidents();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">System Status</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <StatusPill status={incidents.length ? "warning" : "ready"} label={incidents.length ? "Degraded" : "All systems operational"} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {incidents.length === 0 ? (
            <p className="text-sm text-muted-foreground">All services are running normally.</p>
          ) : (
            incidents.map((inc) => (
              <div key={inc.id} className="rounded-md border p-4">
                <div className="font-medium">{inc.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{inc.updates[inc.updates.length - 1]?.message}</div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      <Link href="/status/history" className="text-sm text-muted-foreground hover:text-foreground">View incident history →</Link>
    </div>
  );
}
