import { PageHeader } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

const assets = [
  { path: "/_next/static/chunks/main.js", size: "142 KB", cached: true },
  { path: "/images/hero.webp", size: "128 KB", cached: true },
  { path: "/fonts/geist.woff2", size: "34 KB", cached: true },
  { path: "/api/search", size: "—", cached: false },
];

export default async function AssetsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Assets" scope={project.name} description="Static assets from latest production deployment" />
      <div className="flex flex-col gap-1">
        {assets.map((a) => (
          <Card key={a.path}>
            <CardContent className="flex items-center justify-between py-2 text-sm">
              <code className="font-mono text-xs">{a.path}</code>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{a.size}</span>
                <span>{a.cached ? "Cached" : "Dynamic"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
