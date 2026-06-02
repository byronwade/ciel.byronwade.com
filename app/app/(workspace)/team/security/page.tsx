import Link from "next/link";
import { PageHeader, UnifiedEventTable } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvents } from "@/lib/mock";

const securityEvents = [
  { id: "se1", type: "security" as const, message: "Secret DATABASE_URL accessed by deployment", timestamp: "2026-06-01T08:00:00Z", actor: "System" },
  { id: "se2", type: "security" as const, message: "API token created: CI deploy", timestamp: "2026-05-28T10:00:00Z", actor: "Alex Chen" },
  { id: "se3", type: "activity" as const, message: "MFA enabled for Jordan Lee", timestamp: "2026-05-20T14:00:00Z", actor: "Jordan Lee" },
];

export default async function TeamSecurityPage() {
  return (
    <div>
      <PageHeader title="Team Security" scope="Team" nextAction={{ label: "Review sessions", href: "/app/team/sessions" }} />
      <Card className="mb-4 border-warning/40">
        <CardHeader><CardTitle className="text-sm">Posture summary</CardTitle></CardHeader>
        <CardContent className="text-sm flex flex-col gap-1">
          <div>3 of 4 members have MFA enabled</div>
          <div>2 authorized apps with broad scopes</div>
          <div>0 suspicious login events in last 30 days</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Recent security events</CardTitle></CardHeader>
        <CardContent><UnifiedEventTable events={securityEvents} compact /></CardContent>
      </Card>
    </div>
  );
}
