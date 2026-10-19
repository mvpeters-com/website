import { createFileRoute } from '@tanstack/react-router';
import { ProjectAccordion } from '../components/project-accordion';
import { MvpetersAnnouncement } from '../components/mvpeters-announcement';
import { projects } from '../content/projects';
import { phases } from '../content/phases';
import { values } from '../content/values';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return <>
    <MvpetersAnnouncement />
    <header id="Top" className="relative mx-auto flex min-h-svh max-w-[1600px] flex-col px-6 md:px-10">
      <nav aria-label="Hoofdnavigatie" className="flex items-center justify-between pt-8 text-2xl md:pt-10 md:text-4xl">
        <a id="spaced-home-link" href="/" aria-current="page" className="font-medium">Spaced</a><a href="#Contact" className="decoration-1 underline-offset-8 hover:underline">Contact</a>
      </nav>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-12">
        <h1 className="text-center text-[clamp(3rem,11.8vw,11rem)] leading-[1.1] font-normal">Menselijk<br />digitaal.</h1>
        <img src="/images/start-illustration-02.svg" alt="" width="320" height="260" className="h-[24vh] max-h-64 w-auto max-w-[70vw]" fetchPriority="high" />
      </div>
      <a href="#Cases" className="mb-8 block w-fit"><img src="/images/arrow-down.svg" alt="Scroll naar beneden." width="32" height="44" className="h-11 w-8" /></a>
    </header>
    <main id="main">
      <section id="Cases" className="mx-auto max-w-[1600px] scroll-mt-8 px-6 py-16 md:px-10 md:py-24">
        <h2 className="mb-14 max-w-6xl text-4xl leading-[1.15] md:text-[clamp(3rem,5.3vw,4.625rem)]">Apps, websites en strategisch advies op mensenmaat.</h2>
        <div className="divide-y divide-foreground border-y border-foreground">
          {projects.map((project) => <ProjectAccordion key={project.title} project={project} defaultOpen={['Commons Radio', 'Ik ben daar', 'Heyday'].includes(project.title)} />)}
        </div>
      </section>
      <section className="bg-ivory px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1520px]">
          <h2 className="mb-14 max-w-6xl text-4xl leading-[1.15] md:text-[clamp(3rem,5.3vw,4.625rem)]">Een digitale partner voor elke fase.</h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {phases.map((phase) => <section key={phase.title}>
              <h3 className="mb-6 border-b border-foreground pb-6 font-body text-2xl font-medium">{phase.title}</h3>
              <div className="space-y-6 text-lg leading-relaxed">{phase.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <h2 className="mb-16 max-w-6xl text-4xl leading-[1.15] md:text-[clamp(3rem,5.3vw,4.625rem)]">Wij maken het verschil voor jouw digitaal verhaal.</h2>
        <div className="grid gap-x-20 gap-y-16 md:grid-cols-2">
          {values.map((value) => <section key={value.title} className="flex flex-col gap-6">
            <h3 className="border-b border-foreground pb-6 font-body text-2xl font-medium">{value.title}</h3>
            <p className="max-w-prose text-lg leading-relaxed whitespace-pre-line">{value.description}</p>
            <img src={`/images/${value.illustration}`} alt="" width="420" height="260" loading="lazy" className="h-56 w-full object-contain object-left" />
          </section>)}
        </div>
      </section>
    </main>
    <footer id="Contact" className="bg-spaced-orange px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex min-h-[65svh] max-w-[1520px] flex-col items-start justify-between gap-16">
        <div className="space-y-10">
          <h2 className="max-w-6xl text-4xl leading-[1.15] md:text-[clamp(3rem,5.3vw,4.625rem)]">Heb je een vraag over digitale innovatie binnen jouw organisatie?</h2>
          <a href="mailto:esther@spaced.be?subject=Wij%20denken%20graag%20mee%20na!" className="inline-block font-heading text-3xl leading-snug underline decoration-1 underline-offset-8 md:text-5xl">Wij denken graag mee na!</a>
        </div>
        <div className="flex w-full items-end justify-between gap-8">
          <a href="https://www.google.com/maps/place/SPACED/@51.1866043,4.3646367,17z/data=!3m1!4b1!4m5!3m4!1s0x47c3f6f098ecb35f:0x81f4e61f7f4cd15f!8m2!3d51.1867988!4d4.3671893" target="_blank" rel="noreferrer" className="text-lg underline-offset-4 hover:underline">Krugerstraat 232<br />2660 Antwerpen</a>
          <a href="#Top"><img src="/images/arrow-up.svg" alt="Scroll naar de top." width="32" height="44" className="h-11 w-8" /></a>
        </div>
      </div>
    </footer>
  </>;
}
