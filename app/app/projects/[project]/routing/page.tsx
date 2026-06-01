import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function RoutingPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Routing" scope={project.name} />
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-sm">Canonical & redirects</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Canonical domain</Label>
            <Select defaultValue="acme.com">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="acme.com">acme.com</SelectItem>
                <SelectItem value="www.acme.com">www.acme.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>www redirect</Label>
            <Select defaultValue="to-apex">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="to-apex">www → apex</SelectItem>
                <SelectItem value="to-www">apex → www</SelectItem>
                <SelectItem value="none">No redirect</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Trailing slash</Label>
            <Select defaultValue="remove">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="remove">Remove trailing slash</SelectItem>
                <SelectItem value="add">Add trailing slash</SelectItem>
                <SelectItem value="preserve">Preserve as-is</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
