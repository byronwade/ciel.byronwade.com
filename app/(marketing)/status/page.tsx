import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, scoreTone } from "@/components/ui/gauge";
import { ActivityGrid } from "@/components/ui/activity-grid";
import { StatusDot } from "@/components/ui/status-dot";
import { Sparkline } from "@/components/ciel";
import { DeltaPill } from "@/components/metric-stat";
import { getActiveIncidents, getSystemHealth } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Status",
  description: "Live operational status of Ciel services and the edge network.",
};

const toneToStatusTone = {
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

export default async function StatusPage() {
  const [incidents, health] = await Promise.all([getActiveIncidents(), getSystemHealth()]);
  const hasIncidents = incidents.length > 0;
  const score = hasIncidents ? Math.min(health.score, 86) : health.score;
  const gaugeTone = scoreTone(score);

  return (
    <div className="relative overflow-hidden">
      <div className="glow-brand pointer-events-none absolute inset-x-0 -top-24 h-72" />
      <div className="relative mx-auto max-w-5xl px-4 py-16">
        {/* Gauge hero */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <StatusDot tone={gaugeTone} pulse />
            System health
          </span>
          <div className="mt-8">
            <Gauge value={score} label="health score" tone={gaugeTone} size={180} thickness={12} />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight">
            {hasIncidents ? "Some systems degraded" : "All systems operational"}
          </h1>
          <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
            Live status across every region and service, refreshed continuously.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-card">
            <StatusDot tone={gaugeTone} />
            {health.uptime} uptime · {incidents.length} active incident{incidents.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Regions */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {health.regions.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card p-3 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <StatusDot tone={toneToStatusTone[r.tone]} />
                  {r.label}
                </span>
                <span className="font-mono text-xs tabular-nums">{r.latencyMs}ms</span>
              </div>
              <Sparkline
                data={r.series}
                tone={toneToStatusTone[r.tone]}
                width={160}
                height={36}
                className="mt-3 w-full"
              />
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {health.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="text-sm text-muted-foreground">{m.label}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-semibold tracking-tight tabular-nums">{m.value}</span>
                <DeltaPill
                  delta={{
                    value: m.delta.value,
                    direction: m.deltaGood ? "up" : "down",
                  }}
                />
              </div>
              <Sparkline
                data={m.series}
                tone={toneToStatusTone[m.tone]}
                width={200}
                height={40}
                className="mt-3 w-full"
              />
              <div className="mt-2 text-xs text-muted-foreground">{m.hint}</div>
            </div>
          ))}
        </div>

        {/* Incident-free grid + recent events */}
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight">Incident-free days</h2>
              <span className="text-xs text-muted-foreground">last 18 weeks</span>
            </div>
            <ActivityGrid data={health.incidentFreeDays} columns={21} className="mt-4" />
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="text-sm font-semibold tracking-tight">Recent events</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {health.recentEvents.map((e) => (
                <li key={e.id} className="flex items-center gap-2.5 text-sm">
                  <StatusDot tone={toneToStatusTone[e.tone]} />
                  <span className="flex-1 text-foreground">{e.message}</span>
                  <span className="font-mono text-xs text-muted-foreground">{e.at}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Active incidents */}
        {hasIncidents && (
          <div className="mt-3 rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="text-sm font-semibold tracking-tight">Active incidents</h2>
            <div className="mt-4 flex flex-col divide-y">
              {incidents.map((inc) => (
                <div key={inc.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <StatusDot tone={inc.impact === "critical" || inc.impact === "major" ? "danger" : "warning"} />
                    <span className="text-sm font-medium">{inc.title}</span>
                    <span className="ml-auto font-mono text-xs uppercase text-muted-foreground">{inc.status}</span>
                  </div>
                  <p className="pl-4 text-sm text-muted-foreground">{inc.updates[inc.updates.length - 1]?.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/status/history" className="text-sm text-muted-foreground hover:text-foreground">
            View incident history →
          </Link>
        </div>
      </div>
    </div>
  );
}
