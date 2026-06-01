import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div>
      <PageHeader title="Support" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm">Documentation</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Guides for getting started, domains, security, and troubleshooting.
            <Button variant="link" className="h-auto p-0 mt-2" asChild><Link href="/docs">Browse docs</Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Report an issue</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Attach deployment context automatically when reporting.
            <Button variant="link" className="h-auto p-0 mt-2" asChild><Link href="?dialog=report-incident">Report incident</Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">System status</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Check current platform health and incident history.
            <Button variant="link" className="h-auto p-0 mt-2" asChild><Link href="/status">View status</Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Contact us</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Pro and Team plans include priority email support.
            <Button variant="link" className="h-auto p-0 mt-2" asChild><Link href="/contact">Send message</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
