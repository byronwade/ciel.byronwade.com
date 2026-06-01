import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function BuildPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Build Settings" scope={project.name} />
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-sm">Build configuration</CardTitle></CardHeader>
        <CardContent>
          <FieldGroup>
            <Field><FieldLabel>Framework</FieldLabel><Input defaultValue={project.framework} readOnly /></Field>
            <Field><FieldLabel>Build command</FieldLabel><Input defaultValue="npm run build" /></Field>
            <Field><FieldLabel>Output directory</FieldLabel><Input defaultValue=".next" /></Field>
            <Field><FieldLabel>Install command</FieldLabel><Input defaultValue="npm ci" /></Field>
            <Field><FieldLabel>Node version</FieldLabel><Input defaultValue="20.x" /></Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
