"use client";

import { PageHeader, SecretRow } from "@/components/ciel";
import { Button } from "@/components/ui/button";
import { mockSecrets } from "@/lib/mock";
import { useDialog } from "@/hooks/use-dialog";

export default function EnvironmentPage() {
  const { openDialog } = useDialog();

  return (
    <div>
      <PageHeader
        title="Environment Variables"
        scope="Production"
        state="1 variable changed — redeploy required"
        nextAction={{ label: "Add Secret", href: "?dialog=add-secret" }}
      />
      <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-sm mb-4">
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
      <Button variant="outline" className="mt-4" onClick={() => openDialog("import-env")}>
        Import variables
      </Button>
    </div>
  );
}
