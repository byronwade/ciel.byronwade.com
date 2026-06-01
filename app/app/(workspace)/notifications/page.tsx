import { PageHeader } from "@/components/ciel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { message: "Deployment promoted to production on Marketing Site", time: "2 hours ago", read: false },
  { message: "Budget threshold reached on Documentation (82%)", time: "5 hours ago", read: false },
  { message: "Jordan Lee joined the workspace", time: "1 day ago", read: true },
  { message: "SSL certificate issued for acme.com", time: "2 days ago", read: true },
];

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" />
      <div className="flex flex-col gap-2">
        {notifications.map((n) => (
          <Card key={n.message} className={n.read ? "opacity-60" : ""}>
            <CardContent className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="text-sm">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <Badge variant="default" className="shrink-0">New</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
