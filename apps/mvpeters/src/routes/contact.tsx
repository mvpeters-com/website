import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Dot } from '../components/site-layout';
import { email, pageHead, projectEmail } from '../content/site';

export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact — MVPeters', 'Tell Simon Peters about your project, product, or technical challenge.'), component: Contact });

function Contact() {
  return <main id="main"><div className="page-intro"><h1 className="page-title">Let’s make<br />something useful.</h1><a href={projectEmail} className="contact-email inline-flex max-w-full flex-wrap items-center gap-3 font-heading text-3xl font-bold sm:text-5xl md:text-6xl"><span className="break-all">{email}</span><ArrowUpRight size={36} aria-hidden="true" /></a><p>An idea to explore? A product that needs its next step? A team that could use another pair of hands and a clear technical head?</p></div><p className="mt-5 max-w-xl text-lg leading-relaxed">Send me an email. A rough idea is enough to start a conversation.</p><Dot /><section className="story-section"><h2 className="section-title">A little context helps.</h2><div className="space-y-6 text-xl leading-relaxed md:text-2xl"><p>Tell me what you’re working on, where you are now, and where you’d like to get to.</p><ul className="list-disc space-y-3 pl-6"><li>What do you want to build or improve?</li><li>Where could you use help?</li><li>Is there a timeline or an existing team?</li></ul><a href={projectEmail} className="action-link">Email me about a project<ArrowUpRight size={22} aria-hidden="true" /></a></div></section></main>;
}
