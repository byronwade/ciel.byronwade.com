import type { Metadata } from "next";
import Link from "next/link";
import { DocsLayout } from "@/components/marketing/docs-layout";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Docs",
  description: "Guides for deploying, importing, domains, preview protection, and security on Ciel.",
};

export default function DocsHomePage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold tracking-tight not-prose">Ciel Documentation</h1>
      <p className="text-muted-foreground not-prose mt-2 mb-8">
        Everything you need to connect a repo, configure domains, protect previews, and understand your bill.
      </p>
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        <Link href="/docs/getting-started" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Getting Started</div>
          <div className="text-sm text-muted-foreground">Connect a repo and deploy in minutes</div>
        </Link>
        <Link href="/docs/domains" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Domains & SSL</div>
          <div className="text-sm text-muted-foreground">DNS concierge with record-by-record health</div>
        </Link>
        <Link href="/docs/security" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Security</div>
          <div className="text-sm text-muted-foreground">Passkeys, secrets, and step-up auth</div>
        </Link>
        <Link href="/docs/pricing" className="rounded-lg border p-4 hover:bg-muted/50">
          <div className="font-medium">Pricing & Budgets</div>
          <div className="text-sm text-muted-foreground">Hierarchical caps and traffic attribution</div>
        </Link>
      </div>
      <div className="not-prose mt-8">
        <Button asChild><Link href="/auth/signup">Connect a Repo</Link></Button>
      </div>
    </DocsLayout>
  );
}
