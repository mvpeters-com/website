// Define testimonial data structure
interface Testimonial {
  name: string;
  title: string;
  company: string;
  website: string;
  email: string;
  quote: string;
  avatar: string;
}

// Same testimonials as in referrals.tsx
export const testimonials: Testimonial[] = [
  {
    name: "Paul De Lange",
    title: "Founder",
    company: "Calabi",
    website: "https://calabi.be",
    email: "paul@calabi.be",
    quote:
      "Simon led the development of our complex software at Calabi for more than 2 years. His choices, methodology, and execution demonstrate not only a deep understanding of the technology but also of the end user. He is a hard and thorough worker, and through his ability to ask the right questions at the right moments, there is now a robust and intuitive application that is used daily by 100+ companies.",
    avatar: "/referrals/paul.jpeg",
  },
  {
    name: "Luc Heylen",
    title: "Managing Partner",
    company: "WeWantMore",
    website: "https://wewantmore.studio",
    email: "luc@wewantmore.studio",
    quote:
      "We were looking for a developer with the necessary technical skills, the right mindset, and a genuine interest in sustainability to help us develop the Monark app. Luckily, Simon was interested in our project—and he went the extra mile, which truly made a huge difference!",
    avatar: "/referrals/luc.jpeg",
  },
  {
    name: "Dieter Desmet",
    title: "Co-Founder & designer",
    company: "Omvorm",
    website: "https://omvorm.studio",
    email: "dieter@omvorm.studio",
    quote:
      "I’ve had the pleasure of working closely with Simon on several projects. He’s fully committed, thinks beyond development, and ensures the right tech and strategic choices are made to deliver within scope, time, and budget. Realistic, hands-on, yet always mindful of the big picture. Passionate about tech, strong in UX and design, and incredibly knowledgeable. Solid, fast, flexible—and great to brainstorm with as a designer.",
    avatar: "/referrals/dieter.jpeg",
  },
  {
    name: "Emma Bracke",
    title: "Deputy Director",
    company: "Awel",
    website: "https://awel.be",
    email: "emma@awel.be",
    quote:
      "The collaboration with Spaced felt incredibly smooth right from the start. Simon excels at explaining the technical aspects in an accessible and digestible way. He consistently thinks along with the needs and possibilities of our organization and delivers a well-crafted final result with care.",
    avatar: "/referrals/emma.jpeg",
  },
];
