import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const templates = [
  { name: "Next.js Marketing", framework: "Next.js", desc: "Landing page with blog" },
  { name: "Astro Docs", framework: "Astro", desc: "Documentation site" },
  { name: "React Dashboard", framework: "Vite + React", desc: "Admin dashboard SPA" },
  { name: "Static Portfolio", framework: "HTML/CSS", desc: "Personal portfolio" },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Templates</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {templates.map((t) => (
          <Link key={t.name} href="/app/projects/new/source">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-base">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.framework} · {t.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
