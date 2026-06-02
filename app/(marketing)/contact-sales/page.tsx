import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/marketing-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Contact Sales",
  description: "Talk to sales about enterprise plans, SSO, and volume pricing.",
};

export default function ContactSalesPage() {
  return (
    <MarketingPage title="Contact Sales" description="Enterprise plans with SSO, SCIM, compliance docs, and dedicated support.">
      <FieldGroup className="max-w-md">
        <Field><FieldLabel>Company</FieldLabel><Input /></Field>
        <Field><FieldLabel>Work email</FieldLabel><Input type="email" /></Field>
        <Field><FieldLabel>Team size</FieldLabel>
          <Select defaultValue="11-50">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1–10</SelectItem>
              <SelectItem value="11-50">11–50</SelectItem>
              <SelectItem value="51-200">51–200</SelectItem>
              <SelectItem value="200+">200+</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field><FieldLabel>What are you looking for?</FieldLabel><Textarea rows={4} placeholder="SSO, compliance, volume pricing..." /></Field>
        <Button className="w-fit">Request demo</Button>
      </FieldGroup>
    </MarketingPage>
  );
}
