import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({ title, description, actionLabel, onAction, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-12 text-center">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild>
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
