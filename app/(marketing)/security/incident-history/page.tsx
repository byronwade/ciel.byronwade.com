import Link from "next/link";
import { getIncidentHistory } from "@/lib/mock";
import { StatusPill } from "@/components/ciel";

export default async function SecurityIncidentHistoryPage() {
  const history = await getIncidentHistory();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">← Security</Link>
      <h1 className="text-3xl font-bold tracking-tight mt-4 mb-8">Security Incident History</h1>
      <div className="flex flex-col gap-4">
        {history.map((inc) => (
          <div key={inc.id} className="rounded-md border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{inc.title}</span>
              <StatusPill status={inc.status === "resolved" ? "ready" : "warning"} label={inc.status} />
            </div>
            <p className="text-sm text-muted-foreground">{inc.updates[0]?.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
