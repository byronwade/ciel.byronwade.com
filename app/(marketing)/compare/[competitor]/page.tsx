import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compareSlugs } from "@/lib/routes";
import { getCompetitor } from "@/lib/mock";

export function generateStaticParams() {
  return compareSlugs.map((slug) => ({ competitor: slug }));
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const competitor = await getCompetitor(slug);
  if (!competitor) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <Link href="/compare" className="text-sm text-muted-foreground hover:text-foreground">← All comparisons</Link>
        <h1 className="text-3xl font-bold tracking-tight mt-4">Ciel vs {competitor.name}</h1>
        <p className="text-muted-foreground mt-2">{competitor.tagline}</p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Where {competitor.name} excels</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground flex flex-col gap-1">
              {competitor.strengths.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Common pain points</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground flex flex-col gap-1">
              {competitor.weaknesses.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader><CardTitle className="text-base">Migration steps</CardTitle></CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 text-sm flex flex-col gap-2">
            {competitor.migrationSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 mb-8">
        <h2 className="font-semibold">FAQ</h2>
        {competitor.concerns.map((c) => (
          <div key={c.question} className="rounded-md border p-4">
            <div className="font-medium text-sm">{c.question}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.answer}</div>
          </div>
        ))}
      </div>

      <Button asChild>
        <Link href={`/app/import/${slug}`}>Import existing project</Link>
      </Button>
    </div>
  );
}
