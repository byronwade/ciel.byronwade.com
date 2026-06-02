"use client";

import { PageHeader, SecretRow } from "@/components/ciel";
import { Button } from "@/components/ui/button";
import { mockSecrets } from "@/lib/mock";
import { useDialog } from "@/hooks/use-dialog";

export default function EnvironmentPage() {
  const { openDialog, openPanel } = useDialog();

  return (
    <div>
      <PageHeader
        title="Environment Variables"
        scope="Production"
        state="1 variable changed — redeploy required"
        nextAction={{ label: "Add Secret", href: "?dialog=add-secret" }}
      />
      <div className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm mb-4">
        Environment changes do not affect past deployments. <Button variant="link" className="h-auto p-0 text-sm">Redeploy latest</Button>
      </div>
      <div className="flex flex-col gap-2">
        {mockSecrets.map((secret) => (
          <SecretRow
            key={secret.id}
            secret={secret}
            onReveal={() => openDialog("reveal-secret")}
            onRotate={() => openDialog("rotate-secret")}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={() => openDialog("import-env")}>
          Import variables
        </Button>
        <Button variant="ghost" onClick={() => openPanel("secret-access-history")}>
          View access history
        </Button>
      </div>
    </div>
  );
}
