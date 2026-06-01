import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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

  return (
    <div>
      <PageHeader title="General Settings" scope={project.name} />
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-sm">Project details</CardTitle></CardHeader>
        <CardContent>
          <FieldGroup>
            <Field><FieldLabel>Project name</FieldLabel><Input defaultValue={project.name} /></Field>
            <Field><FieldLabel>Slug</FieldLabel><Input defaultValue={project.slug} /></Field>
            <Field><FieldLabel>Production URL</FieldLabel><Input defaultValue={project.productionUrl} readOnly /></Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
