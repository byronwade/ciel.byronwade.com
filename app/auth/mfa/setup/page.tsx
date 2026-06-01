import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import { Fingerprint, KeyRound } from "lucide-react";
import Link from "next/link";

export default function MfaSetupPage() {
  return (
    <SimpleAuthPage title="Set up two-factor authentication" description="Scan the QR code or use a passkey.">
      <div className="flex flex-col gap-2">
        <Button variant="outline" asChild><Link href="/auth/recovery-codes"><Fingerprint data-icon="inline-start" />Use passkey</Link></Button>
        <Button variant="outline" asChild><Link href="/auth/recovery-codes"><KeyRound data-icon="inline-start" />Use authenticator app</Link></Button>
      </div>
    </SimpleAuthPage>
  );
}
