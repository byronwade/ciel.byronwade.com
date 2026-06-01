import { PageHeader } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sessions = [
  { device: "Chrome on macOS", location: "San Francisco, CA", current: true, lastActive: "Now" },
  { device: "Safari on iPhone", location: "San Francisco, CA", current: false, lastActive: "2 hours ago" },
  { device: "Firefox on Linux", location: "Austin, TX", current: false, lastActive: "3 days ago" },
];

export default function TeamSessionsPage() {
  return (
    <div>
      <PageHeader title="Active Sessions" scope="Team" nextAction={{ label: "Sign out all", href: "?dialog=sign-out-all-sessions" }} />
      <div className="flex flex-col gap-2">
        {sessions.map((s) => (
          <Card key={s.device}>
            <CardContent className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium flex items-center gap-2">
                  {s.device}
                  {s.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                </div>
                <div className="text-xs text-muted-foreground">{s.location} · {s.lastActive}</div>
              </div>
              {!s.current && <Button variant="ghost" size="sm">Revoke</Button>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
