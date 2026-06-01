import { NewProjectLayout } from "@/components/app/new-project-wizard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewProjectEnvironmentPage() {
  return (
    <NewProjectLayout step={3} title="Environment variables" nextHref="/app/projects/new/domain">
      <Textarea placeholder="Paste .env contents or KEY=VALUE pairs..." className="font-mono min-h-[200px]" />
      <Button variant="outline" className="mt-3">Import from CSV</Button>
    </NewProjectLayout>
  );
}
