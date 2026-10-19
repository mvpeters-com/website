import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { ContactInvitation, Dot } from '../components/site-layout';
import { pageHead } from '../content/site';

export const Route = createFileRoute('/about')({ head: () => pageHead('About — MVPeters', 'Simon Peters — full stack developer, interim CTO and human technologist.'), component: About });

function About() {
  return <main id="main">
    <div className="page-intro">
      <h1 className="page-title">About me.</h1>
      <p>I’m Simon Peters. Full stack developer, interim CTO, inclusive developer, human technologist and proud nerd.</p>
    </div>
    <Dot />
    <section className="story-section">
      <h2 className="section-title">The big picture.</h2>
      <div className="space-y-6">
        <p>I like to look at the big picture and come up with a realistic plan to get us there.</p>
        <p>Private sector: We Want More, June, Calabi, …<br />Public sector: AMIF, Mediawijs, Awel, …</p>
      </div>
    </section>
    <Dot />
    <section className="space-y-8">
      <h2 className="section-title">Tools I work with.</h2>
      <dl className="divide-y divide-foreground/20 border-y border-foreground/20 text-lg md:text-xl">
        {[
          ['Frontend', 'React, React Native / Expo, Angular, Ionic, Astro, TypeScript'],
          ['Backend', 'Node.js (NestJS, RSC), PHP (Laravel), Python (Flask)'],
          ['Databases', 'MySQL, PostgreSQL, Firebase'],
          ['Design', 'Figma'],
        ].map(([label, value]) => <div key={label} className="grid gap-2 py-5 md:grid-cols-[1fr_3fr]"><dt className="font-medium">{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <a href="/CV.pdf" download className="inline-flex items-center gap-2 text-lg">Download my CV<ArrowUpRight size={20} aria-hidden="true" /></a>
    </section>
    <Dot />
    <ContactInvitation />
  </main>;
}
