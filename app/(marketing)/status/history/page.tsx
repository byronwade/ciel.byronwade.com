import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/ciel";
import { getIncidentHistory } from "@/lib/mock";
import Link from "next/link";

export default async function StatusHistoryPage() {
  const history = await getIncidentHistory();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">← Current status</Link>
      <h1 className="text-3xl font-bold tracking-tight mt-4 mb-8">Incident History</h1>
      <div className="flex flex-col gap-4">
        {history.map((inc) => (
          <Card key={inc.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{inc.title}</CardTitle>
                <StatusPill status={inc.status === "resolved" ? "ready" : "warning"} label={inc.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-3">
                {new Date(inc.startedAt).toLocaleDateString()}
                {inc.resolvedAt && ` — ${new Date(inc.resolvedAt).toLocaleDateString()}`}
              </div>
              {inc.updates.map((u) => (
                <div key={u.timestamp} className="text-sm border-l-2 pl-3 mb-2">
                  <div className="text-xs text-muted-foreground">{new Date(u.timestamp).toLocaleString()}</div>
                  {u.message}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
