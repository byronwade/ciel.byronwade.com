import { cn } from "@/lib/utils";
import { StatusPill } from "./status-pill";
import type { DeploymentPhase } from "@/types";

interface DeploymentTimelineProps {
  phases: DeploymentPhase[];
  className?: string;
}

export function DeploymentTimeline({ phases, className }: DeploymentTimelineProps) {
  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {phases.map((phase, i) => (
        <div key={phase.name} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn("size-2 rounded-full mt-1.5", phase.status === "ready" ? "bg-status-ready" : phase.status === "failing" ? "bg-status-failing" : phase.status === "warning" ? "bg-status-warning" : phase.status === "building" ? "bg-sky-500 animate-pulse" : "bg-muted-foreground")} />
            {i < phases.length - 1 && <div className="w-px flex-1 bg-border min-h-6" />}
          </div>
          <div className="flex flex-1 items-start justify-between pb-4">
            <div>
              <div className="text-sm font-medium">{phase.name}</div>
              {phase.duration !== undefined && (
                <div className="text-xs text-muted-foreground tabular-nums">{phase.duration}s</div>
              )}
            </div>
            <StatusPill status={phase.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
