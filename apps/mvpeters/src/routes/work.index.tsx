import { createFileRoute, redirect } from '@tanstack/react-router';
import { ProjectList } from '../components/project-list';
import { ContactInvitation, Dot } from '../components/site-layout';
import { pageHead, workPublished } from '../content/site';

export const Route = createFileRoute('/work/')({
  beforeLoad: () => { if (!workPublished) throw redirect({ to: '/', hash: 'currently-working-on', replace: true }); },
  head: () => pageHead('Work — MVPeters', 'Selected product and platform work by Simon Peters.'),
  component: Work,
});

function Work() {
  return <main id="main"><div className="page-intro"><h1 className="page-title">Useful things.<br />Built with care.</h1><p>Products, platforms, and the decisions behind them. Start with Shiperise, or open another project to explore.</p></div><ProjectList headingLevel="h2" /><Dot /><ContactInvitation /></main>;
}
