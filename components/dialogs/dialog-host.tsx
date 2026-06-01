"use client";

import { Suspense } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { dialogRegistry, panelRegistry, type DialogDefinition } from "@/lib/dialog-registry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ContextSidePanel } from "@/components/ciel/context-side-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const dialogSuccessMessages: Record<string, string> = {
  "deploy-now": "Deployment queued for main (f4a9c2e)",
  "set-budget": "Budget limits updated",
  "add-domain": "Domain added — verify DNS to go live",
  "add-secret": "Secret saved to selected environment",
  "rotate-secret": "Secret rotated — redeploy to apply",
  "share-preview": "Preview share link updated",
  "protect-preview": "Preview protection enabled",
  "promote-preview": "Preview promoted to production",
  "rollback-deployment": "Rollback initiated",
  "pause-project": "Project paused",
  "resume-project": "Project resumed with new budget cap",
  "invite-member": "Invitation sent",
  "delete-project": "Project scheduled for deletion",
  "upgrade-plan": "Plan upgrade confirmed",
  "export-activity": "Export started — check email when ready",
  "report-incident": "Incident report submitted",
};

function overlaySuccessMessage(id: string) {
  return dialogSuccessMessages[id] ?? "Saved successfully";
}

function OverlayForm({ id }: { id: string }) {
  return <DialogForm id={id} />;
}

function OverlayFooter({ def, onClose, onSubmit }: { def: DialogDefinition; onClose: () => void; onSubmit: () => void }) {
  return (
    <>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button onClick={onSubmit}>{def.confirmRequired ? "Confirm" : "Save"}</Button>
    </>
  );
}

