import { PageHeader } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const invites = [
  { email: "newhire@acme.com", role: "developer", sent: "2026-05-30" },
  { email: "contractor@external.com", role: "viewer", sent: "2026-05-28" },
];

export default function TeamInvitesPage() {
  return (
    <div>
      <PageHeader title="Pending Invites" scope="Team" nextAction={{ label: "Invite", href: "?dialog=invite-member" }} />
      <div className="flex flex-col gap-2">
        {invites.map((i) => (
          <Card key={i.email}>
            <CardContent className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm">{i.email}</div>
                <div className="text-xs text-muted-foreground">Sent {i.sent}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">{i.role}</Badge>
                <Button variant="ghost" size="sm">Revoke</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
