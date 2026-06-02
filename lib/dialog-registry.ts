export type DialogType = "modal" | "sheet" | "fullscreen";

export interface DialogDefinition {
  id: string;
  title: string;
  type: DialogType;
  description?: string;
  confirmRequired?: boolean;
  reauthRequired?: boolean;
}

export const dialogRegistry: Record<string, DialogDefinition> = {
  "connect-git-provider": { id: "connect-git-provider", title: "Connect Git Provider", type: "fullscreen" },
  "repo-permission-help": { id: "repo-permission-help", title: "Fix Repository Permissions", type: "sheet" },
  "import-env": { id: "import-env", title: "Import Environment Variables", type: "sheet" },
  "add-secret": { id: "add-secret", title: "Add Secret", type: "modal" },
  "reveal-secret": { id: "reveal-secret", title: "Reveal Secret", type: "modal", reauthRequired: true },
  "rotate-secret": { id: "rotate-secret", title: "Rotate Secret", type: "sheet", reauthRequired: true },
  "add-domain": { id: "add-domain", title: "Add Domain", type: "sheet" },
  "verify-dns": { id: "verify-dns", title: "Verify DNS Records", type: "modal" },
  "retry-ssl": { id: "retry-ssl", title: "Retry SSL Certificate", type: "modal" },
  "share-preview": { id: "share-preview", title: "Share Preview", type: "modal" },
  "protect-preview": { id: "protect-preview", title: "Protect Preview", type: "sheet" },
  "set-budget": { id: "set-budget", title: "Set Budget", type: "sheet", confirmRequired: true },
  "pause-project": { id: "pause-project", title: "Pause Project", type: "modal", confirmRequired: true },
  "resume-project": { id: "resume-project", title: "Resume Project", type: "modal" },
  "promote-preview": { id: "promote-preview", title: "Promote to Production", type: "modal", confirmRequired: true },
  "deploy-now": { id: "deploy-now", title: "Deploy Now", type: "modal", confirmRequired: true },
  "rollback-deployment": { id: "rollback-deployment", title: "Rollback Deployment", type: "modal", confirmRequired: true },
  "invite-member": { id: "invite-member", title: "Invite Team Member", type: "modal" },
  "change-role": { id: "change-role", title: "Change Role", type: "modal", reauthRequired: true },
  "revoke-app": { id: "revoke-app", title: "Revoke App Access", type: "modal", confirmRequired: true },
  "export-activity": { id: "export-activity", title: "Export Activity", type: "modal" },
  "delete-project": { id: "delete-project", title: "Delete Project", type: "modal", confirmRequired: true, reauthRequired: true },
  "upgrade-plan": { id: "upgrade-plan", title: "Upgrade Plan", type: "modal" },
  "add-payment-method": { id: "add-payment-method", title: "Add Payment Method", type: "sheet" },
  "report-incident": { id: "report-incident", title: "Report Incident", type: "sheet" },
  "enable-passkey": { id: "enable-passkey", title: "Enable Passkey", type: "modal" },
  "regenerate-recovery-codes": { id: "regenerate-recovery-codes", title: "Regenerate Recovery Codes", type: "modal", reauthRequired: true },
  "sign-out-all-sessions": { id: "sign-out-all-sessions", title: "Sign Out All Sessions", type: "modal", reauthRequired: true },
  "create-token": { id: "create-token", title: "Create API Token", type: "modal" },
};

export const panelRegistry: Record<string, DialogDefinition> = {
  "deployment-diff": { id: "deployment-diff", title: "Deployment Diff", type: "sheet" },
  "secret-access-history": { id: "secret-access-history", title: "Secret Access History", type: "sheet" },
  "dns-detection": { id: "dns-detection", title: "DNS Provider Detection", type: "sheet" },
  "domain-problems": { id: "domain-problems", title: "Domain Troubleshooting", type: "sheet" },
};

export function getDialog(id: string) {
  return dialogRegistry[id] ?? null;
}

export function getPanel(id: string) {
  return panelRegistry[id] ?? null;
}
