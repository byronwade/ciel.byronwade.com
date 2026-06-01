export type StatusType = "ready" | "warning" | "failing" | "paused" | "protected" | "building" | "queued";

export type BudgetMode = "hard_stop" | "grace_buffer" | "auto_scale" | "prepaid";

export type Environment = "production" | "preview" | "staging";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  budgetMode: BudgetMode;
  budgetCap: number;
  budgetUsed: number;
  plan: "free" | "pro" | "team" | "enterprise";
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  framework: string;
  repo: string;
  branch: string;
  status: StatusType;
  productionUrl: string;
  budgetCap: number;
  budgetUsed: number;
  budgetMode: BudgetMode;
  lastDeployedAt: string;
  domainCount: number;
  previewCount: number;
}

export interface Deployment {
  id: string;
  projectId: string;
  status: StatusType;
  environment: Environment;
  branch: string;
  commit: string;
  commitMessage: string;
  author: string;
  url: string;
  createdAt: string;
  duration?: number;
  phases: DeploymentPhase[];
  parsedIssues?: ParsedIssue[];
  logs?: string;
}

export interface DeploymentPhase {
  name: string;
  status: StatusType;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
}

export interface ParsedIssue {
  title: string;
  description: string;
  likelyCause: string;
  fixAction: string;
  fixHref: string;
  severity: "error" | "warning";
}

export interface Preview {
  id: string;
  projectId: string;
  branch: string;
  commit: string;
  commitMessage: string;
  url: string;
  status: StatusType;
  protection: "public" | "password" | "team" | "link";
  createdAt: string;
  buildDuration: number;
}

export interface Domain {
  id: string;
  projectId: string;
  name: string;
  type: "apex" | "subdomain" | "wildcard" | "preview";
  environment: Environment;
  dnsStatus: StatusType;
  sslStatus: StatusType;
  verified: boolean;
  lastCheckAt: string;
  nextRetryAt?: string;
  records: DnsRecord[];
}

export interface DnsRecord {
  type: string;
  name: string;
  value: string;
  status: "found" | "missing" | "mismatched" | "pending";
}

export interface Secret {
  id: string;
  key: string;
  scope: Environment | "all";
  sensitive: boolean;
  lastRotated?: string;
  lastAccessed?: string;
  masked: boolean;
}

export interface CielEvent {
  id: string;
  type: "build" | "runtime" | "dns" | "billing" | "security" | "activity";
  message: string;
  timestamp: string;
  projectId?: string;
  actor?: string;
  metadata?: Record<string, string>;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "developer" | "viewer";
  mfaEnabled: boolean;
  lastActive: string;
}

export interface AuthorizedApp {
  id: string;
  name: string;
  scopes: string[];
  authorizedAt: string;
  lastUsed?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  category: "traffic" | "preview" | "domains" | "retention" | "overage";
  amount: number;
  quantity?: number;
  unit?: string;
}

export interface TrafficAttribution {
  human: number;
  bot: number;
  verifiedCrawler: number;
  cached: number;
  uncached: number;
  preview: number;
  blocked: number;
}

export interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  impact: "none" | "minor" | "major" | "critical";
  startedAt: string;
  resolvedAt?: string;
  updates: { timestamp: string; message: string }[];
}

export interface CompetitorComparison {
  slug: string;
  name: string;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  migrationSteps: string[];
  concerns: { question: string; answer: string }[];
}
