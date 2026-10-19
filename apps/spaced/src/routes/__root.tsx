import type { ReactNode } from 'react';
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import { SkipLink } from '@website/ui/skip-link';
import styles from '../styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Spaced - Menselijk Digitaal' },
      { name: 'description', content: 'Apps, websites en strategisch advies op mensenmaat.' },
      { property: 'og:title', content: 'Spaced - Menselijk Digitaal' },
      { property: 'og:description', content: 'Apps, websites en strategisch advies op mensenmaat.' },
      { property: 'og:image', content: 'https://spaced.be/images/menselijk-digitaal.png' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: styles },
      { rel: 'icon', href: '/images/favicon.png' },
      { rel: 'apple-touch-icon', href: '/images/webclip.png' },
    ],
  }),
  shellComponent: Document,
  component: Outlet,
  notFoundComponent: () => <main id="main" className="mx-auto flex min-h-svh max-w-5xl flex-col items-start justify-center gap-8 px-6"><img src="/images/404.svg" alt="" className="w-64" /><h1 className="text-4xl md:text-6xl">We vinden niet wat je zoekt.</h1><Link to="/" className="text-2xl underline">Breng me naar de juiste pagina!</Link></main>,
  errorComponent: ({ reset }) => <main id="main" className="space-y-6 p-8"><h1 className="text-4xl">Er liep iets mis.</h1><button type="button" onClick={reset} className="underline">Probeer opnieuw</button></main>,
});

function Document({ children }: { children: ReactNode }) {
  return <html lang="nl"><head><HeadContent /></head><body><SkipLink>Ga naar de inhoud</SkipLink>{children}<Scripts /><Analytics /></body></html>;
}
