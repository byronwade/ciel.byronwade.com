import { NewProjectLayout } from "@/components/app/new-project-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectDomainPage() {
  return (
    <NewProjectLayout step={4} title="Domain setup" nextHref="/app/projects/new/review">
      <div className="grid gap-3">
        {[
          { title: "Temporary Ciel subdomain", desc: "marketing-site.ciel.app — available now" },
          { title: "Custom domain later", desc: "Add acme.com after first deploy" },
          { title: "Preview only", desc: "No production domain yet" },
        ].map((opt) => (
          <Card key={opt.title} className="cursor-pointer hover:bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{opt.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">{opt.desc}</CardContent>
          </Card>
        ))}
      </div>
    </NewProjectLayout>
  );
}
