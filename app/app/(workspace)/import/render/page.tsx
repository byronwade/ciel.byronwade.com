import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";

const mappings = [
  { render: "Build Command", ciel: "npm run build", status: "mapped" },
  { render: "Start Command", ciel: "npm start", status: "mapped" },
  { render: "Instance type", ciel: "Standard (1 vCPU)", status: "review" },
  { render: "Health check path", ciel: "/api/health", status: "mapped" },
  { render: "DATABASE_URL", ciel: "DATABASE_URL", status: "mapped" },
  { render: "Auto-deploy", ciel: "On push to main", status: "mapped" },
];

export default function ImportRenderPage() {
  return (
    <div>
      <PageHeader
        title="Import from Render"
        description="Translate Render web service settings into Ciel project config"
      />
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm">Configuration mapping</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Render</TableHead>
                <TableHead>Ciel</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((m) => (
                <TableRow key={m.render}>
                  <TableCell className="text-sm">{m.render}</TableCell>
                  <TableCell className="text-sm font-mono">{m.ciel}</TableCell>
                  <TableCell>
                    <Badge variant={m.status === "mapped" ? "secondary" : "outline"} className="capitalize">
                      {m.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm">Readiness checklist</CardTitle></CardHeader>
        <CardContent className="text-sm flex flex-col gap-2">
          <div>✓ Connect Render account</div>
          <div>✓ Select services to import</div>
          <div>○ Review instance sizing (1 needs manual review)</div>
          <div>○ Confirm health check and start command</div>
          <div>○ Plan zero-downtime DNS switch</div>
        </CardContent>
      </Card>
      <LinkButton href="/app/projects/new/source">Start Import</LinkButton>
    </div>
  );
}
