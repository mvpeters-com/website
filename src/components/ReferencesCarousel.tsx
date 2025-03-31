import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

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
const testimonials: Testimonial[] = [
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

export const ReferencesCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    breakpoints: {
      "(min-width: 768px)": { watchDrag: false },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="w-full relative max-w-4xl">
      <div className="text-3xl md:text-4xl font-bold mb-2">What people say</div>

      <div className="overflow-hidden -mx-4" ref={emblaRef}>
        <div className="flex mx-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 m-4">
              <blockquote className="text-xl md:text-2xl italic font-light mb-6">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {testimonial.title} at{" "}
                    <a
                      href={testimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {testimonial.company}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === selectedIndex
                  ? "bg-flamingo-400"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
