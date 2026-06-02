import Link from "next/link";
import { PageHeader, StatusPill, DnsRecordCard, EmptyState } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDomains, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function DomainsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, domains] = await Promise.all([getProject(id), getDomains(id)]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader
        title="Domains"
        scope={project.name}
        nextAction={{ label: "Add Domain", href: `?dialog=add-domain` }}
      />
      <div className="grid gap-4">
        {domains.length === 0 && (
          <EmptyState
            title="No custom domains"
            description="Add a domain to serve production traffic on your own URL with automatic SSL."
            actionLabel="Add Domain"
            actionHref="?dialog=add-domain"
          />
        )}
        {domains.map((domain) => (
          <Card key={domain.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-mono">{domain.name}</CardTitle>
                <div className="flex gap-2">
                  <StatusPill status={domain.dnsStatus} label="DNS" />
                  <StatusPill status={domain.sslStatus} label="SSL" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="text-xs text-muted-foreground">
                Last check: {new Date(domain.lastCheckAt).toLocaleString()}
                {domain.nextRetryAt && ` · Next retry: ${new Date(domain.nextRetryAt).toLocaleString()}`}
              </div>
              <div className="flex flex-col gap-2">
                {domain.records.map((r, i) => (
                  <DnsRecordCard key={i} record={r} />
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/app/projects/${id}/domains/${domain.id}`}>Details</Link>
                </Button>
                {!domain.verified && (
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`?dialog=verify-dns`}>Verify DNS</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
