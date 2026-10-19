# Stack migration

The repository now owns both websites. Apps have separate routes, metadata,
public assets, and branding; the UI primitives and build configuration are shared.
TanStack Start provides server rendering around TanStack Router. This preserves
HTML content for search engines and link previews rather than changing the sites
into client-only applications.

## MVPeters

The current homepage is retained: introduction, interim CTO video and hover
preview, theme switch, testimonials, email contact link, and CV download.
The video loads its Mux player when opened. Its dialog supports keyboard focus,
Escape, playback controls, and portrait/landscape sources.

Unused PlayAI authentication, voice SDKs, referral email actions and modal,
email templates and preview tooling, and unused animation experiments were
removed. The visible introduction copy is preserved, including its AI wording.
The site no longer needs PlayAI or Resend credentials. Vercel Analytics remains
the existing analytics integration.

At the cleanup checkpoint, active MVPeters TypeScript source went from 509 to
384 lines (125 fewer). Eight unused feature/template source files and three
external feature dependencies were removed, dropping 89 installed packages.
The testimonials moved into the app when the email feature stopped sharing them.
The video player and existing analytics were retained for their current uses.
The browser suite has no skipped tests before or after the cleanup.

## Spaced

The Webflow export is rebuilt as React routes and components styled with Tailwind
v4. Original Dutch copy, project galleries, illustrations, local fonts, contact
details, address, and outgoing links are retained. Project panels use native
`details`/`summary` controls, and galleries support scrolling and previous/next
buttons. No jQuery or Webflow CSS/JavaScript ships with the app.

The original scroll-driven splash overlay, automatic marquees, and Lottie scroll
animations are not reproduced in this stack migration. Static exported artwork
remains visible, and original animation JSON files are retained as assets for
future work. The inspiration-session form was hidden in the original Webflow CSS
and has no migrated submission endpoint. The visible email contact still works.
Legacy `/index.html` links redirect permanently to `/`.

Commons Radio is included as a featured project with a server-rendered link to
`https://www.commonsradio.eu/` and a capture of its public homepage. The project
link is crawlable without JavaScript and is not marked `nofollow`.

On the first visit in a browser session, a dismissible announcement explains that
Spaced is now MVPeters and links to `https://mvpeters.com`. Closing it, continuing
to Spaced, or following the link dismisses it for that session. Keyboard focus is
contained while it is open and returns to the Spaced home link on dismissal.

## Source preservation

The original untracked `webflow-spaced/` checkout and its nested Git history are
untouched and ignored by the parent repository. All Spaced assets are copied into
`apps/spaced/public/`; the new app has no dependency on the original folder.

The old MVPeters source and Astro configuration are retained locally in
`.migration-backups/mvpeters-astro/`, which is ignored. They are also recoverable
from the parent repository’s Git history. Only `apps/*` and `packages/*` participate
in the workspace. New clones use the migrated sources and need neither archive.

## Checks and remaining setup

`pnpm check` builds both production servers, checks TypeScript, and runs desktop
and mobile browser journeys. The GitHub Actions workflow runs the same checks.
Browser checks exercise the dialog without depending on a successful external
Mux stream; actual media availability still depends on the existing Mux IDs.

The existing Vercel projects now point at the app roots in the shared repository:
`website` uses `apps/mvpeters`, and `webflow-spaced` uses `apps/spaced`. Both use
TanStack Start, Node 24, and the workspace’s pinned pnpm version through Corepack.
Source files outside each app root remain enabled for the shared packages.
The former Astro preset, forced npm installation, and static `.` output override
are cleared. `.vercelignore` prevents local migration archives and generated
output from being uploaded by the CLI.

Both Vercel preview builds passed. Production domain assignments and redirects
are retained. Production releases use a pull request into `main`; merging after
the checks pass triggers both projects’ Git deployments.
Spaced’s original contact/address and external project links are preserved source
content; they have not been revalidated as current business information.
