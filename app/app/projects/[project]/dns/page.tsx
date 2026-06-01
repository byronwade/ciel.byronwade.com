import Link from "next/link";
import { PageHeader, DnsRecordCard } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDomains, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function DnsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, domains] = await Promise.all([getProject(id), getDomains(id)]);
  if (!project) notFound();

  const allRecords = domains.flatMap((d) =>
    d.records.map((r) => ({ ...r, domain: d.name }))
  );

  return (
    <div>
      <PageHeader
        title="DNS Records"
        scope={project.name}
        nextAction={{ label: "Add Domain", href: "?dialog=add-domain" }}
      />
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="?panel=dns-detection">Detect DNS provider</Link>
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-sm">All records</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3">
          {allRecords.map((r, i) => (
            <div key={i}>
              <div className="text-xs text-muted-foreground mb-1">{r.domain}</div>
              <DnsRecordCard record={r} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
