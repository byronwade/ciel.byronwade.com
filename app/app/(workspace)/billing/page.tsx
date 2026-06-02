import Link from "next/link";
import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getLineItems, mockWorkspace } from "@/lib/mock";

export default async function BillingPage() {
  const lineItems = await getLineItems();
  const total = lineItems.reduce((sum, li) => sum + li.amount, 0);

  return (
    <div>
      <PageHeader
        title="Billing"
        description={`${mockWorkspace.plan} plan · Acme Corp`}
        nextAction={{ label: "Update Billing", href: "/app/billing?dialog=add-payment-method" }}
      />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">This month</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold tabular-nums">${total.toFixed(2)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Plan</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-between gap-2">
            <div className="text-2xl font-bold capitalize">{mockWorkspace.plan}</div>
            <Button variant="outline" size="sm" asChild>
              <Link href="?dialog=upgrade-plan">Upgrade</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Forecast</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold tabular-nums">$189</div></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-sm">Line-item ledger</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.map((li) => (
                <TableRow key={li.id}>
                  <TableCell className="text-sm">{li.description}</TableCell>
                  <TableCell className="text-sm capitalize text-muted-foreground">{li.category}</TableCell>
                  <TableCell className="text-sm text-right tabular-nums">${li.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
