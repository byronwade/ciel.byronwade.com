import type { Domain } from "@/types";

export const mockDomains: Domain[] = [
  {
    id: "dom_1",
    projectId: "proj_marketing",
    name: "acme.com",
    type: "apex",
    environment: "production",
    dnsStatus: "ready",
    sslStatus: "ready",
    verified: true,
    lastCheckAt: "2026-06-01T10:00:00Z",
    records: [
      { type: "A", name: "@", value: "76.76.21.21", status: "found" },
      { type: "TXT", name: "_ciel", value: "ciel-verify=abc123", status: "found" },
    ],
  },
  {
    id: "dom_2",
    projectId: "proj_marketing",
    name: "www.acme.com",
    type: "subdomain",
    environment: "production",
    dnsStatus: "ready",
    sslStatus: "ready",
    verified: true,
    lastCheckAt: "2026-06-01T10:00:00Z",
    records: [{ type: "CNAME", name: "www", value: "ciel.app", status: "found" }],
  },
  {
    id: "dom_3",
    projectId: "proj_docs",
    name: "docs.acme.com",
    type: "subdomain",
    environment: "production",
    dnsStatus: "warning",
    sslStatus: "building",
    verified: false,
    lastCheckAt: "2026-06-01T09:30:00Z",
    nextRetryAt: "2026-06-01T11:30:00Z",
    records: [
      { type: "CNAME", name: "docs", value: "ciel.app", status: "found" },
      { type: "TXT", name: "_ciel.docs", value: "ciel-verify=def456", status: "missing" },
    ],
  },
  {
    id: "dom_4",
    projectId: "proj_dashboard",
    name: "admin.acme.com",
    type: "subdomain",
    environment: "production",
    dnsStatus: "failing",
    sslStatus: "paused",
    verified: false,
    lastCheckAt: "2026-05-30T12:00:00Z",
    records: [
      { type: "CNAME", name: "admin", value: "wrong-target.com", status: "mismatched" },
    ],
  },
];

export async function getDomains(projectId?: string): Promise<Domain[]> {
  if (projectId) return mockDomains.filter((d) => d.projectId === projectId);
  return mockDomains;
}

export async function getDomain(id: string): Promise<Domain | undefined> {
  return mockDomains.find((d) => d.id === id);
}
