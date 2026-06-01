import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Link from "next/link";

export default function MfaRecoveryPage() {
  return (
    <SimpleAuthPage title="Account recovery" description="Enter a backup code or use an alternate factor.">
      <FieldGroup>
        <Field>
          <FieldLabel>Backup code</FieldLabel>
          <Input placeholder="xxxx-xxxx" className="font-mono" />
        </Field>
      </FieldGroup>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        <Link href="/app/support" className="underline">Contact support</Link> if you cannot access any factors.
      </p>
    </SimpleAuthPage>
  );
}
