import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { compareSlugs } from "@/lib/routes";
import { getCompetitors } from "@/lib/mock";

export default async function ComparePage() {
  const competitors = await getCompetitors();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Ciel</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Honest comparisons focused on the emotional reasons teams switch: predictable bills,
        safe previews, no lock-in, and failures you can actually fix.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {competitors.map((c) => (
          <Link key={c.slug} href={`/compare/${c.slug}`}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-base">Ciel vs {c.name}</CardTitle>
                <CardDescription>{c.tagline}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
