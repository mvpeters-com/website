import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { ReferencesCarousel } from '../components/ReferencesCarousel';
import { ContactInvitation, Dot } from '../components/site-layout';
import { CurrentProjects } from '../components/current-projects';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return <main id="main">
    <section className="space-y-7 pb-4 md:space-y-9 md:pb-8"><h1 className="page-title">Hi, I’m Simon.</h1><p className="max-w-5xl text-3xl leading-tight md:text-5xl md:leading-[1.2]">I’m a full stack developer,<br className="hidden md:block" /> interim CTO, inclusive developer, AI believer, AI sceptic, human technologist, pragmatic digital builder and proud nerd.</p><div className="flex flex-wrap items-center gap-x-8 gap-y-4"><Link to="/contact" className="action-link">Contact me<ArrowUpRight size={22} aria-hidden="true" /></Link><a href="#currently-working-on" className="text-lg">What I’m working on</a></div></section>
    <Dot />
    <CurrentProjects />
    <Dot />
    <section className="space-y-8 md:space-y-12"><h2 className="section-title">What I do.</h2><div className="service-row"><h3>Full stack development.</h3><p>I build web applications and mobile apps, frontend and backend.</p></div><div className="service-row"><h3>AI engineering.</h3><p>I build AI features and work on data platforms.</p></div><div className="service-row"><h3>Interim CTO.</h3><p>Need an interim CTO? I help with technical decisions and write code alongside your team.</p></div><Link to="/about" className="inline-block text-lg">More about me</Link></section>
    <Dot />
    <section className="grid gap-6 lg:grid-cols-2 lg:gap-16"><h2 className="section-title">Why build a spacecraft,<br />when a nice kite will do?</h2><div className="space-y-5 text-xl leading-relaxed md:text-2xl"><p>I like to look at the big picture and come up with a realistic plan to get us there.</p></div></section>
    <Dot />
    <ReferencesCarousel />
    <Dot />
    <ContactInvitation />
  </main>;
}
