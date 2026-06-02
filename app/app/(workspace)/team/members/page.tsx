import Link from "next/link";
import { PageHeader, PermissionScopeChip } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GradientAvatar } from "@/components/ui/gradient-avatar";
import { StatusDot } from "@/components/ui/status-dot";
import { getTeamMembers, getAuthorizedApps } from "@/lib/mock";

export default async function TeamMembersPage() {
  const [members, apps] = await Promise.all([getTeamMembers(), getAuthorizedApps()]);

  return (
    <div>
      <PageHeader
        title="Team Members"
        nextAction={{ label: "Invite", href: "/app/team/members?dialog=invite-member" }}
      />
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm">Members</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>MFA</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <GradientAvatar seed={m.email} size="md" />
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{m.role}</Badge></TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <StatusDot tone={m.mfaEnabled ? "success" : "warning"} />
                      {m.mfaEnabled ? "Enabled" : "Not set"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(m.lastActive).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="?dialog=change-role">Change role</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm">Authorized apps</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          {apps.map((app) => (
            <div key={app.id} className="flex items-start justify-between gap-4 border-b pb-4 last:border-0">
              <div>
                <div className="font-medium text-sm">{app.name}</div>
                <PermissionScopeChip scopes={app.scopes} />
              </div>
              <Button variant="outline" size="sm" asChild><Link href="?dialog=revoke-app">Revoke</Link></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
