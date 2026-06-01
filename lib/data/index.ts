/**
 * Data access layer for Ciel.
 *
 * Phase 1: delegates to typed mock fixtures in `lib/mock/`.
 * Phase 2: swap implementations here to call real API routes or Convex/Supabase
 * without changing page components or hooks.
 */
export {
  getWorkspace,
  mockWorkspace,
  getProjects,
  getProject,
  mockProjects,
  getDeployments,
  getDeployment,
  mockDeployments,
  getPreviews,
  getPreview,
  mockPreviews,
  getDomains,
  getDomain,
  mockDomains,
  getSecrets,
  mockSecrets,
  getEvents,
  mockEvents,
  getTrafficAttribution,
  getLineItems,
  mockTrafficAttribution,
  mockLineItems,
  getTeamMembers,
  getAuthorizedApps,
  mockTeamMembers,
  mockAuthorizedApps,
  getActiveIncidents,
  getIncidentHistory,
  mockIncidents,
  getCompetitor,
  getCompetitors,
  mockCompetitors,
} from "@/lib/mock";
