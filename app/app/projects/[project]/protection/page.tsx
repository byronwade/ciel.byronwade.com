import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function ProtectionPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Protection" scope={project.name} description="Control who can access previews and production URLs" />
      <div className="grid gap-4 max-w-lg">
        <Card>
          <CardHeader><CardTitle className="text-sm">Preview access</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Default visibility</Label>
              <Select defaultValue="password">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="password">Password protected</SelectItem>
                  <SelectItem value="team">Team only</SelectItem>
                  <SelectItem value="link">Link only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Preview password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <LinkButton href="?dialog=protect-preview" variant="outline" size="sm" className="w-fit">
              Configure per-preview overrides
            </LinkButton>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Production</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Production URLs are always public. Use deployment protection rules for additional access control.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
