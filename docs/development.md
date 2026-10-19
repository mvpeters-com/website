# MVPeters development preview

MVPeters has a dedicated development branch, `codex/mvpeters-dev`, for reviewing
the next version before release. The Vercel project is `website`, with app root
`apps/mvpeters`. Production continues to deploy from `main`.

## Review workflow

1. Work on `codex/mvpeters-dev` and push commits to GitHub.
2. Vercel builds a Preview deployment. Share its generated **branch URL** so
   reviewers keep using the same address as the branch changes. A deployment URL
   is available separately when a reviewer needs a fixed version.
3. Run `pnpm check` before review. Keep the development pull request in draft
   while the new pages, case-study content, and media are being prepared.
4. After review, release through a pull request into `main`. Merging triggers
   production deployment; pushing this development branch does not publish to
   `mvpeters.com`.

## Proof of concept

The development preview now contains the agreed page structure:

- `/`: product-development introduction, selected work, services, approach,
  existing testimonials, and project contact.
- `/work`: Shiperise highlighted, with the other five project rows collapsed.
  Home uses the same listing. Commons Radio appears last.
- `/work/shiperise`, `/work/club-gewoon-os`, `/work/niko`, `/work/dcw-platform`,
  `/work/switch-to-eu`, and `/work/commons-radio`: a common case-study structure with context, role/team
  slots, decisions, media, outcomes, and next-project navigation.
- `/about`: background, working philosophy, Spaced transition, tools, and CV.
- `/contact`: email-first project contact with a prefilled email draft.

Project copy lives in `apps/mvpeters/src/content/projects.ts`. The project names
are confirmed; unverified narratives are marked as draft. Commons Radio uses
existing screenshots in `apps/mvpeters/public/work/`. The other projects use
code-rendered illustrative interfaces. Video sections are labeled placeholders;
the existing interim CTO video and testimonials remain functional.

`conceptPreview` in `apps/mvpeters/src/content/site.ts` enables the concept notice
and `noindex, nofollow` metadata. Keep it enabled while this is review material.
Before a production release, replace draft text and illustrative interfaces,
confirm roles/results, supply approved media, and then disable concept mode.

Review preview: <https://website-git-codex-mvpeters-dev-spacedbe1.vercel.app/>.

See Vercel's [generated URL documentation](https://vercel.com/docs/deployments/generated-urls)
for the distinction between branch and commit preview links.
