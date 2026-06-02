import Link from "next/link";
import { PageHeader, StatusPill, DnsRecordCard } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDomain, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ project: string; domain: string }>;
}) {
  const { project: projectId, domain: domainId } = await params;
  const [domain, project] = await Promise.all([getDomain(domainId), getProject(projectId)]);
  if (!domain || !project) notFound();

  return (
    <div>
      <PageHeader
        title={domain.name}
        scope={`${project.name} · ${domain.environment}`}
        state={domain.verified ? "Verified" : "Verification pending"}
        nextAction={!domain.verified ? { label: "Verify DNS", href: "?dialog=verify-dns" } : undefined}
      />

      <div className="grid gap-4 lg:grid-cols-2 mb-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">DNS status</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-2">
            <StatusPill status={domain.dnsStatus} />
            <span className="text-xs text-muted-foreground">Last check {new Date(domain.lastCheckAt).toLocaleString()}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">SSL certificate</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-2">
            <StatusPill status={domain.sslStatus} />
            {domain.nextRetryAt && (
              <span className="text-xs text-muted-foreground">Retry {new Date(domain.nextRetryAt).toLocaleString()}</span>
            )}
            {(domain.sslStatus === "failing" || domain.sslStatus === "paused") && (
              <Button variant="outline" size="sm" className="ml-auto" render={<Link href="?dialog=retry-ssl" />}>
                Retry SSL
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-sm">DNS records</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-2">
          {domain.records.map((r, i) => <DnsRecordCard key={i} record={r} />)}
        </CardContent>
      </Card>

      {!domain.verified && (
        <Button variant="outline" asChild>
          <Link href="?panel=domain-problems">Troubleshoot domain</Link>
        </Button>
      )}
    </div>
  );
}
