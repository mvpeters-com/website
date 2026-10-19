export interface Project {
  title: string;
  kind: string;
  client: string;
  date?: string;
  description: string;
  services: string;
  url: string;
  images: readonly string[];
  linkLabel?: string;
}

export const projects: readonly Project[] = [
  {
    title: 'Commons Radio',
    kind: 'Webplatform',
    client: 'Commons Radio',
    description: 'Hoe maken we onafhankelijke radio van over de hele wereld toegankelijk op één plek? Commons Radio brengt onafhankelijke en communityradio samen, gratis en zonder account.',
    services: 'Web Development, Applicatieontwikkeling',
    url: 'https://www.commonsradio.eu/',
    images: ['commons-radio.png'],
    linkLabel: 'Ontdek Commons Radio',
  },
  {
    "title": "Ik ben daar",
    "kind": "Website",
    "client": "WATWAT",
    "date": "18.06.2021",
    "description": "Hoe kunnen we jongeren helpen bij het maken van een weloverwogen keuze omtrent de coronavaccinatie?",
    "services": "Conceptvorming, Digitaal Design, Animatie, Web Development",
    "url": "https://ikbendaar.be/",
    "images": [
      "ikbendaar-1.png",
      "ikbendaar-2.png",
      "ikbendaar-4.png",
      "ikbendaar-3.png",
      "ikbendaar-5.png"
    ]
  },
  {
    "title": "Meer mensen, meer toekomst",
    "kind": "Webplatform",
    "client": "Provincie Oost-Vlaanderen",
    "date": "24.11.2020",
    "description": "Hoe kunnen we burgemeesters een beter beeld geven van alle kansrijke plekken en ruimtelijke mogelijkheden in hun gemeente?",
    "services": "Conceptvorming, Design Sprint, Prototyping, Digitaal Design, Web Development",
    "url": "https://meermensenmeertoekomst.be/home",
    "images": [
      "meertoekomst-1.png",
      "meertoekomst-2.png",
      "meertoekomst-3.png",
      "meertoekomst-4.png",
      "meertoekomst-5.png"
    ]
  },
  {
    "title": "Heyday",
    "kind": "Applicatie",
    "client": "CAW / Jac",
    "date": "20.02.2020",
    "description": "Hoe kunnen we het leven van thuis- en dakloze jongeren verlichten? Hoe kunnen we ze helpen naar een eenvoudiger leven?",
    "services": "Gebruikersonderzoek, Design Sprint, Prototyping, Digitaal Design, Web Development",
    "url": "https://www.caw.be/wat-beweegt-er/nieuws/nieuwe-app/",
    "images": [
      "heyday12x.png",
      "heyday-phone2x.png",
      "heyday32x.png",
      "heyday42x.png",
      "heyday22x.png"
    ]
  },
  {
    "title": "June",
    "kind": "Webplatform",
    "client": "June",
    "date": "08.08.2019",
    "description": "Hoe kunnen we energie consumenten op een gebruiksvriendelijke manier de weg tonen naar een automatisch geoptimaliseerde energiefactuur?",
    "services": "Onderhoud, Design Systeem, Digitaal Design, Web Development",
    "url": "https://www.june.energy/nl/",
    "images": [
      "june-1.png",
      "june-2.png",
      "june-3.png",
      "june-4.png",
      "june-5.png"
    ]
  }
];
