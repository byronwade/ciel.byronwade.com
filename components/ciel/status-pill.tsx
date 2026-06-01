import { cn } from "@/lib/utils";
import type { StatusType } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const statusStyles: Record<StatusType, string> = {
  ready: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  failing: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  paused: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  protected: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  building: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  queued: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
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
  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", status === "ready" ? "bg-emerald-500" : status === "failing" ? "bg-red-500" : status === "warning" ? "bg-amber-500" : status === "building" ? "bg-sky-500 animate-pulse" : "bg-current")} />
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