function DialogHostInner() {
  const { dialog, panel, closeOverlay } = useDialog();
  const dialogDef = dialog ? dialogRegistry[dialog] : null;
  const panelDef = panel ? panelRegistry[panel] : null;

  const handleSubmit = (id: string) => {
    toast.success(overlaySuccessMessage(id));
    closeOverlay();
  };

  return (
    <>
      {dialogDef && dialogDef.type === "sheet" && (
        <Sheet open onOpenChange={(v) => !v && closeOverlay()}>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{dialogDef.title}</SheetTitle>
              {dialogDef.description && <SheetDescription>{dialogDef.description}</SheetDescription>}
            </SheetHeader>
            <div className="px-4 pb-4"><OverlayForm id={dialogDef.id} /></div>
            <SheetFooter>
              <OverlayFooter def={dialogDef} onClose={closeOverlay} onSubmit={() => handleSubmit(dialogDef.id)} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      {dialogDef && dialogDef.type !== "sheet" && (
        <Dialog open onOpenChange={(v) => !v && closeOverlay()}>
          <DialogContent className={dialogDef.type === "fullscreen" ? "max-w-4xl max-h-[90vh] overflow-y-auto" : undefined}>
            <DialogHeader>
              <DialogTitle>{dialogDef.title}</DialogTitle>
              {dialogDef.description && <DialogDescription>{dialogDef.description}</DialogDescription>}
            </DialogHeader>
            <OverlayForm id={dialogDef.id} />
            <DialogFooter>
              <OverlayFooter def={dialogDef} onClose={closeOverlay} onSubmit={() => handleSubmit(dialogDef.id)} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {panelDef && (
        <ContextSidePanel open onClose={closeOverlay} title={panelDef.title} description={panelDef.description}>
          <PanelForm id={panelDef.id} />
        </ContextSidePanel>
      )}
    </>
  );
}

function DialogForm({ id }: { id: string }) {
  switch (id) {
    case "add-domain":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Domain type</Label>
            <Select defaultValue="subdomain">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="apex">Apex</SelectItem>
                <SelectItem value="subdomain">Subdomain</SelectItem>
                <SelectItem value="wildcard">Wildcard</SelectItem>
                <SelectItem value="preview">Preview subdomain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Domain name</Label>
            <Input placeholder="docs.example.com" />
          </div>
        </div>
      );
    case "import-env":
      return (
        <div className="flex flex-col gap-4">
          <Textarea placeholder="Paste .env contents..." className="font-mono min-h-[200px]" />
          <p className="text-xs text-muted-foreground">Review parsed variables before saving. Secrets will be masked by default.</p>
        </div>
      );
    case "protect-preview":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Visibility</Label>
            <Select defaultValue="password">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="password">Password protected</SelectItem>
                <SelectItem value="team">Team only</SelectItem>
                <SelectItem value="link">Link only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" />
          </div>
        </div>
      );
    case "rotate-secret":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><Label>New value</Label><Input type="password" /></div>
          <div className="flex flex-col gap-2">
            <Label>Apply</Label>
            <Select defaultValue="now">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Rotate immediately</SelectItem>
                <SelectItem value="staged">Stage for next deploy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "set-budget":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Monthly cap ($)</Label>
            <Input type="number" defaultValue="150" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Enforcement mode</Label>
            <Select defaultValue="grace_buffer">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hard_stop">Hard stop</SelectItem>
                <SelectItem value="grace_buffer">Grace buffer</SelectItem>
                <SelectItem value="auto_scale">Auto-scale with ceiling</SelectItem>
                <SelectItem value="prepaid">Prepaid only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Alert threshold (%)</Label>
            <Input type="number" defaultValue="80" />
          </div>
        </div>
      );
    case "share-preview":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Link type</Label>
            <Select defaultValue="branch">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="branch">Branch link</SelectItem>
                <SelectItem value="commit">Commit link</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Recipients (comma-separated)</Label>
            <Input placeholder="reviewer@company.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Message</Label>
            <Textarea placeholder="Please review the updated pricing page" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Expires</Label>
            <Select defaultValue="7d">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 hours</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "promote-preview":
      return (
        <div className="flex flex-col gap-4 text-sm">
          <p>This will promote the preview deployment to production on the following domains:</p>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>acme.com</li>
            <li>www.acme.com</li>
          </ul>
          <p className="text-muted-foreground">Expected downtime: zero (atomic traffic switch).</p>
        </div>
      );
    case "deploy-now":
      return (
        <div className="flex flex-col gap-4 text-sm">
          <p>Deploy the latest commit on <code className="font-mono">main</code> to production?</p>
          <div className="rounded border p-3 text-muted-foreground">
            <div>Commit: <span className="font-mono text-foreground">f4a9c2e</span> — Fix checkout redirect</div>
            <div className="mt-1">Estimated build time: ~2 min · Est. cost: $0.04</div>
          </div>
        </div>
      );
    case "delete-project":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">Type the project name to confirm deletion. Consider exporting config first.</p>
          <Input placeholder="project-name" />
        </div>
      );
    case "invite-member":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="colleague@company.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Role</Label>
            <Select defaultValue="developer">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "verify-dns":
      return (
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between rounded border p-2">
            <span>TXT _ciel.docs</span>
            <span className="text-red-600">Missing</span>
          </div>
          <div className="flex items-center justify-between rounded border p-2">
            <span>CNAME docs</span>
            <span className="text-emerald-600">Found</span>
          </div>
        </div>
      );
    case "retry-ssl":
      return <p className="text-sm text-muted-foreground">Retry SSL certificate issuance? This may take up to 15 minutes. No downtime expected if DNS is correct.</p>;
    case "add-secret":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><Label>Key</Label><Input placeholder="API_KEY" className="font-mono" /></div>
          <div className="flex flex-col gap-2"><Label>Value</Label><Input type="password" /></div>
          <div className="flex flex-col gap-2">
            <Label>Scope</Label>
            <Select defaultValue="production">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="preview">Preview</SelectItem>
                <SelectItem value="all">All environments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "reveal-secret":
      return <p className="text-sm text-muted-foreground">Verify your identity to reveal this secret value. Access will be logged.</p>;
    case "rollback-deployment":
      return (
        <div className="text-sm flex flex-col gap-2">
          <p>Roll back to deployment <code className="font-mono">a1b2c3d</code> from 2 hours ago?</p>
          <p className="text-amber-600">Warning: Environment variables have changed since this deployment.</p>
        </div>
      );
    case "pause-project":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><Label>Reason</Label><Input placeholder="Maintenance window" /></div>
          <div className="flex flex-col gap-2">
            <Label>Scope</Label>
            <Select defaultValue="production">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production only</SelectItem>
                <SelectItem value="all">All environments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "resume-project":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">Production was paused due to budget cap. Set a new limit to resume.</p>
          <div className="flex flex-col gap-2"><Label>New monthly cap ($)</Label><Input type="number" defaultValue="200" /></div>
        </div>
      );
    case "change-role":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>New role</Label>
            <Select defaultValue="developer">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "revoke-app":
      return <p className="text-sm text-muted-foreground">This will immediately invalidate all tokens for this app. Connected webhooks will stop firing.</p>;
    case "export-activity":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><Label>Date range</Label><Input defaultValue="Last 30 days" /></div>
          <div className="flex flex-col gap-2">
            <Label>Include</Label>
            <Select defaultValue="all">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All event types</SelectItem>
                <SelectItem value="security">Security only</SelectItem>
                <SelectItem value="billing">Billing only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "upgrade-plan":
      return (
        <div className="text-sm flex flex-col gap-2">
          <p>Upgrade to Team plan: $49/mo with 500 GB included bandwidth.</p>
          <p className="text-muted-foreground">Prorated charge today: $34.50</p>
        </div>
      );
    case "add-payment-method":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><Label>Card number</Label><Input placeholder="4242 4242 4242 4242" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2"><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
            <div className="flex flex-col gap-2"><Label>CVC</Label><Input placeholder="123" /></div>
          </div>
        </div>
      );
    case "report-incident":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Severity</Label>
            <Select defaultValue="minor">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="minor">Minor</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2"><Label>Description</Label><Textarea rows={4} /></div>
        </div>
      );
    case "enable-passkey":
      return <p className="text-sm text-muted-foreground">Use your device biometrics or security key to register a passkey for faster, phishing-resistant sign-in.</p>;
    case "regenerate-recovery-codes":
      return <p className="text-sm text-muted-foreground">This will invalidate all existing recovery codes. New codes will be shown once — store them securely.</p>;
    case "sign-out-all-sessions":
      return <p className="text-sm text-muted-foreground">This will sign out all devices except the current one.</p>;
    case "repo-permission-help":
      return (
        <div className="text-sm flex flex-col gap-3">
          <p className="font-medium">Missing repository access</p>
          <p className="text-muted-foreground">The repository owner must grant Ciel access to configure webhooks. Required scopes: repo read, webhook write.</p>
          <ol className="list-decimal pl-5 text-muted-foreground flex flex-col gap-1">
            <li>Ask the repo owner to install the Ciel GitHub app</li>
            <li>Or transfer repository ownership to your account</li>
            <li>Then click Reconnect in project Git settings</li>
          </ol>
        </div>
      );
    case "connect-git-provider":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {["GitHub", "GitLab", "Bitbucket"].map((p) => (
            <div key={p} className="rounded-md border p-4 text-center text-sm font-medium hover:bg-muted/50 cursor-pointer">{p}</div>
          ))}
        </div>
      );
    default:
      return <p className="text-sm text-muted-foreground">Configure {id.replace(/-/g, " ")}.</p>;
  }
}

