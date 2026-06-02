import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Self-Host",
  description: "Run Ciel on your own infrastructure with configuration parity.",
};

export default function SelfHostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Self-host Ciel</h1>
      <p className="text-muted-foreground mb-8">Portability is a promise, not a footnote. Export your config and run Ciel on your own infrastructure.</p>
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader><CardTitle className="text-base">Who it is for</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Teams with compliance requirements, air-gapped environments, or preference for owned infrastructure.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">How to leave Ciel</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Every project has an export page with open config schema. No lock-in by design.</CardContent>
        </Card>
      </div>
      <Button asChild><Link href="/docs/getting-started">Read self-host docs</Link></Button>
    </div>
  );
}
