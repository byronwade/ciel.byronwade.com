import Link from "next/link";
import { PageHeader, UnifiedEventTable } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/lib/mock";

export default async function ActivityPage() {
  const events = await getEvents();

  return (
    <div>
      <PageHeader
        title="Activity"
        nextAction={{ label: "Export", href: "/app/activity?dialog=export-activity" }}
      />
      <Card>
        <CardHeader><CardTitle className="text-sm">Unified event stream</CardTitle></CardHeader>
        <CardContent>
          <UnifiedEventTable events={events} />
        </CardContent>
      </Card>
    </div>
  );
}
