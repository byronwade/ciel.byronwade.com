import { MarketingPage } from "@/components/marketing/marketing-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function ContactPage() {
  return (
    <MarketingPage title="Contact" description="Questions, feedback, or support — we read every message.">
      <FieldGroup className="max-w-md">
        <Field><FieldLabel>Name</FieldLabel><Input /></Field>
        <Field><FieldLabel>Email</FieldLabel><Input type="email" /></Field>
        <Field><FieldLabel>Message</FieldLabel><Textarea rows={5} /></Field>
        <Button className="w-fit">Send message</Button>
      </FieldGroup>
    </MarketingPage>
  );
}
