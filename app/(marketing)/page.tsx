import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, DollarSign, Eye } from "lucide-react";

export const metadata: Metadata = {
  description:
    "Ciel is a frontend-first deployment platform with predictable costs, understandable security, and legible deployment states.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="flex flex-col gap-6 max-w-2xl">
          <Badge variant="outline" className="w-fit">Frontend deployment, reimagined</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Deploy without surprise bills, hidden risk, or black-box settings.
          </h1>
          <p className="text-lg text-muted-foreground">
            Ciel is a frontend-first shipping platform where cost is visible before it happens,
            security is understandable before something goes wrong, and every deployment state
            is legible enough to recover quickly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Start Deploying <ArrowRight data-icon="inline-end" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing/calculator">Try the Calculator</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="product" className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-8">Three promises, one platform</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <DollarSign className="size-5 text-muted-foreground mb-2" />
                <CardTitle className="text-base">Cost is visible first</CardTitle>
                <CardDescription>
                  Hierarchical budgets at workspace, project, and environment level.
                  Traffic attribution breaks down human, bot, crawler, and preview traffic.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="size-5 text-muted-foreground mb-2" />
                <CardTitle className="text-base">Security is default</CardTitle>
                <CardDescription>
                  Passkeys, preview protection, secret masking, and step-up reauth for
                  dangerous actions — not hidden behind enterprise tiers.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Eye className="size-5 text-muted-foreground mb-2" />
                <CardTitle className="text-base">States are legible</CardTitle>
                <CardDescription>
                  Parsed build failures, DNS package tracking, unified event logs, and
                  one-click recovery paths on every failure screen.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-2">Switching from another platform?</h2>
          <p className="text-muted-foreground mb-8">Honest comparisons, not smug feature grids.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["vercel", "netlify", "railway", "render", "cloudflare"].map((slug) => (
              <Link key={slug} href={`/compare/${slug}`} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="font-medium capitalize">Ciel vs {slug}</div>
                <div className="text-sm text-muted-foreground mt-1">Migration guide included</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-8">Teams who switched</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { quote: "We finally understand what's driving our bandwidth bill.", author: "Alex Chen", role: "Acme Corp" },
              { quote: "Failed builds tell me exactly what to fix now.", author: "Jordan Lee", role: "Stackform" },
              { quote: "Migrating from Vercel took an afternoon.", author: "Sam Rivera", role: "Docubase" },
            ].map((t) => (
              <blockquote key={t.author} className="rounded-lg border p-5 text-sm">
                <p className="italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 font-medium">{t.author}<span className="text-muted-foreground font-normal"> · {t.role}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to ship with clarity?</h2>
          <Button size="lg" asChild>
            <Link href="/auth/signup">Create your workspace</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
