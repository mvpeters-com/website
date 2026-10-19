export interface CurrentProject {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  video?: boolean;
}

export const currentProjects: CurrentProject[] = [
  { title: 'Shiperise', description: 'Product development.', href: 'https://www.shiperise.com/', linkLabel: 'Visit Shiperise' },
  {
    title: 'Club Gewoon',
    description: 'Custom agency suite.',
    href: 'https://www.clubgewoon.be/',
    linkLabel: 'Visit Club Gewoon',
  },
  {
    title: 'Niko',
    description: 'B2B configurator for Niko Rocker and Niko Toggle.',
    href: 'https://www.niko.eu/en/inspiration/news/2026/rocker-toggle-configurator',
    linkLabel: 'See the configurator',
  },
  { title: 'DCW', description: 'AI-driven data platform.', href: 'https://doccredit.world/', linkLabel: 'Visit DCW' },
  {
    title: 'Calabi',
    description: 'Platform for local food producers and buyers.',
    href: 'https://calabi.be/',
    linkLabel: 'Visit Calabi',
    video: true,
  },
];

export const sideProjects: CurrentProject[] = [
  {
    title: 'Switch to EU',
    description: 'European alternatives to everyday apps, and how to switch.',
    href: 'https://www.switch-to.eu/en',
    linkLabel: 'Visit Switch to EU',
  },
  {
    title: 'Commons Radio',
    description: 'Independent and community radio from around the world.',
    href: 'https://www.commonsradio.eu/',
    linkLabel: 'Listen to Commons Radio',
  },
];
