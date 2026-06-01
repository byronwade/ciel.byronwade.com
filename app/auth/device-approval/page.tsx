import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DeviceApprovalPage() {
  return (
    <SimpleAuthPage title="Approve new device" description="Someone is trying to sign in from a new device.">
      <Card>
        <CardContent className="pt-4 text-sm flex flex-col gap-1">
          <div><strong>Browser:</strong> Chrome 124</div>
          <div><strong>OS:</strong> macOS 15</div>
          <div><strong>Location:</strong> San Francisco, CA</div>
          <div><strong>Time:</strong> Just now</div>
        </CardContent>
      </Card>
      <div className="flex gap-2 mt-4">
        <Button className="flex-1" asChild><Link href="/app/overview">Approve</Link></Button>
        <Button variant="outline" className="flex-1" asChild><Link href="/auth/login">Deny</Link></Button>
      </div>
    </SimpleAuthPage>
  );
}
