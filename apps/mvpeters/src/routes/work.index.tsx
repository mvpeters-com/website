import { createFileRoute } from '@tanstack/react-router';
import { ProjectPreview } from '../components/project-preview';
import { ContactInvitation, Dot } from '../components/site-layout';
import { projects } from '../content/projects';
import { pageHead } from '../content/site';

export const Route = createFileRoute('/work/')({ head: () => pageHead('Work — MVPeters', 'Selected product and platform work by Simon Peters.'), component: Work });

function Work() {
  return <main id="main"><div className="page-intro"><h1 className="page-title">Useful things.<br />Built with care.</h1><p>Products, platforms, and the decisions behind them. Four projects to start the conversation.</p></div><div className="space-y-16 md:space-y-24">{projects.map(project => <ProjectPreview key={project.slug} project={project} />)}</div><Dot /><ContactInvitation /></main>;
}
