import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { ReferencesCarousel } from '../components/ReferencesCarousel';
import { InterimVideo } from '../components/interim-video';
import { ContactInvitation, Dot } from '../components/site-layout';
import { ProjectList } from '../components/project-list';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return <main id="main">
    <section className="space-y-7 pb-4 md:space-y-9 md:pb-8"><h1 className="page-title">Hi, I’m Simon.</h1><p className="max-w-5xl text-3xl leading-tight md:text-5xl md:leading-[1.2]">I build digital products.<br />From first idea to working software.</p><div className="flex flex-wrap items-center gap-x-8 gap-y-4"><Link to="/contact" className="action-link">Tell me about your project<ArrowUpRight size={22} aria-hidden="true" /></Link><Link to="/work" className="text-lg">See my work</Link></div><p className="max-w-3xl text-xl leading-relaxed md:text-2xl">Full stack development, practical AI engineering, and hands-on technical leadership. A clear plan, the right tools, and something useful at the end.</p></section>
    <Dot />
    <section className="space-y-10 md:space-y-16"><div className="flex flex-wrap items-end justify-between gap-4"><h2 className="section-title">A few things I’ve worked on.</h2><Link to="/work" className="text-lg">All work</Link></div><ProjectList /></section>
    <Dot />
    <section className="space-y-8 md:space-y-12"><h2 className="section-title">A builder with a bigger picture.</h2><div className="service-row"><h3>Full stack development.</h3><p>From the interface people touch to the systems behind it. I help turn an idea into a working product, then make it better as we learn.</p></div><div className="service-row"><h3>Practical AI engineering.</h3><p>Useful AI starts with a useful task. I explore, prototype, and integrate AI into products and workflows where it can make a real difference.</p></div><div className="service-row"><h3>Hands-on technical leadership.</h3><p>Need an <InterimVideo />? I connect the product decisions, technical choices, and people doing the work, with room to roll up my sleeves.</p></div><Link to="/about" className="inline-block text-lg">More about how I work</Link></section>
    <Dot />
    <section className="grid gap-6 lg:grid-cols-2 lg:gap-16"><h2 className="section-title">Why build a spacecraft,<br />when a nice kite will do?</h2><div className="space-y-5 text-xl leading-relaxed md:text-2xl"><p>I like to look at the big picture and come up with a realistic plan to get us there.</p><p>Start with what matters. Build a useful first version. Learn from the people using it. Give the product room to grow.</p></div></section>
    <Dot />
    <ReferencesCarousel />
    <Dot />
    <ContactInvitation />
  </main>;
}
