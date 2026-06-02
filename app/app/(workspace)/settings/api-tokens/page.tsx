import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tokens = [
  { name: "CI deploy", prefix: "ciel_abc...", created: "2026-01-15", lastUsed: "2026-06-01" },
  { name: "Local dev", prefix: "ciel_xyz...", created: "2026-03-01", lastUsed: "2026-05-28" },
];

export default function ApiTokensPage() {
  return (
    <div>
      <PageHeader title="API Tokens" scope="Settings" nextAction={{ label: "Create Token", href: "?dialog=create-token" }} />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((t) => (
                <TableRow key={t.name}>
                  <TableCell className="text-sm">{t.name}</TableCell>
                  <TableCell className="font-mono text-xs">{t.prefix}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.created}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.lastUsed}</TableCell>
                  <TableCell><Button variant="ghost" size="sm">Revoke</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
