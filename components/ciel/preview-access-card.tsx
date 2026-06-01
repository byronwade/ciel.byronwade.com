import { Badge } from "@/components/ui/badge";
import { StatusPill } from "./status-pill";
import type { Preview } from "@/types";
import { Lock, Link, Users, Globe } from "lucide-react";

const protectionIcons = {
  password: Lock,
  link: Link,
  team: Users,
  public: Globe,
};

interface PreviewAccessCardProps {
  preview: Preview;
}

export function PreviewAccessCard({ preview }: PreviewAccessCardProps) {
  const Icon = protectionIcons[preview.protection];

  return (
    <div className="rounded-md border p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Access Control</span>
        <StatusPill status={preview.protection === "public" ? "warning" : "protected"} />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Icon className="size-4 text-muted-foreground" />
        <span className="capitalize">{preview.protection} access</span>
      </div>
      <code className="rounded bg-muted px-2 py-1 text-xs font-mono break-all">{preview.url}</code>
      {preview.protection === "public" && (
        <Badge variant="outline" className="w-fit text-amber-700 border-amber-500/30">
          Preview is publicly accessible
        </Badge>
      )}
    </div>
  );
}
