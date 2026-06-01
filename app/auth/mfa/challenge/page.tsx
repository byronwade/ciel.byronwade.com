"use client";

import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { CodeInput } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Fingerprint } from "lucide-react";

export default function MfaChallengePage() {
  return (
    <SimpleAuthPage title="Verify it's you" description="Use passkey or enter your authenticator code.">
      <Button variant="outline" className="w-full mb-4"><Fingerprint data-icon="inline-start" />Use passkey</Button>
      <CodeInput />
      <div className="mt-4 text-center text-sm">
        <Link href="/auth/mfa/recovery" className="text-muted-foreground hover:text-foreground">Try another method</Link>
      </div>
    </SimpleAuthPage>
  );
}
