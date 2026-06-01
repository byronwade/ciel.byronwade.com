import { PageHeader } from "@/components/ciel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsPage() {
  return (
    <div>
      <PageHeader title="Profile" scope="Settings" />
      <Card className="max-w-md">
        <CardHeader><CardTitle className="text-sm">Account details</CardTitle></CardHeader>
        <CardContent>
          <FieldGroup>
            <Field><FieldLabel>Name</FieldLabel><Input defaultValue="Alex Chen" /></Field>
            <Field><FieldLabel>Email</FieldLabel><Input defaultValue="alex@acme.com" type="email" /></Field>
            <Button size="sm" className="w-fit mt-2">Save changes</Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
