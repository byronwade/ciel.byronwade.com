import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SsoPage() {
  return (
    <SimpleAuthPage title="Single sign-on" description="Continue with your organization's identity provider.">
      <Button className="w-full" asChild><Link href="/app/overview">Continue with SSO</Link></Button>
    </SimpleAuthPage>
  );
}
