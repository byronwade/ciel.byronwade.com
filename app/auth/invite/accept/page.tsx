import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InviteAcceptPage() {
  return (
    <SimpleAuthPage title="Accept invitation" description="You've been invited to join Acme Corp on Ciel as Developer.">
      <Button className="w-full" asChild><Link href="/auth/signup">Accept & create account</Link></Button>
    </SimpleAuthPage>
  );
}
