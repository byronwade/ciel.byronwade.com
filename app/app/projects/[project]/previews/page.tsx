import Link from "next/link";
import { PageHeader, StatusPill, EmptyState } from "@/components/ciel";
import { getPreviews, getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function PreviewsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const [project, previews] = await Promise.all([getProject(id), getPreviews(id)]);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Previews" scope={project.name} />
      <div className="flex flex-col gap-2">
        {previews.length === 0 ? (
          <EmptyState
            title="No previews yet"
            description="Push to a non-production branch to create a preview deployment with its own shareable URL."
          />
        ) : (
          previews.map((p) => (
            <Link key={p.id} href={`/app/projects/${id}/previews/${p.id}`} className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50">
              <div>
                <div className="font-medium text-sm">{p.branch}</div>
                <div className="text-xs text-muted-foreground">{p.commitMessage}</div>
              </div>
              <StatusPill status={p.status} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
