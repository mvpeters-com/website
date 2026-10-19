import { ArrowUpRight, Plus } from 'lucide-react';
import { currentProjects, sideProjects, type CurrentProject } from '../content/current-projects';
import { InterimVideo } from './interim-video';

export function CurrentProjects() {
  return <div id="currently-working-on" className="scroll-mt-8">
    <section aria-labelledby="current-projects-title" className="space-y-8 md:space-y-12">
      <h2 id="current-projects-title" className="section-title">Client work.</h2>
      <ProjectRows projects={currentProjects} />
    </section>
    <details className="group mt-8 border-b border-foreground/20 pb-6 md:mt-12">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-foreground [&::-webkit-details-marker]:hidden">
        <h2 className="text-3xl font-bold md:text-4xl">Side projects</h2>
        <Plus size={24} aria-hidden="true" className="shrink-0 group-open:rotate-45" />
      </summary>
      <div className="mt-6"><ProjectRows projects={sideProjects} /></div>
    </details>
  </div>;
}

function ProjectRows({ projects }: { projects: CurrentProject[] }) {
  return <ul className="divide-y divide-foreground/20 border-y border-foreground/20">
      {projects.map(project => <li key={project.title} className="grid items-start gap-3 py-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:py-8">
        <h3 className="text-3xl font-bold md:text-4xl">{project.title}</h3>
        <div className="space-y-3">
          <p className="max-w-3xl text-xl leading-relaxed md:text-2xl">{project.description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.href && <a href={project.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 text-lg">{project.linkLabel}<ArrowUpRight size={20} aria-hidden="true" /></a>}
            {project.video && <InterimVideo label="Watch the video" className="min-h-11 text-lg" />}
          </div>
        </div>
      </li>)}
    </ul>;
}
