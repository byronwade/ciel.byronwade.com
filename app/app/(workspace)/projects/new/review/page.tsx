import Link from "next/link";
import { NewProjectLayout } from "@/components/app/new-project-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectReviewPage() {
  return (
    <NewProjectLayout step={5} title="Review & deploy" nextLabel="Deploy project">
      <Card className="mb-4">
        <CardHeader><CardTitle className="text-sm">Configuration</CardTitle></CardHeader>
        <CardContent className="text-sm flex flex-col gap-2">
          <div>Repository: acme/marketing-site</div>
          <div>Framework: Next.js 15</div>
          <div>Domain: marketing-site.ciel.app</div>
          <div>Preview protection: Password (default)</div>
          <div>Est. traffic budget: $15/mo</div>
        </CardContent>
      </Card>
      <Link href="/app/projects/proj_marketing/overview" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
        Deploy project
      </Link>
    </NewProjectLayout>
  );
}
