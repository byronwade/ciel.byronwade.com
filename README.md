# Ciel

Frontend-first deployment platform — predictable cost, understandable security, legible deployment states.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (base-ui)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  (marketing)/     Public marketing site
  auth/            Authentication & recovery flows
  app/
    (workspace)/   Workspace shell (overview, billing, team, …)
    projects/[project]/  Project shell (deployments, domains, spend, …)
components/
  ciel/            Domain components (StatusPill, BudgetMeter, …)
  shells/          Layout shells
  dialogs/         Route-backed dialog host (?dialog= / ?panel=)
lib/
  mock/            Typed mock data fixtures
  data/            Data access layer (swap mock → API here)
  routes.ts        Navigation config
  dialog-registry.ts
```

## Phase 1 scope

This is a **frontend prototype** with mock data and stubbed auth. No real Git OAuth, deploy pipeline, or backend yet.

## Key flows to demo

1. **Signup → deploy**: `/auth/signup` → `/auth/verify-email` → `/app/overview?welcome=1` → `/app/projects/new/source`
2. **Budget control**: `/app/usage`, `/app/projects/[id]/spend?dialog=set-budget`
3. **Failed build recovery**: `/app/projects/proj_dashboard/deployments/dep_2`
4. **Domain setup**: `/app/projects/proj_docs/domains?dialog=add-domain`
5. **Preview review**: `/app/projects/proj_marketing/previews/prev_1?dialog=share-preview`
6. **Import hub**: `/app/import` → Vercel / Netlify / Render migration flows
7. **Design system**: `/app/design-system` — component reference gallery

## Features

- Route-backed overlays: `?dialog=` (modal/sheet) and `?panel=` (side panel)
- Dark mode via system preference or header toggle
- Breadcrumbs + workspace switcher in app header
- First-run workspace setup on `/app/overview?welcome=1`
- Trust banner on marketing and app layouts when incidents are active
- Keyboard shortcuts: `⌘K` palette, `G` then `P`/`O`/`D`, `?` for help

## Build

```bash
npm run build
npm run verify:routes
```
