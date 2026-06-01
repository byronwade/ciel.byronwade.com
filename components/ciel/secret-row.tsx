import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Secret } from "@/types";
import { Eye, RotateCw } from "lucide-react";

interface SecretRowProps {
  secret: Secret;
  onReveal?: () => void;
  onRotate?: () => void;
}

export function SecretRow({ secret, onReveal, onRotate }: SecretRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border px-3 py-2 text-sm">
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono font-medium">{secret.key}</span>
          <Badge variant="outline" className="text-xs">{secret.scope}</Badge>
          {secret.sensitive && <Badge variant="secondary" className="text-xs">Sensitive</Badge>}
        </div>
        <div className="text-xs text-muted-foreground">
          {secret.lastRotated && `Rotated ${new Date(secret.lastRotated).toLocaleDateString()}`}
          {secret.lastAccessed && ` · Accessed ${new Date(secret.lastAccessed).toLocaleDateString()}`}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="font-mono text-muted-foreground">••••••••</span>
        {onReveal && (
          <Button variant="ghost" size="icon-sm" onClick={onReveal}>
            <Eye />
          </Button>
        )}
        {onRotate && (
          <Button variant="ghost" size="icon-sm" onClick={onRotate}>
            <RotateCw />
          </Button>
        )}
      </div>
    </div>
  );
}
