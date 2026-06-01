import Link from "next/link";
import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";

const mappings = [
  { vercel: "Build Command", ciel: "npm run build", status: "mapped" },
  { vercel: "Output Directory", ciel: ".next", status: "mapped" },
  { vercel: "NODE_ENV", ciel: "production", status: "mapped" },
  { vercel: "VERCEL_URL", ciel: "—", status: "review" },
  { vercel: "API_SECRET", ciel: "API_SECRET", status: "mapped" },
];

export default function ImportVercelPage() {
  return (
    <div>
      <PageHeader title="Import from Vercel" description="Review mapped settings before switching DNS" />
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm">Configuration mapping</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vercel</TableHead>
                <TableHead>Ciel</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((m) => (
                <TableRow key={m.vercel}>
                  <TableCell className="text-sm">{m.vercel}</TableCell>
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
          <div>✓ Connect Vercel account</div>
          <div>✓ Select projects to import</div>
          <div>○ Review environment variable mapping (1 needs manual review)</div>
          <div>○ Confirm build settings diff</div>
        </CardContent>
      </Card>
      <LinkButton href="/app/projects/new/source">Start Import</LinkButton>
    </div>
  );
}
