import { Badge } from "@/components/ui/badge";

interface PermissionScopeChipProps {
  scopes: string[];
}

export function PermissionScopeChip({ scopes }: PermissionScopeChipProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {scopes.map((scope) => (
        <Badge key={scope} variant="secondary" className="font-mono text-xs">
          {scope}
        </Badge>
      ))}
    </div>
  );
}
