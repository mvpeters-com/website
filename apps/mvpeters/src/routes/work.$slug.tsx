import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ContactInvitation, Dot } from '../components/site-layout';
import { MediaCaption, ProjectVisual, WalkthroughPlaceholder } from '../components/project-visual';
import { findProject, projects } from '../content/projects';
import { pageHead, workPublished } from '../content/site';

export const Route = createFileRoute('/work/$slug')({
  beforeLoad: ({ params }) => {
    if (!findProject(params.slug)) throw notFound();
    if (!workPublished) throw redirect({ to: '/', hash: 'currently-working-on', replace: true });
  },
  loader: ({ params }) => { const project = findProject(params.slug); if (!project) throw notFound(); return { project }; },
  head: ({ loaderData }) => pageHead(`${loaderData?.project.title ?? 'Work'} — MVPeters`, loaderData?.project.summary ?? 'Selected work by Simon Peters.'),
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const next = projects[(projects.findIndex(item => item.slug === project.slug) + 1) % projects.length];
  return <main id="main"><Link to="/work" className="mb-8 inline-flex items-center gap-2 text-lg"><ArrowLeft size={20} aria-hidden="true" />All work</Link><div className="page-intro"><h1 className="page-title">{project.title}</h1><p>{project.summary}</p></div><figure><ProjectVisual project={project} /><MediaCaption project={project} /></figure><div className="mt-10 grid gap-6 border-y border-foreground/20 py-6 sm:grid-cols-3"><div><h2 className="text-2xl font-bold">My contribution</h2><p className="mt-2 text-lg">Role and scope to confirm.</p></div><div><h2 className="text-2xl font-bold">The team</h2><p className="mt-2 text-lg">Collaborators to add.</p></div><div><h2 className="text-2xl font-bold">Case study status</h2><p className="mt-2 text-lg">Draft story for review.</p></div></div><Dot /><section className="story-section"><h2 className="section-title">The starting point.</h2><p>{project.challenge}</p></section><Dot /><section className="story-section"><h2 className="section-title">The thinking behind the build.</h2><div className="space-y-6"><p>{project.direction}</p><p className="draft-note">Content slot: the key decisions, constraints, and trade-offs. Add specific examples of my work here.</p></div></section><Dot /><section className="space-y-8"><h2 className="section-title">A closer look.</h2>{project.screens.length ? <div role="region" aria-label={`${project.title} screenshots`} tabIndex={0} className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overscroll-x-contain pb-5">{project.screens.slice(1).map((src, index) => <figure key={src} className="shrink-0 snap-start"><img src={`/work/${src}`} alt={`${project.title} ${index === 0 ? 'iPad collection and radio player' : index === 1 ? 'iPhone listening screen' : 'iPhone radio player'}`} width={index === 0 ? 1600 : 600} height={index === 0 ? 1200 : 1303} loading="lazy" className="h-80 w-auto max-w-none md:h-[460px]" /><figcaption className="mt-3 text-sm">Existing {index === 0 ? 'iPad' : 'iPhone'} screenshot.</figcaption></figure>)}</div> : <figure><ProjectVisual project={project} detail /><MediaCaption project={project} /></figure>}<WalkthroughPlaceholder /></section><Dot /><section className="story-section"><h2 className="section-title">What changed.</h2><div className="space-y-6"><p>The outcome belongs here: what shipped, what became easier, and what we learned along the way.</p><p className="draft-note">Outcome placeholder. Verified results and project-specific technology will be added after content review.</p>{project.mock === 'radio' && <a href="https://www.commonsradio.eu/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-lg">Visit Commons Radio<ArrowUpRight size={20} aria-hidden="true" /></a>}</div></section><Dot /><Link to="/work/$slug" params={{ slug: next.slug }} className="flex items-center justify-between gap-6 border-y border-foreground/20 py-8 text-foreground no-underline hover:text-primary"><span><span className="block text-base">Next project</span><span className="font-heading text-4xl font-bold md:text-6xl">{next.title}</span></span><ArrowUpRight size={32} aria-hidden="true" className="shrink-0" /></Link><Dot /><ContactInvitation /></main>;
}
