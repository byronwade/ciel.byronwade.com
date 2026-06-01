import Link from "next/link";
import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newProjectSteps } from "@/lib/routes";
import { cn } from "@/lib/utils";

function WizardNav({ current }: { current: number }) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {newProjectSteps.map((step, i) => (
        <Link
          key={step.href}
          href={step.href}
          className={cn(
            "text-xs px-3 py-1.5 rounded-full border whitespace-nowrap",
            i === current ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground"
          )}
        >
          {step.label}
        </Link>
      ))}
    </div>
  );
}

function WizardSummary() {
  return (
    <Card className="sticky top-4">
      <CardHeader><CardTitle className="text-sm">Review summary</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground flex flex-col gap-2">
        <div>Source: Not selected</div>
        <div>Framework: Auto-detect</div>
        <div>Domain: Temporary *.ciel.app</div>
        <div>Protection: Password (default)</div>
        <div className="pt-2 border-t">Est. first month: ~$15</div>
      </CardContent>
    </Card>
  );
}

export function NewProjectLayout({
  step,
  title,
  description,
  children,
  nextHref,
  nextLabel = "Continue",
}: {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  nextHref?: string;
  nextLabel?: string;
}) {
  return (
    <div>
      <PageHeader title="Create project" description={description} />
      <WizardNav current={step} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">{children}</div>
        <WizardSummary />
      </div>
      {nextHref && (
        <div className="mt-6">
          <Link href={nextHref} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            {nextLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

export function SourceStep() {
  const sources = [
    { name: "Connect GitHub", desc: "Import from GitHub repository", href: "/app/projects/new/repository" },
    { name: "Connect GitLab", desc: "Import from GitLab repository", href: "/app/projects/new/repository" },
    { name: "Import static artifact", desc: "Upload a pre-built bundle", href: "/app/projects/new/framework" },
    { name: "Try a template", desc: "Start from a Ciel template", href: "/templates" },
  ];
  return (
    <NewProjectLayout step={0} title="Choose source" description="Where should Ciel pull your code from?" nextHref="/app/projects/new/repository">
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <Link key={s.name} href={s.href}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader>
                <CardTitle className="text-base">{s.name}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </NewProjectLayout>
  );
}
