import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For personal projects and experiments",
    features: ["3 projects", "10 GB bandwidth", "Preview deployments", "Password-protected previews"],
  },
  {
    name: "Pro",
    price: "$15",
    description: "For professional developers and small teams",
    features: ["Unlimited projects", "100 GB included", "Traffic attribution", "Project-level budgets", "Passkeys + TOTP"],
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    description: "For teams that need shared controls",
    features: ["Everything in Pro", "500 GB included", "Team roles", "Activity timeline", "SSO ready"],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Simple, predictable pricing</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          No seat surprises. No uncapped billing by default. Every plan includes preview protection and traffic attribution.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-16">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.highlighted ? "border-primary shadow-md" : ""}>
            <CardHeader>
              {plan.highlighted && <Badge className="w-fit mb-2">Most popular</Badge>}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} asChild>
                <Link href="/auth/signup">Get started</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Billing modes</CardTitle>
          <CardDescription>Choose how Ciel responds when you approach your budget cap</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { mode: "Hard stop", desc: "Freeze affected environment when cap is reached" },
            { mode: "Grace buffer", desc: "Allow 10% overage before pausing" },
            { mode: "Auto-scale ceiling", desc: "Scale with a hard maximum you define" },
            { mode: "Prepaid only", desc: "No overages — service stops at zero balance" },
          ].map((item) => (
            <div key={item.mode} className="rounded-md border p-3">
              <div className="font-medium text-sm">{item.mode}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/pricing/calculator">Open traffic calculator</Link>
        </Button>
      </div>
    </div>
  );
}
