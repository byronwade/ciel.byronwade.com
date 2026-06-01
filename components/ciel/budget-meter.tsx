import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { BudgetMode } from "@/types";

const modeLabels: Record<BudgetMode, string> = {
  hard_stop: "Hard stop",
  grace_buffer: "Grace buffer",
  auto_scale: "Auto-scale with ceiling",
  prepaid: "Prepaid only",
};

interface BudgetMeterProps {
  used: number;
  cap: number;
  mode?: BudgetMode;
  label?: string;
  compact?: boolean;
  className?: string;
}

export function BudgetMeter({ used, cap, mode, label, compact, className }: BudgetMeterProps) {
  const pct = Math.min((used / cap) * 100, 100);
  const isWarning = pct >= 75 && pct < 100;
  const isCritical = pct >= 100;

  const nextAction = isCritical
    ? "Production paused — increase cap to resume"
    : isWarning
      ? "Approaching cap — review traffic attribution"
      : "Within budget";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {!compact && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label ?? "Budget"}</span>
          <span className="font-medium tabular-nums">
            ${used.toFixed(0)} / ${cap.toFixed(0)}
          </span>
        </div>
      )}
      <Progress
        value={pct}
        className={cn("h-1.5", isCritical && "[&>div]:bg-red-500", isWarning && "[&>div]:bg-amber-500")}
      />
      {!compact && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{mode ? modeLabels[mode] : nextAction}</span>
          <span className="tabular-nums">{pct.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}
