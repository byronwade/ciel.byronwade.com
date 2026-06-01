import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/ciel";

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Security at Ciel</h1>
      <p className="text-muted-foreground mb-8">Security is not a tab — it is the operating surface.</p>
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {[
          { title: "Passkey-first auth", desc: "Phishing-resistant authentication on every plan" },
          { title: "Secret masking", desc: "Reveal requires step-up reauth; access is logged" },
          { title: "Preview protection", desc: "Password, link-only, and team-only modes standard" },
          { title: "Activity timeline", desc: "Deploys, secret views, and token changes in one stream" },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex items-center gap-3 mb-8">
        <StatusPill status="ready" label="All systems secure" />
        <Button variant="outline" asChild><Link href="/security/trust-center">View Trust Center</Link></Button>
        <Button variant="outline" asChild><Link href="/security/incident-history">Incident history</Link></Button>
      </div>
    </div>
  );
}
