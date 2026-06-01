import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProject } from "@/lib/mock";
import { notFound } from "next/navigation";

export default async function RetentionSettingsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Retention" scope={project.name} />
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-sm">Log & deployment retention</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Deployment history</Label>
            <Select defaultValue="30">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Runtime logs</Label>
            <Select defaultValue="7">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">Extended retention is billed as a line item on your invoice.</p>
        </CardContent>
      </Card>
    </div>
  );
}
