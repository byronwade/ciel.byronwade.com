import { NewProjectLayout } from "@/components/app/new-project-wizard";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/ciel";

const repos = [
  { name: "acme/marketing-site", updated: "2 hours ago" },
  { name: "acme/docs", updated: "1 day ago" },
  { name: "acme/admin-dashboard", updated: "3 days ago" },
];

export default function NewProjectRepositoryPage() {
  return (
    <NewProjectLayout step={1} title="Select repository" nextHref="/app/projects/new/framework">
      <div className="flex flex-col gap-2">
        {repos.map((r) => (
          <Card key={r.name} className="cursor-pointer hover:bg-muted/50">
            <CardContent className="flex items-center justify-between py-3">
              <span className="font-mono text-sm">{r.name}</span>
              <span className="text-xs text-muted-foreground">{r.updated}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </NewProjectLayout>
  );
}
