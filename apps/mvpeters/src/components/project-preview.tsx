import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../content/projects';
import { MediaCaption, ProjectVisual } from './project-visual';

export function ProjectPreview({ project, headingLevel = 'h3' }: { project: Project; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return <article className="grid items-center gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
    <Link to="/work/$slug" params={{ slug: project.slug }} aria-label={`View ${project.title} case study`} className="block text-foreground no-underline"><figure><ProjectVisual project={project} /><MediaCaption project={project} /></figure></Link>
    <div className="space-y-5"><Heading className="text-4xl font-bold md:text-5xl"><Link to="/work/$slug" params={{ slug: project.slug }} className="text-foreground no-underline hover:text-primary">{project.title}</Link></Heading><p className="max-w-lg text-xl leading-relaxed md:text-2xl">{project.summary}</p><p className="text-base">{project.type}</p><Link to="/work/$slug" params={{ slug: project.slug }} className="inline-flex items-center gap-2 text-lg">Explore the case<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
  </article>;
}
