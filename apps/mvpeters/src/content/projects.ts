export interface Project {
  slug: string;
  title: string;
  summary: string;
  type: string;
  mock: 'radio' | 'club' | 'niko' | 'dcw' | 'shiperise' | 'eu';
  challenge: string;
  direction: string;
  screens: string[];
}

// Names are confirmed. Narratives and non-radio interfaces are concept material.
export const projects: Project[] = [
  {
    slug: 'shiperise', title: 'Shiperise', type: 'Product development', mock: 'shiperise',
    summary: 'Building a product around the people doing the work.',
    challenge: 'Sample story: an idea becomes a product that people can use every day. This is where we will introduce Shiperise, the problem it tackles, and the people it serves.',
    direction: 'This highlighted case will connect product thinking and hands-on development: the first useful version, the technical decisions behind it, and how the product evolved. My actual contribution, the team, and the results will replace this draft after review.',
    screens: [],
  },

  {
    slug: 'club-gewoon-os', title: 'Club Gewoon OS', type: 'Product & platform', mock: 'club',
    summary: 'A place for the work behind the work.',
    challenge: 'Sample story: a team has information spread across tools and conversations. This is where we will explain the actual people, problem, and context behind Club Gewoon OS.',
    direction: 'The draft story explores how an operating system could bring everyday work into one clear flow. The real scope, my role, and the decisions we made will replace this example after content review.',
    screens: [],
  },
  {
    slug: 'niko', title: 'Niko', type: 'Digital product', mock: 'niko',
    summary: 'Making the complicated feel straightforward.',
    challenge: 'Sample story: a complex product needs an experience that makes sense to the people using it. The actual brief and project context for Niko will be added here.',
    direction: 'This draft reserves space for the interaction decisions, the technical work behind them, and how I worked with the wider team. The example interface is a layout study, not a screenshot of Niko’s product.',
    screens: [],
  },
  {
    slug: 'dcw-platform', title: 'DCW platform', type: 'Platform development', mock: 'dcw',
    summary: 'A clearer view of a platform’s everyday work.',
    challenge: 'Sample story: people need to follow work across a growing platform without losing the context. The real DCW platform problem and audience will replace this draft.',
    direction: 'This case will make the platform work visible: the data, the flows, and the trade-offs behind them. The example shows the shape of the story while project details and outcomes are still being gathered.',
    screens: [],
  },
  {
    slug: 'switch-to-eu', title: 'Switch to EU', type: 'Web platform', mock: 'eu',
    summary: 'A place to explore European alternatives.',
    challenge: 'Sample story: finding an alternative starts with being able to compare the options. The actual brief, audience, and context for Switch to EU will be added here.',
    direction: 'This draft makes room for the browsing experience, the information behind it, and the decisions that made the product useful. The real scope, my role, screenshots, and outcomes are still to be added.',
    screens: [],
  },
  {
    slug: 'commons-radio', title: 'Commons Radio', type: 'Independent radio', mock: 'radio',
    summary: 'Independent radio. One place to find your next favourite station.',
    challenge: 'Independent and community radio lives in many different places. Commons Radio brings those stations together, with collections that help listeners discover something new.',
    direction: 'This case will follow the product from discovery to listening: how the web and app experiences work together, the decisions behind the player, and my contribution to bringing it all to life.',
    screens: ['commons-radio.png', 'commons-radio-ipad-collection.png', 'commons-radio-iphone-listen.png', 'commons-radio-iphone-player.png'],
  },
];

export function findProject(slug: string) { return projects.find(project => project.slug === slug); }
