import Link from "next/link";
import { PageHeader, Sparkline } from "@/components/ciel";
import { Gauge, scoreTone } from "@/components/ui/gauge";
import { StatusDot } from "@/components/ui/status-dot";
import { DeltaPill } from "@/components/metric-stat";
import { getActiveIncidents, getSystemHealth } from "@/lib/mock";

const toneToStatusTone = {
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

export default async function AppStatusPage() {
  const [incidents, health] = await Promise.all([getActiveIncidents(), getSystemHealth()]);
  const hasIncidents = incidents.length > 0;
  const score = hasIncidents ? Math.min(health.score, 86) : health.score;
  const gaugeTone = scoreTone(score);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Platform Status" description="Live health across regions and services." />

      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-6 shadow-card">
          <Gauge value={score} label="health score" tone={gaugeTone} size={140} thickness={10} />
          <span className="mt-3 inline-flex items-center gap-2 text-sm">
            <StatusDot tone={gaugeTone} pulse />
            {hasIncidents ? "Some systems degraded" : "All systems operational"}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {health.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border bg-card p-4 shadow-card">
              <div className="text-sm text-muted-foreground">{m.label}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xl font-semibold tracking-tight tabular-nums">{m.value}</span>
                <DeltaPill delta={{ value: m.delta.value, direction: m.deltaGood ? "up" : "down" }} />
              </div>
              <Sparkline data={m.series} tone={toneToStatusTone[m.tone]} width={180} height={32} className="mt-2 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Regions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {health.regions.map((r) => (
          <div key={r.id} className="rounded-xl border bg-card p-3 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <StatusDot tone={toneToStatusTone[r.tone]} />
                {r.label}
              </span>
              <span className="font-mono text-xs tabular-nums">{r.latencyMs}ms</span>
            </div>
            <Sparkline data={r.series} tone={toneToStatusTone[r.tone]} width={160} height={32} className="mt-3 w-full" />
          </div>
        ))}
      </div>

      {hasIncidents && (
        <div className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="text-sm font-semibold tracking-tight">Active incidents</h2>
          <div className="mt-4 flex flex-col divide-y">
            {incidents.map((inc) => (
              <div key={inc.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <StatusDot tone={inc.impact === "critical" || inc.impact === "major" ? "danger" : "warning"} />
                  <span className="text-sm font-medium">{inc.title}</span>
                  <span className="ml-auto font-mono text-xs uppercase text-muted-foreground">{inc.status}</span>
                </div>
                <p className="pl-4 text-sm text-muted-foreground">{inc.updates.at(-1)?.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
        View public status page →
      </Link>
    </div>
  );
}
