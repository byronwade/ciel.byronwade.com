import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";

export default function ProfileSettingsPage() {
  return (
    <div>
      <PageHeader title="Profile" scope="Settings" />
      <div className="grid gap-4 max-w-md">
        <Card>
          <CardHeader><CardTitle className="text-sm">Account details</CardTitle></CardHeader>
          <CardContent>
            <FieldGroup>
              <Field><FieldLabel>Name</FieldLabel><Input defaultValue="Alex Chen" /></Field>
              <Field><FieldLabel>Email</FieldLabel><Input defaultValue="alex@acme.com" type="email" /></Field>
              <Button size="sm" className="w-fit mt-2">Save changes</Button>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Security</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Passkey sign-in</span>
              <LinkButton href="?dialog=enable-passkey" variant="outline" size="sm">Enable passkey</LinkButton>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Recovery codes</span>
              <LinkButton href="?dialog=regenerate-recovery-codes" variant="outline" size="sm">Regenerate</LinkButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
