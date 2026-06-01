"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function FirstRunSetupInner() {
  const searchParams = useSearchParams();
  const isFirstRun = searchParams.get("welcome") === "1";

  if (!isFirstRun) return null;

  return (
    <Card className="mb-6 border-primary/30">
      <CardHeader>
        <CardTitle className="text-base">Welcome to Ciel — set up your workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup className="max-w-md">
          <Field>
            <FieldLabel>Workspace name</FieldLabel>
            <Input defaultValue="Acme Corp" />
          </Field>
          <Field>
            <FieldLabel>Primary goal</FieldLabel>
            <Select defaultValue="marketing">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">Marketing site</SelectItem>
                <SelectItem value="docs">Documentation</SelectItem>
                <SelectItem value="spa">SPA / dashboard</SelectItem>
                <SelectItem value="migration">Migration from competitor</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <LinkButton href="/app/projects/new/source" size="sm" className="w-fit mt-2">
            Continue to first project
          </LinkButton>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

export function FirstRunSetup() {
  return (
    <Suspense fallback={null}>
      <FirstRunSetupInner />
    </Suspense>
  );
}
