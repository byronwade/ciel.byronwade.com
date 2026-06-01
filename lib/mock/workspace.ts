import type { Workspace } from "@/types";

export const mockWorkspace: Workspace = {
  id: "ws_1",
  name: "Acme Corp",
  slug: "acme-corp",
  budgetMode: "grace_buffer",
  budgetCap: 500,
  budgetUsed: 412,
  plan: "pro",
};

export async function getWorkspace(): Promise<Workspace> {
  return mockWorkspace;
}
