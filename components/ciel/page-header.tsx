import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  scope?: string;
  state?: string;
  nextAction?: { label: string; href?: string; onClick?: () => void };
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  scope,
  state,
  nextAction,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 border-b pb-4 mb-6", className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          {(scope || state) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {scope && <span>{scope}</span>}
              {scope && state && <span>·</span>}
              {state && <span className="font-medium text-foreground">{state}</span>}
            </div>
          )}
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {nextAction && nextAction.href && (
            <Button size="sm" asChild>
              <a href={nextAction.href}>{nextAction.label}</a>
            </Button>
          )}
          {nextAction && nextAction.onClick && !nextAction.href && (
            <Button size="sm" onClick={nextAction.onClick}>{nextAction.label}</Button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
