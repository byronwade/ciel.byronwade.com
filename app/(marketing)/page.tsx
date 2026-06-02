import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ciel/status-pill";
import { GradientAvatar } from "@/components/ui/gradient-avatar";
import { ArrowRight, Shield, DollarSign, Eye, Check } from "lucide-react";

export const metadata: Metadata = {
  description:
    "Ciel is a frontend-first deployment platform with predictable costs, understandable security, and legible deployment states.",
};

const promises = [
  {
    icon: DollarSign,
    title: "Cost is visible first",
    body: "Hierarchical budgets at workspace, project, and environment level. Traffic attribution breaks down human, bot, crawler, and preview bandwidth before the invoice lands.",
  },
  {
    icon: Shield,
    title: "Security is the default",
    body: "Passkeys, preview protection, secret masking, and step-up reauth for dangerous actions — never gated behind an enterprise tier.",
  },
  {
    icon: Eye,
    title: "States are legible",
    body: "Parsed build failures, DNS package-tracking, unified event logs, and a one-click recovery path on every failure screen.",
  },
];

const competitors = ["vercel", "netlify", "railway", "render", "cloudflare"];

const quotes = [
  { quote: "We finally understand what's driving our bandwidth bill.", author: "Alex Chen", role: "Acme Corp" },
  { quote: "Failed builds tell me exactly what to fix now.", author: "Jordan Lee", role: "Stackform" },
  { quote: "Migrating from Vercel took an afternoon.", author: "Sam Rivera", role: "Docubase" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="glow-brand pointer-events-none absolute inset-x-0 -top-24 h-96" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-brand" />
              Frontend deployment, reimagined
            </span>
            <h1 className="font-heading text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Deploy without{" "}
              <span className="text-gradient-brand">surprise bills</span>, hidden risk, or
              black-box settings.
            </h1>
            <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Ciel is a frontend-first shipping platform where cost is visible before it
              happens, security is understandable before something goes wrong, and every
              deployment state is legible enough to recover fast.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Start deploying <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing/calculator">Try the calculator</Link>
              </Button>
            </div>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Check className="size-3 text-brand" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="size-3 text-brand" /> Predictable pricing
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="size-3 text-brand" /> Export anytime
              </span>
            </p>
          </div>

          {/* Product preview */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="rounded-2xl border bg-card/60 p-1.5 shadow-float backdrop-blur">
              <div className="overflow-hidden rounded-xl border bg-background">
                <div className="flex items-center gap-2 border-b px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-destructive/60" />
                    <span className="size-2.5 rounded-full bg-warning/60" />
                    <span className="size-2.5 rounded-full bg-brand/60" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    acme-marketing · production
                  </span>
                  <StatusPill status="ready" className="ml-auto" />
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Month-to-date spend</div>
                    <div className="mt-1 text-2xl font-semibold tabular-nums">$184</div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[46%] rounded-full bg-brand" />
                    </div>
                    <div className="mt-1.5 text-xs text-muted-foreground">46% of $400 cap</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Latest deploy</div>
                    <div className="mt-1 font-mono text-sm">a1b9f3c</div>
                    <div className="mt-2 flex items-center gap-2">
                      <StatusPill status="ready" label="Ready" />
                      <span className="text-xs text-muted-foreground">12s ago</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Traffic this week</div>
                    <div className="mt-1 text-2xl font-semibold tabular-nums">128 GB</div>
                    <div className="mt-2 flex gap-1">
                      <span className="h-6 flex-1 rounded-sm bg-brand/80" />
                      <span className="h-6 w-3 rounded-sm bg-muted-foreground/30" />
                      <span className="h-6 w-2 rounded-sm bg-muted-foreground/20" />
                    </div>
                    <div className="mt-1.5 text-xs text-muted-foreground">88% human · 12% bot</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section id="product" className="border-b py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Why Ciel
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
              Three promises, one platform
            </h2>
            <p className="mt-2 text-muted-foreground">
              The things every team wants from their host — made the default, not the upsell.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {promises.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border bg-card p-6 shadow-card transition-colors hover:border-brand/40"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <p.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-b bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Migrate
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">Switching from another platform?</h2>
          <p className="mt-2 text-muted-foreground">Honest comparisons, not smug feature grids.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competitors.map((slug) => (
              <Link
                key={slug}
                href={`/compare/${slug}`}
                className="group flex items-center justify-between rounded-xl border bg-card p-4 transition-colors hover:border-brand/40 hover:bg-card"
              >
                <div>
                  <div className="font-medium capitalize">Ciel vs {slug}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">Migration guide included</div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="border-b py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Customers
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">Teams who switched</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quotes.map((t) => (
              <blockquote key={t.author} className="rounded-2xl border bg-card p-6 shadow-card">
                <p className="text-pretty text-[15px] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 flex items-center gap-3">
                  <GradientAvatar seed={t.author} size="md" />
                  <span className="text-sm">
                    <span className="font-medium">{t.author}</span>
                    <span className="block text-muted-foreground">{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="glow-brand pointer-events-none absolute inset-x-0 bottom-0 h-80" />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to ship with clarity?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Spin up a workspace in minutes. Keep your costs, security, and deploy state in plain sight.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Create your workspace <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact-sales">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
