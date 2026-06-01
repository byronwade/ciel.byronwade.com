import { NewProjectLayout } from "@/components/app/new-project-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectFrameworkPage() {
  return (
    <NewProjectLayout step={2} title="Framework detected" description="Next.js 15 · App Router" nextHref="/app/projects/new/environment">
      <Card>
        <CardHeader><CardTitle className="text-sm">Build settings</CardTitle></CardHeader>
        <CardContent className="font-mono text-sm flex flex-col gap-2">
          <div>Build: npm run build</div>
          <div>Output: .next</div>
          <div>Install: npm ci</div>
          <div>Node: 20.x</div>
        </CardContent>
      </Card>
    </NewProjectLayout>
  );
}
