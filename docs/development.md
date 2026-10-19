# MVPeters development preview

MVPeters has a dedicated development branch, `codex/mvpeters-dev`, for reviewing
the next version before release. The Vercel project is `website`, with app root
`apps/mvpeters`. Production continues to deploy from `main`.

## Review workflow

1. Work on `codex/mvpeters-dev` and push commits to GitHub.
2. Vercel builds a Preview deployment. Share its generated **branch URL** so
   reviewers keep using the same address as the branch changes. A deployment URL
   is available separately when a reviewer needs a fixed version.
3. Run `pnpm check` before review. Keep unfinished case-study content hidden;
   review the public pages before marking the pull request ready.
4. After review, release through a pull request into `main`. Merging triggers
   production deployment; pushing this development branch does not publish to
   `mvpeters.com`.

## Initial launch

The initial public version contains:

- `/`: product-development introduction, client work, side projects, services, approach,
  existing testimonials, and project contact.
- `/about`: background, working philosophy, tools, and CV.
- `/contact`: email-first project contact with a prefilled email draft.

Launch project copy and external links live in
`apps/mvpeters/src/content/current-projects.ts`. Client work lists Shiperise,
Club Gewoon, Niko, DCW, and Calabi. All link to public client sites; Niko links
to the configurator project. Calabi also opens the existing interim CTO video.
Switch to EU and Commons Radio are in one initially collapsed Side projects
disclosure. Both descriptions and links are server-rendered while closed;
links have no `nofollow` attribute.

`workPublished` in `apps/mvpeters/src/content/site.ts` is false. Work is absent
from navigation, and `/work` plus the known case URLs redirect to the homepage
list. Unknown case URLs still return 404. Draft cases and illustrations remain
in the code for later content work; none are part of the public browsing flow.
Publish individual cases only after confirming copy, contributions, outcomes,
and media. `conceptPreview` is false for the initial release, removing the draft
banner and page-level noindex metadata. Vercel previews retain their own noindex
header; the production site is indexable.

`public/sitemap.xml` lists the three public pages on `www.mvpeters.com`.
`public/robots.txt` points crawlers to it. Add new case URLs to the sitemap when
their finished pages are published, not while they are drafts or redirects.

Review preview: <https://website-git-codex-mvpeters-dev-spacedbe1.vercel.app/>.

See Vercel's [generated URL documentation](https://vercel.com/docs/deployments/generated-urls)
for the distinction between branch and commit preview links.
