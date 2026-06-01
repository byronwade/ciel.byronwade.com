import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketingPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function MarketingPage({ title, description, children }: MarketingPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && <p className="text-muted-foreground mb-8">{description}</p>}
      {children}
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground flex flex-col gap-2">{children}</div>
    </section>
  );
}

export function CustomerCard({ name, company, quote }: { name: string; company: string; quote: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{company}</p>
      </CardHeader>
      <CardContent className="text-sm italic">&ldquo;{quote}&rdquo;</CardContent>
    </Card>
  );
}

export function ChangelogEntry({ version, date, items }: { version: string; date: string; items: string[] }) {
  return (
    <div className="border-b pb-6 mb-6 last:border-0">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono font-semibold">{version}</span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <ul className="list-disc pl-5 text-sm text-muted-foreground flex flex-col gap-1">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function RoadmapItem({ status, title, desc }: { status: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 border-b pb-4 mb-4 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground w-20 shrink-0 pt-0.5">{status}</span>
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
      </div>
    </div>
  );
}
