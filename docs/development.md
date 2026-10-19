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

The initial preview is a baseline of the existing website. Page structure is
being shaped before the new pages and case-study content are implemented.

See Vercel's [generated URL documentation](https://vercel.com/docs/deployments/generated-urls)
for the distinction between branch and commit preview links.