function PanelForm({ id }: { id: string }) {
  switch (id) {
    case "deployment-diff":
      return (
        <div className="flex flex-col gap-3 text-sm font-mono">
          <div className="text-emerald-600">+ src/pages/pricing.tsx (4.2 KB)</div>
          <div className="text-emerald-600">+ public/images/hero.webp (128 KB)</div>
          <div className="text-red-600">- src/pages/old-pricing.tsx (3.8 KB)</div>
          <div className="text-muted-foreground mt-2">3 routes changed · +128.4 KB asset weight</div>
        </div>
      );
    case "dns-detection":
      return (
        <div className="flex flex-col gap-3 text-sm">
          <p>Detected provider: <strong>Cloudflare</strong></p>
          <p className="text-muted-foreground">Use CNAME flattening for apex domains. Set proxy status to &quot;DNS only&quot; during verification.</p>
        </div>
      );
    case "secret-access-history":
      return (
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between border-b py-2"><span>Deployment dep_1</span><span className="text-muted-foreground">Jun 1, 08:00</span></div>
          <div className="flex justify-between border-b py-2"><span>Alex Chen (manual reveal)</span><span className="text-muted-foreground">May 28, 14:30</span></div>
        </div>
      );
    case "domain-problems":
      return (
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-medium">Likely issue: TXT record missing</p>
          <ol className="list-decimal pl-5 text-muted-foreground flex flex-col gap-2">
            <li>Add TXT record <code className="font-mono">_ciel.docs</code> with value <code className="font-mono">ciel-verify=def456</code></li>
            <li>Wait for DNS propagation (up to 48 hours)</li>
            <li>Click Verify DNS to re-check</li>
          </ol>
        </div>
      );
    default:
      return <p className="text-sm text-muted-foreground">{id.replace(/-/g, " ")} details.</p>;
  }
}

export function DialogHost() {
  return (
    <Suspense fallback={null}>
      <DialogHostInner />
    </Suspense>
  );
}
