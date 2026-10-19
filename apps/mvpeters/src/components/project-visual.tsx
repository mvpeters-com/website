import { ArrowUpRight, Circle, Radio, Search } from 'lucide-react';
import type { Project } from '../content/projects';

export function ProjectVisual({ project, detail = false }: { project: Project; detail?: boolean }) {
  if (project.mock === 'radio') return <div className="project-visual radio-visual"><img src="/work/commons-radio.png" alt="Commons Radio website with curated collections and independent radio stations" width="1498" height="1000" loading="lazy" className="h-full w-full object-cover object-top" /></div>;
  const platformRows = project.mock === 'shiperise' ? ['A product idea', 'A working prototype', 'A useful first release', 'The next iteration'] : project.mock === 'eu' ? ['Explore categories', 'Find an alternative', 'Compare the options', 'Make a choice'] : ['A new idea', 'The working version', 'The next improvement', 'Ready for review'];
  const platformTitle = project.mock === 'shiperise' ? (detail ? 'From idea to daily use.' : 'A product, taking shape.') : project.mock === 'eu' ? (detail ? 'The options, side by side.' : 'A different way forward.') : (detail ? 'The details, connected.' : 'Keep the bigger picture.');
  return <div className={`project-visual mock-${project.mock}`} role="img" aria-label={`Illustrative interface for ${project.title}; not actual project footage`}>
    <div className="sample-window" aria-hidden="true">
      <div className="sample-toolbar"><span className="flex items-center gap-2"><Circle size={8} fill="currentColor" /><Circle size={8} /><Circle size={8} /></span><span>Interface study</span><Search size={13} /></div>
      {project.mock === 'club' ? <div className="sample-workspace">
        <div className="sample-sidebar"><strong>Gewoon.</strong><span>Overview</span><span>People</span><span>Planning</span><span>Notes</span></div>
        <div className="sample-main"><p className="sample-label">MONDAY / A LITTLE MORE CLARITY</p><h3>{detail ? 'Everything in its place.' : 'A good day starts here.'}</h3><div className="sample-columns"><div><span className="sample-label">UP NEXT</span>{['A shared plan', 'A moment to catch up', 'Time to make things'].map((text, i) => <div className="sample-row" key={text}><span className="sample-time">{['09:00', '11:30', '14:00'][i]}</span><span>{text}</span><ArrowUpRight size={13} /></div>)}</div><div className="sample-note"><span className="sample-label">ONE THING AT A TIME</span><p>Less looking.<br />More doing.</p><span>Keep the important things close.</span></div></div></div>
      </div> : project.mock === 'niko' ? <div className="sample-product">
        <div className="sample-product-copy"><h3>{detail ? 'A smaller next step.' : 'Simple on the surface.'}</h3><p>Clear choices.<br />A little less friction.</p><div className="sample-line" /><div className="sample-line short" /><span className="sample-pill">Explore the details <ArrowUpRight size={13} /></span></div>
        <div className="sample-object" aria-hidden="true"><div /><div /><span /></div>
      </div> : <div className="sample-platform"><div className="flex items-end justify-between gap-3"><div><h3>{platformTitle}</h3></div><span className="sample-status">All work</span></div><div className="sample-table"><div className="sample-table-head"><span>Work</span><span>Stage</span><span>Next step</span></div>{platformRows.map((text, i) => <div className="sample-table-row" key={text}><span>{text}</span><span><i className={`status-dot status-${i}`} />{['Discovery', 'In progress', 'Planned', 'Review'][i]}</span><ArrowUpRight size={14} /></div>)}</div></div>}
    </div>
  </div>;
}

export function MediaCaption({ project }: { project: Project }) {
  return <figcaption className="mt-3 text-sm leading-relaxed">{project.mock === 'radio' ? 'Existing Commons Radio website capture.' : 'Illustrative interface. Layout and story placeholders, not project screenshots.'}</figcaption>;
}

export function WalkthroughPlaceholder() {
  return <figure className="space-y-3"><div className="video-placeholder flex min-h-64 flex-col items-start justify-end gap-4 p-6 md:min-h-96 md:p-10"><Radio size={40} strokeWidth={1.25} aria-hidden="true" /><h3 className="text-3xl font-bold md:text-5xl">The work, in motion.</h3><p className="max-w-md text-lg leading-relaxed">A short walkthrough will show the product in use and the decisions behind it.</p><span className="border border-current px-3 py-2 text-sm">Video placeholder — footage to add</span></div><figcaption className="text-sm">Reserved for a real project walkthrough with playback controls and captions.</figcaption></figure>;
}
