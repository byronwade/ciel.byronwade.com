import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ciel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDeployments, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function DeploymentsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, deployments] = await Promise.all([getProject(id), getDeployments(id)]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Deployments" scope={project.name} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Commit</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                <Link href={`/app/projects/${id}/deployments/${d.id}`} className="font-mono text-sm hover:underline">
                  {d.commit.slice(0, 7)}
                </Link>
              </TableCell>
              <TableCell className="text-sm">{d.branch}</TableCell>
              <TableCell className="text-sm capitalize">{d.environment}</TableCell>
              <TableCell><StatusPill status={d.status} /></TableCell>
              <TableCell className="text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
