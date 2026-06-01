import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";

const mappings = [
  { netlify: "Build command", ciel: "npm run build", status: "mapped" },
  { netlify: "Publish directory", ciel: ".next", status: "mapped" },
  { netlify: "NETLIFY_SITE_ID", ciel: "—", status: "review" },
  { netlify: "Context: production", ciel: "Production env", status: "mapped" },
  { netlify: "Context: deploy-preview", ciel: "Preview env", status: "mapped" },
  { netlify: "STRIPE_SECRET", ciel: "STRIPE_SECRET", status: "mapped" },
];

export default function ImportNetlifyPage() {
  return (
    <div>
      <PageHeader
        title="Import from Netlify"
        description="Map Netlify build settings and branch contexts before cutover"
      />
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm">Configuration mapping</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Netlify</TableHead>
                <TableHead>Ciel</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((m) => (
                <TableRow key={m.netlify}>
                  <TableCell className="text-sm">{m.netlify}</TableCell>
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
          <div>✓ Connect Netlify account</div>
          <div>✓ Select sites to import</div>
          <div>○ Map deploy-preview branch rules to preview environments</div>
          <div>○ Review environment variable mapping (1 needs manual review)</div>
          <div>○ Confirm DNS cutover plan</div>
        </CardContent>
      </Card>
      <LinkButton href="/app/projects/new/source">Start Import</LinkButton>
    </div>
  );
}
