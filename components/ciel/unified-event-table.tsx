import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CielEvent } from "@/types";

interface UnifiedEventTableProps {
  events: CielEvent[];
  compact?: boolean;
}

const typeColors: Record<CielEvent["type"], string> = {
  build: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  runtime: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  dns: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  billing: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  security: "bg-red-500/10 text-red-700 dark:text-red-400",
  activity: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

export function UnifiedEventTable({ events, compact }: UnifiedEventTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Message</TableHead>
          {!compact && <TableHead className="w-[120px]">Actor</TableHead>}
          <TableHead className="w-[160px]">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <Badge variant="outline" className={typeColors[event.type]}>
                {event.type}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">{event.message}</TableCell>
            {!compact && (
              <TableCell className="text-sm text-muted-foreground">{event.actor ?? "—"}</TableCell>
            )}
            <TableCell className="text-xs text-muted-foreground tabular-nums">
              {new Date(event.timestamp).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
