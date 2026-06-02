import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  icon?: LucideIcon;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  icon: Icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 p-10 text-center",
        className
      )}
    >
      {Icon && (
        <div className="flex size-11 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-card">
          <Icon className="size-5" />
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Button className="mt-1" asChild>
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button className="mt-1" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
