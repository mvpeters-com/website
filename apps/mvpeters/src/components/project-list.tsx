import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Plus } from 'lucide-react';
import { projects } from '../content/projects';
import { ProjectPreview } from './project-preview';
import { MediaCaption, ProjectVisual } from './project-visual';

export function ProjectList({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const [highlighted, ...others] = projects;
  return <div className="space-y-10 md:space-y-16">
    <section aria-label="Highlighted case"><ProjectPreview project={highlighted} headingLevel={headingLevel} /></section>
    <div className="border-t border-foreground/20">
      {others.map(project => <details key={project.slug} className="group border-b border-foreground/20">
        <summary aria-label={`Details about ${project.title}`} className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
          <span className="flex flex-wrap items-baseline gap-x-6 gap-y-1"><span className="font-heading text-3xl font-bold md:text-4xl">{project.title}</span><span className="text-sm md:text-base">{project.type}</span></span><Plus aria-hidden="true" size={24} className="shrink-0 transition-transform group-open:rotate-45" />
        </summary>
        <div className="grid items-center gap-6 pb-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12 md:pb-12">
          <Link to="/work/$slug" params={{ slug: project.slug }} aria-label={`View ${project.title} case study`} className="block text-foreground no-underline"><figure><ProjectVisual project={project} /><MediaCaption project={project} /></figure></Link>
          <div className="space-y-5"><p className="max-w-lg text-xl leading-relaxed md:text-2xl">{project.summary}</p><Link to="/work/$slug" params={{ slug: project.slug }} className="inline-flex items-center gap-2 text-lg">Explore the case<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
        </div>
      </details>)}
    </div>
  </div>;
}
