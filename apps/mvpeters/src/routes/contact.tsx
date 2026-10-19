import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { email, pageHead, projectEmail } from '../content/site';

export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact — MVPeters', 'Contact Simon Peters at simon@mvpeters.com.'), component: Contact });

function Contact() {
  return <main id="main">
    <div className="page-intro">
      <h1 className="page-title">Interested?</h1>
      <p>Contact me at</p>
      <a href={projectEmail} className="contact-email inline-flex max-w-full flex-wrap items-center gap-3 font-heading text-3xl font-bold sm:text-5xl md:text-6xl"><span className="break-all">{email}</span><ArrowUpRight size={36} aria-hidden="true" /></a>
      <p>Or download my <a href="/CV.pdf" download>CV</a>.</p>
    </div>
  </main>;
}
