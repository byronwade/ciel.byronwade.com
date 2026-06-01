import { PageHeader, StatusPill } from "@/components/ciel";
import { getProject, getDeployments, getPreviews } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function BranchesPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, deployments, previews] = await Promise.all([
    getProject(id),
    getDeployments(id),
    getPreviews(id),
  ]);
  if (!project) notFound();

  const branches = [
    { name: "main", type: "production", status: "ready" as const },
    ...previews.map((p) => ({ name: p.branch, type: "preview", status: p.status })),
  ];

  return (
    <div>
      <PageHeader title="Branches" scope={project.name} />
      <div className="flex flex-col gap-2">
        {branches.map((b) => (
          <div key={b.name} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
            <div className="flex items-center gap-2">
              <code className="font-mono">{b.name}</code>
              <span className="text-xs text-muted-foreground capitalize">{b.type}</span>
            </div>
            <StatusPill status={b.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
