"use client";

import { Button } from "@/components/ui/button";
import { StatusPill } from "./status-pill";
import type { DnsRecord } from "@/types";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface DnsRecordCardProps {
  record: DnsRecord;
}

export function DnsRecordCard({ record }: DnsRecordCardProps) {
  const [copied, setCopied] = useState(false);

  const copyValue = () => {
    navigator.clipboard.writeText(record.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusMap = {
    found: "ready" as const,
    missing: "failing" as const,
    mismatched: "warning" as const,
    pending: "building" as const,
  };

  return (
    <div className="rounded-md border p-3 text-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge type={record.type} />
          <span className="font-mono text-muted-foreground">{record.name}</span>
        </div>
        <StatusPill status={statusMap[record.status]} label={record.status} />
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 rounded bg-muted px-2 py-1 font-mono text-xs break-all">{record.value}</code>
        <Button variant="ghost" size="icon-sm" onClick={copyValue}>
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
    </div>
  );
}

function Badge({ type }: { type: string }) {
  return (
    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">{type}</span>
  );
}
