import { Link, Outlet } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { ModeToggle } from './mode-toggle';
import { conceptPreview, email, projectEmail, workPublished } from '../content/site';

export function SiteLayout() {
  return <div className="mx-auto max-w-[1600px] px-5 md:px-12">
    <header className="site-header flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-6 md:py-10">
      <Link to="/" aria-label="MVPeters home" className="shrink-0"><Logo /></Link>
      <div className="flex items-center gap-4 sm:gap-8">
        <nav aria-label="Main navigation" className="flex gap-4 text-base sm:gap-8 sm:text-lg">
          {workPublished && <Link to="/work" className="nav-link" activeProps={{ className: 'nav-link underline' }}>Work</Link>}
          <Link to="/about" className="nav-link" activeProps={{ className: 'nav-link underline' }}>About</Link>
          <Link to="/contact" className="nav-link" activeProps={{ className: 'nav-link underline' }}>Contact</Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
    {conceptPreview && <aside aria-label="Concept preview" className="mb-10 border-y border-foreground/20 py-3 text-sm leading-relaxed md:mb-16">Website concept. Draft stories and illustrative interfaces for review.</aside>}
    <Outlet />
    <footer className="mt-20 flex flex-col gap-8 border-t border-foreground/20 pt-8 pb-10 text-base md:mt-32 md:flex-row md:items-end md:justify-between md:text-lg">
      <div className="space-y-3"><p>Good ideas deserve a working version.</p><a href={projectEmail} className="inline-flex items-center gap-2">{email}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
      <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">{workPublished && <Link to="/work">Work</Link>}<Link to="/about">About</Link><Link to="/contact">Contact</Link><a href="/CV.pdf" download>CV</a></nav>
    </footer>
  </div>;
}

export function Dot() { return <div aria-hidden="true" className="my-12 size-4 rounded-full bg-flamingo-400 md:my-20 md:size-6" />; }

export function ContactInvitation() {
  return <section className="space-y-6"><h2 className="section-title">Have something in mind?</h2><p className="max-w-2xl text-xl leading-relaxed md:text-2xl">An idea to explore, a product to build, or a technical knot to untangle. Tell me where you are and what you need.</p><a href={projectEmail} className="action-link">Tell me about your project<ArrowUpRight aria-hidden="true" size={22} /></a></section>;
}
