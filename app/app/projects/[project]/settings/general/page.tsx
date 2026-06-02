import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { LinkButton } from "@/components/ui/link-button";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function GeneralSettingsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const isPaused = project.status === "paused";

  return (
    <div>
      <PageHeader title="General Settings" scope={project.name} />
      <div className="grid gap-4 max-w-lg">
        <Card>
          <CardHeader><CardTitle className="text-sm">Project details</CardTitle></CardHeader>
          <CardContent>
            <FieldGroup>
              <Field><FieldLabel>Project name</FieldLabel><Input defaultValue={project.name} /></Field>
              <Field><FieldLabel>Slug</FieldLabel><Input defaultValue={project.slug} /></Field>
              <Field><FieldLabel>Production URL</FieldLabel><Input defaultValue={project.productionUrl} readOnly /></Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Availability</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              {isPaused ? "Production is paused." : "Pause production to stop serving and billing traffic."}
            </span>
            {isPaused ? (
              <LinkButton href="?dialog=resume-project" size="sm">Resume</LinkButton>
            ) : (
              <LinkButton href="?dialog=pause-project" variant="outline" size="sm">Pause project</LinkButton>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
