import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import Link from "next/link";

export default function PasskeyUpgradePage() {
  return (
    <SimpleAuthPage title="Add a passkey" description="Passkeys are recommended for security and convenience.">
      <Button variant="outline" className="w-full" asChild>
        <Link href="/auth/mfa/setup"><Fingerprint data-icon="inline-start" />Register passkey</Link>
      </Button>
    </SimpleAuthPage>
  );
}
