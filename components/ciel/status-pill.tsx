import { cn } from "@/lib/utils";
import type { StatusType } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const statusStyles: Record<StatusType, { chip: string; dot: string; pulse: boolean }> = {
  ready: { chip: "bg-status-ready/10 text-status-ready", dot: "bg-status-ready", pulse: false },
  warning: { chip: "bg-status-warning/10 text-status-warning", dot: "bg-status-warning", pulse: false },
  failing: { chip: "bg-status-failing/10 text-status-failing", dot: "bg-status-failing", pulse: false },
  paused: { chip: "bg-muted text-muted-foreground", dot: "bg-status-paused", pulse: false },
  protected: { chip: "bg-status-protected/10 text-status-protected", dot: "bg-status-protected", pulse: false },
  building: { chip: "bg-sky-500/10 text-sky-700 dark:text-sky-400", dot: "bg-sky-500", pulse: true },
  queued: { chip: "bg-violet-500/10 text-violet-700 dark:text-violet-400", dot: "bg-violet-500", pulse: true },
};

const statusLabels: Record<StatusType, string> = {
  ready: "Ready",
  warning: "Warning",
  failing: "Failed",
  paused: "Paused",
  protected: "Protected",
  building: "Building",
  queued: "Queued",
};

interface StatusPillProps {
  status: StatusType;
  label?: string;
  tooltip?: string;
  className?: string;
}

export function StatusPill({ status, label, tooltip, className }: StatusPillProps) {
  const s = statusStyles[status];
  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        s.chip,
        className
      )}
    >
      <span className="relative inline-flex size-1.5">
        {s.pulse && (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              s.dot
            )}
          />
        )}
        <span className={cn("relative inline-flex size-full rounded-full", s.dot)} />
      </span>
      {label ?? statusLabels[status]}
    </span>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger render={pill} />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return pill;
}
