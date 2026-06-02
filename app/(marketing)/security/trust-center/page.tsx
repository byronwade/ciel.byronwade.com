import type { Metadata } from "next";
import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/ciel";

export const metadata: Metadata = {
  title: "Trust Center",
  description: "Compliance posture, subprocessors, and security practices for Ciel.",
};

export default function TrustCenterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Trust Center</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Encryption", desc: "Secrets encrypted at rest. TLS in transit." },
          { title: "Access control", desc: "Passkeys, TOTP, step-up reauth for sensitive actions." },
          { title: "Compliance", desc: "SOC 2 Type II in progress." },
          { title: "Incident response", desc: "Public status page and post-incident reports." },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader><CardTitle className="text-base">{item.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.desc}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
