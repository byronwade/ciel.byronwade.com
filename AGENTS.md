<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ciel — agent guide

## Scope (read this first)

**Ciel is a frontend-only prototype.** All product behavior is simulated with typed mock data and stubbed auth. There is no backend, no real deploy pipeline, no Git OAuth, and no production database.

Do not propose or implement:

- Backend APIs, server actions that persist data, or database integrations
- Real authentication providers (Clerk, Auth0, Supabase Auth, etc.)
- E2E test suites, CI pipelines for backend services, or infra work
- Swapping `lib/mock/` for a “real” data layer unless the user explicitly asks
- “Next steps” toward production backend, auth, or deployment infrastructure

When a feature needs data, **add or extend mock fixtures** — not API routes.

## What to work on instead

- UI, layout shells, and page content across marketing, auth, workspace, and project routes
- Ciel domain components in `components/ciel/`
- Route-backed overlays: `?dialog=` and `?panel=` via `lib/dialog-registry.ts` and `components/dialogs/dialog-host.tsx`
- Typed mock entities and states in `lib/mock/` (ready, failing, paused, protected, etc.)
- Navigation config in `lib/routes.ts`
- UX polish: empty states, warning banners, loading skeletons, keyboard shortcuts, toasts
- Keeping `npm run build` and `npm run verify:routes` passing

## Mock data & fake auth

| Concern | Location | Notes |
|--------|----------|-------|
| Fixtures | `lib/mock/` | Async `get*` functions return in-memory data |
| Client hooks | `hooks/use-mock-data.ts` | Wraps mock getters for client components |
| Session | `lib/auth/mock-session.ts` | localStorage + cookie (`ciel_session`) |
| Route guard | `middleware.ts` | Redirects unauthenticated `/app/*` to login |

Login/signup flows set a mock session and redirect — no credentials are validated. Dialog confirm buttons show **toast feedback only**; nothing is persisted.

`lib/data/` re-exports mock getters for a stable import path. Treat it as part of the mock layer, not a backend abstraction.

## Layout shells

Four shells, do not nest project inside workspace:

1. **Marketing** — `app/(marketing)/`
2. **Auth** — `app/auth/`
3. **Workspace** — `app/app/(workspace)/`
4. **Project** — `app/app/projects/[project]/` (sibling of workspace, not nested)

## Product identity

- App name is **Ciel** everywhere in code, copy, and URLs (do not reintroduce the old pre-rename codename)
- Positioning: predictable cost, understandable security, legible deployment states
- Preview URLs use `*.ciel.app` in copy and mock data

## Demo paths

Use these to verify UI states:

- Signup/onboarding: `/auth/signup` → verify → `/app/overview?welcome=1`
- Budget paused: `/app/projects/proj_docs/overview` or `/spend`
- Failed build: `/app/projects/proj_dashboard/deployments/dep_2`
- Domain sheet: `/app/projects/proj_docs/domains?dialog=add-domain`
- Import hub: `/app/import`
- Component gallery: `/app/design-system`

## Conventions

- **shadcn v4 / base-ui** — prefer `render` prop on Button; `asChild` works via Button patch but is inconsistent elsewhere
- **Select `onValueChange`** may receive `null` — guard with `(v) => v && setState(v)`
- **Sheet dialogs** — registry entries with `type: "sheet"` render as sheets, not modals
- **Minimize scope** — match existing patterns; do not over-engineer for backend concerns that do not exist
- **No unsolicited README/plan edits** unless the user asks

## Verification

```bash
npm run build
npm run verify:routes
```
