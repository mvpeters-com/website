import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import { testimonials } from "../content/testimonials";

export const ReferencesCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    breakpoints: {
      "(min-width: 768px)": { watchDrag: false },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
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
      if (emblaApi) emblaApi.scrollTo(index, window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    },
    [emblaApi]
  );

  return (
    <section aria-label="Recommendations" aria-roledescription="carousel" className="w-full relative max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-2">What people say</h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} role="group" aria-roledescription="slide" aria-label={`Recommendation ${index + 1} of ${testimonials.length}`} className="flex-[0_0_100%] min-w-0 p-4">
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
              aria-current={index === selectedIndex ? "true" : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-full after:size-2 after:rounded-full after:bg-current transition-colors ${
                index === selectedIndex
                  ? "text-flamingo-400"
                  : "text-gray-400 dark:text-gray-500"
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
    </section>
  );
};
