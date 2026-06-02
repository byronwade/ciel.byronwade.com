import Link from "next/link";
import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";

const providers = [
  {
    slug: "vercel",
    name: "Vercel",
    description: "Import projects, env vars, and build settings from Vercel.",
    mapped: 4,
    review: 1,
  },
  {
    slug: "netlify",
    name: "Netlify",
    description: "Map Netlify sites, branch contexts, and deploy previews.",
    mapped: 5,
    review: 1,
  },
  {
    slug: "render",
    name: "Render",
    description: "Translate Render web services into Ciel project config.",
    mapped: 5,
    review: 1,
  },
] as const;

export default function ImportHubPage() {
  return (
    <div>
      <PageHeader
        title="Import a project"
        description="Migrate from another platform with mapped settings and a readiness checklist before DNS cutover"
        nextAction={{ label: "New project", href: "/app/projects/new/source" }}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {providers.map((p) => (
          <Card key={p.slug} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <Badge variant="secondary">{p.mapped} mapped</Badge>
              </div>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col gap-3">
              {p.review > 0 && (
                <p className="text-xs text-warning">{p.review} setting needs manual review</p>
              )}
              <LinkButton href={`/app/import/${p.slug}`} variant="outline" size="sm" className="w-fit">
                Review import
              </LinkButton>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Not migrating from a platform?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Connect a Git repository directly via the{" "}
          <Link href="/app/projects/new/source" className="text-foreground underline underline-offset-4">
            new project wizard
          </Link>
          .
        </CardContent>
      </Card>
    </div>
  );
}
