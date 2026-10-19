import { createFileRoute } from '@tanstack/react-router';
import { Logo } from '../components/Logo';
import { ModeToggle } from '../components/mode-toggle';
import { ReferencesCarousel } from '../components/ReferencesCarousel';
import { InterimVideo } from '../components/interim-video';

export const Route = createFileRoute('/')({ component: Home });

function Dot() {
  return <div aria-hidden="true" className="size-4 rounded-full bg-flamingo-400 md:size-6" />;
}

function Home() {
  return (
    <main id="main" className="flex flex-col gap-12 p-4 md:gap-24 md:p-12">
      <header className="flex items-center justify-between"><Logo /><ModeToggle /></header>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-4xl text-5xl leading-none font-bold md:text-[120px]">Hi, I’m Simon.</h1>
          <p className="max-w-4xl text-4xl md:text-6xl md:leading-normal">
            I’m a full stack developer, <br className="hidden md:block" />
            <span className="whitespace-nowrap"><InterimVideo />,</span> inclusive developer, ai believer, ai sceptic, human technologist, pragmatic digital builder and proud nerd.
          </p>
        </div>
        <Dot />
        <section className="flex flex-col gap-4">
          <h2 className="max-w-3xl text-5xl leading-none font-bold md:text-6xl">Why build a spacecraft, <br />when a nice kite will do?</h2>
          <p className="max-w-xl text-2xl leading-normal md:text-3xl">I like to look at the big picture and come up with a realistic plan to get us there.</p>
        </section>
        <Dot />
        <p className="text-2xl leading-normal md:text-3xl">
          Frontend: React, React Native (expo), Angular, Ionic, Astro, Typescript<br />
          Backend: Node.js (NestJS, RSC), PHP (Laravel), Python (Flask)<br />
          Databases: MySQL, PostgreSQL, Firebase<br />Design: Figma
        </p>
        <Dot />
        <p className="text-2xl leading-normal md:text-3xl">Private sector: We Want More, June, Calabi, ...<br />Public sector: AMIF, Mediawijs, Awel, ...</p>
        <Dot />
        <ReferencesCarousel />
        <Dot />
        <section className="flex flex-col gap-4">
          <h2 className="max-w-4xl text-4xl leading-none font-bold md:text-5xl">Interested?</h2>
          <p className="max-w-3xl text-2xl md:text-3xl md:leading-normal">Contact me at <a href="mailto:simon@mvpeters.com">simon@mvpeters.com</a> or download my <a href="/CV.pdf" download>CV</a>.</p>
        </section>
      </div>
    </main>
  );
}
