import { useRef } from 'react';
import { Button } from '@website/ui/button';
import type { Project } from '../content/projects';

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className={direction === 'left' ? 'rotate-180' : ''}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}

export function ProjectAccordion({ project, defaultOpen }: { project: Project; defaultOpen: boolean }) {
  const gallery = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    const element = gallery.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return <details open={defaultOpen} className="group py-1">
    <summary className="grid list-none grid-cols-[1fr_auto] items-center gap-4 py-6 md:grid-cols-[1.6fr_1fr_auto_auto] [&::-webkit-details-marker]:hidden">
      <span className="col-start-1 row-start-1 flex flex-wrap items-center gap-x-6 gap-y-2"><span className="text-xl font-medium md:text-2xl">{project.title}</span><span className="rounded-full border border-foreground px-3 py-1 text-sm">{project.kind}</span></span>
      <span className="col-start-2 row-start-1 hidden text-lg md:block">{project.client}</span>
      {project.date && <span className="col-start-3 row-start-1 hidden text-base lg:block">{project.date}</span>}
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="col-start-2 row-start-1 transition-transform group-open:rotate-45 md:col-start-4"><path d="M4 12h16M12 4v16" /></svg>
    </summary>
    <div className="pb-10">
      <div ref={gallery} role="region" aria-label={`Beelden van ${project.title}`} tabIndex={0} className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4">
        {project.images.map((image, index) => <img key={image} src={`/images/${image}`} srcSet={imageSources(image)} sizes="(max-width: 767px) 80vw, 600px" alt={`${project.title} — projectbeeld ${index + 1}`} width="1498" height="1000" loading="lazy" className="aspect-[1.5] w-[80vw] max-w-[600px] shrink-0 snap-start object-contain md:w-[42vw]" />)}
      </div>
      {project.images.length > 1 && <div className="mt-3 flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => scroll(-1)} aria-label={`Vorige beelden van ${project.title}`}><Arrow direction="left" /></Button>
        <Button variant="ghost" size="icon" onClick={() => scroll(1)} aria-label={`Volgende beelden van ${project.title}`}><Arrow direction="right" /></Button>
      </div>}
      <div className="mt-6 grid gap-6 text-lg leading-relaxed md:grid-cols-[1fr_1fr_auto] md:gap-12">
        <p>{project.description}</p>
        <div><h3 className="mb-2 font-body text-sm font-medium uppercase tracking-wide">Diensten</h3><p>{project.services}</p></div>
        <a href={project.url} target="_blank" rel="noopener" className="w-fit self-start underline underline-offset-4">{project.linkLabel || 'Live website'}</a>
      </div>
    </div>
  </details>;
}

// Use the original Webflow image variants without requesting absent sizes.
function imageSources(image: string) {
  const base = image.replace('.png', '');
  if (image === 'ikbendaar-4.png') return undefined;
  return `/images/${base}-p-500.png 500w, /images/${image} 1498w`;
}
