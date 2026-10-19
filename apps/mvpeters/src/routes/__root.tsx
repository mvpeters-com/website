import type { ReactNode } from 'react';
import { createRootRoute, HeadContent, Link, Scripts } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import { SkipLink } from '@website/ui/skip-link';
import styles from '../styles/app.css?url';
import { SiteLayout } from '../components/site-layout';
import { conceptPreview } from '../content/site';

const themeScript = `try{const t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))}catch{document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme: dark)').matches)}`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'MVPeters' },
      { name: 'description', content: 'Simon Peters — full stack developer, interim CTO and human technologist. Why build a spacecraft, when a nice kite will do?' },
      { property: 'og:title', content: 'MVPeters' },
      { property: 'og:description', content: 'Why build a spacecraft, when a nice kite will do?' },
      { property: 'og:image', content: 'https://mvpeters.com/share-image.png' },
      { property: 'og:type', content: 'website' },
      ...(conceptPreview ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
    links: [{ rel: 'stylesheet', href: 'https://p.typekit.net/p.css?s=1&k=twu5syb&ht=tk&f=49645.49646.49647.49648.49649.49650.49651.49652.49653.49654.51655&a=46182136&app=typekit&e=css' }, { rel: 'stylesheet', href: styles }, { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  }),
  shellComponent: Document,
  component: SiteLayout,
  notFoundComponent: () => <main id="main" className="space-y-6 p-8 md:p-12"><h1 className="text-5xl font-bold">Page not found.</h1><Link to="/">Back to MVPeters</Link></main>,
  errorComponent: ({ reset }) => <main id="main" className="space-y-6 p-8"><h1 className="text-4xl font-bold">Something went wrong.</h1><button type="button" className="underline" onClick={reset}>Try again</button></main>,
});

function Document({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><HeadContent /></head><body><SkipLink />{children}<Analytics /><Scripts /></body></html>;
}
