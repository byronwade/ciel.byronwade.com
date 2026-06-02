import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketingPageProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export function MarketingPage({ title, description, eyebrow, children }: MarketingPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <header className="mb-10 border-b pb-8">
        {eyebrow && (
          <span className="text-xs font-medium uppercase tracking-wider text-brand">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{description}</p>
        )}
      </header>
      {children}
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function CustomerCard({ name, company, quote }: { name: string; company: string; quote: string }) {
  return (
    <Card className="shadow-card transition-colors hover:border-brand/40">
      <CardHeader>
        <CardTitle className="text-base">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{company}</p>
      </CardHeader>
      <CardContent className="text-pretty text-sm leading-relaxed">&ldquo;{quote}&rdquo;</CardContent>
    </Card>
  );
}

export function ChangelogEntry({ version, date, items }: { version: string; date: string; items: string[] }) {
  return (
    <div className="mb-6 border-b pb-6 last:border-0">
      <div className="mb-2 flex items-baseline gap-3">
        <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-xs font-semibold text-brand">
          {version}
        </span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function RoadmapItem({ status, title, desc }: { status: string; title: string; desc: string }) {
  return (
    <div className="mb-4 flex gap-4 border-b pb-4 last:border-0">
      <span className="w-24 shrink-0 pt-0.5 text-xs font-medium uppercase tracking-wide text-brand">
        {status}
      </span>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-0.5 text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
