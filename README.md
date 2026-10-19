# MVPeters + Spaced

Two independently deployable websites in one pnpm workspace. Both use React 19,
TypeScript, TanStack Start with file-based TanStack Router routes, Vite 8, and
Tailwind CSS v4. Pages render on the server; navigation and interactions hydrate
in the browser.

```text
apps/
  mvpeters/          mvpeters.com — Simon’s personal website
  spaced/            spaced.be — the studio website, migrated from Webflow
packages/
  ui/                shared React components, utilities, and Tailwind theme tokens
  config/            shared TypeScript settings and Vite/Start/Tailwind/Nitro pipeline
tests/               production browser checks for both sites
```

## Local development

Use Node 24 (see `.node-version`) and pnpm 11.18.0.

```sh
pnpm install
pnpm dev
```

- MVPeters: <http://localhost:4300>
- Spaced: <http://localhost:4301>

Run one site with `pnpm dev:mvpeters` or `pnpm dev:spaced`.
Neither website needs API credentials for its current features.

## Build and verify

```sh
pnpm build                   # production builds for both sites
pnpm build:vercel            # generate Vercel functions and static assets locally
pnpm typecheck               # all packages, apps, and test configuration
pnpm exec playwright install chromium
pnpm test                    # production browser checks on desktop and mobile
pnpm check                   # build, typecheck, and browser checks
```

The browser checks start isolated production servers on ports 3100 and 3101.
They cover server-rendered content, metadata, assets, theme persistence,
testimonials, video controls, Spaced’s accordions and galleries, legacy links,
404 responses, hydration errors, and horizontal overflow.

## Working on the websites

- Add pages in each app’s `src/routes/`. TanStack generates `routeTree.gen.ts`
  during development/builds; keep the generated file committed and never edit it.
- Keep copy, brand assets, and site-specific components in the app. MVPeters’
  testimonials live in `apps/mvpeters/src/content/`; Spaced’s projects, phases,
  and values live in `apps/spaced/src/content/`.
- Import shared components from `@website/ui/button`, `@website/ui/dialog`, etc.
  Shared packages export source directly; they do not need a separate build.
- Each app imports `tailwindcss` and `@website/ui/styles.css` from its CSS entry,
  and explicitly scans shared UI with `@source`. Shared `@theme` definitions
  provide semantic utilities; each app overrides its brand variables locally.
  There is no Tailwind v3 JavaScript configuration or Webflow runtime.
- Add genuinely shared dependencies to the catalog in `pnpm-workspace.yaml` so
  both apps use the same version. pnpm’s recursive scripts handle the small
  workspace without an additional build orchestrator.

## Deployment

Build a site with `pnpm build:mvpeters` or `pnpm build:spaced`. Nitro produces
each app’s `.output/` directory. To run a Node production server:

```sh
PORT=4300 pnpm --filter @website/mvpeters start
PORT=4301 pnpm --filter @website/spaced start
```

Both existing Vercel projects are configured in the `spacedbe` team:

| Vercel project | App root | Production domains |
| --- | --- | --- |
| `website` | `apps/mvpeters` | `mvpeters.com`, `www.mvpeters.com` |
| `webflow-spaced` | `apps/spaced` | `spaced.be`, `www.spaced.be` |

Both connect to `mvpeters-com/website`, use the TanStack Start framework and Node
24, and allow source files outside the app root for shared workspace packages.
The old Astro/static-output settings and forced npm installation are cleared.
Existing domain redirects and deployment protection are retained.

Each app’s `vercel.json` defines `corepack pnpm install --frozen-lockfile` and
`corepack pnpm run build`. Corepack reads the exact pnpm version from the root
`packageManager` field. Nitro automatically creates Vercel’s Build Output API
directory on Vercel; leave the project’s Output Directory override unset.

Run CLI deployments from the **repository root**, with the intended project:

```sh
vercel deploy --project website --scope spacedbe
vercel deploy --project webflow-spaced --scope spacedbe
```

These create previews. Production releases go through a pull request into `main`.
After the checks pass, merging the pull request triggers both Vercel projects to
deploy to their production domains. CLI previews can deploy the current working
tree, but do not replace the repository’s production release path.
The root `.vercelignore` excludes local backups, the old Webflow checkout,
environment files, installed dependencies, and generated build/test output.

This setup follows Vercel’s [TanStack Start integration](https://vercel.com/docs/frameworks/full-stack/tanstack-start)
and [monorepo configuration](https://vercel.com/docs/monorepos).

See [migration notes](docs/migration.md) for the retained behavior and source archives.

For MVPeters' next version, use the `codex/mvpeters-dev` branch and its Vercel
Preview deployment. See the [development review workflow](docs/development.md).
