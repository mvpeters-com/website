import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    name: "Luc Heylen",
    title: "Managing Partner",
    company: "WeWantMore",
    website: "https://wewantmore.studio",
    email: "luc@wewantmore.studio",
    quote:
      "We were looking for a developer with the necessary technical skills, the right mindset and an interest in sustainability to help us develop the Monark app. Luckily Simon was interested in our project and went the extra mile which made a huge difference!",
    avatar: "/referrals/luc.jpeg",
  },
  {
    name: "Paul Delange",
    title: "Founder",
    company: "Calabi",
    website: "https://calabi.be",
    email: "paul@calabi.be",
    quote:
      "Simon led the development of our complex software at Calabi for more than 2 years. His choices, methodology, and execution demonstrate not only a deep understanding of the technology but also of the end user. He is a hard and thorough worker, and through his ability to ask the right questions at the right moments, there is now a robust and intuitive application that is used daily by 100+ companies.",
    avatar: "/referrals/paul.jpeg",
  },
  {
    name: "Dieter Desmet",
    title: "Co-Founder & designer",
    company: "Omvorm",
    website: "https://omvorm.studio",
    email: "dieter@omvorm.studio",
    quote:
      "I have had the pleasure of working closely with Simon on various projects. Simon commits fully to a project and thinks far beyond mere development. Simon ensures that the right technological and strategic choices are made to make a project succeed within a given scope, timing and budget. Realistic and hands-on without losing sight of the big picture. A passion for technology, a heart for UX and design, and a very broad range of knowledge. Simon is solid, fast and extremely flexible. Very pleasant to brainstorm with as a designer.",
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

const animationDuration = 200;

// Define animation styles as objects that can be applied inline
const slideAnimations = {
  slideInRight: {
    animation: `slideInRight ${animationDuration}ms forwards`,
  },
  slideInLeft: {
    animation: `slideInLeft ${animationDuration}ms forwards`,
  },
  slideOutRight: {
    animation: `slideOutRight ${animationDuration}ms forwards`,
  },
  slideOutLeft: {
    animation: `slideOutLeft ${animationDuration}ms forwards`,
  },
  // Add the keyframes as a string that can be inserted in the head
  keyframes: `
    @keyframes slideInRight {
      0% { transform: translateX(100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInLeft {
      0% { transform: translateX(-100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideOutLeft {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(-100%); opacity: 0; }
    }
  `,
};

export const ReferencesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Create refs for each testimonial content
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>(
    Array(testimonials.length).fill(null)
  );
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Add animation styles to document head when component mounts
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = slideAnimations.keyframes;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const updateHeight = useCallback(() => {
    const currentRef = testimonialRefs.current[currentIndex];
    if (currentRef) {
      setContainerHeight(currentRef.scrollHeight);
    }
  }, [currentIndex]);

  // We don't need to initialize the array again since we did it in the initial ref creation
  // Instead, we'll add a useEffect for after mount to ensure we render all testimonials once
  useEffect(() => {
    // Set a flag to render all testimonials once for measurement
    setIsInitialized(true);
  }, []);

  // After initial mount, force an update of the height
  useEffect(() => {
    if (isInitialized) {
      updateHeight();
    }
  }, [isInitialized, updateHeight]);

  // Update height when current index changes or after animation completes
  useEffect(() => {
    // Set initial height
    updateHeight();

    // Also update after a small delay to ensure content has rendered
    const timer = setTimeout(updateHeight, 50);
    return () => clearTimeout(timer);
  }, [currentIndex, isAnimating, updateHeight]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPreviousIndex(null);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setDirection(index > currentIndex ? "right" : "left");
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full relative max-w-4xl">
      <div className="text-3xl md:text-4xl font-bold mb-8">What people say</div>

      <div
        className="relative overflow-hidden"
        style={{
          height: containerHeight ? `${containerHeight}px` : "auto",
          transition: "height 200ms ease-in-out",
        }}
        ref={contentWrapperRef}
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === currentIndex;
          const isAnimatingOut = previousIndex === index && isAnimating;
          const shouldRender = isActive || isAnimatingOut || !isInitialized;

          if (!shouldRender) return null;

          // Determine animation style based on slide state and direction
          let animationStyle = {};

          if (isAnimating && isInitialized) {
            if (isActive) {
              // This is the slide coming in
              animationStyle =
                direction === "right"
                  ? slideAnimations.slideInRight
                  : slideAnimations.slideInLeft;
            } else {
              // This is the slide going out
              animationStyle =
                direction === "right"
                  ? slideAnimations.slideOutLeft
                  : slideAnimations.slideOutRight;
            }
          }

          // For non-visible slides during initialization, hide them but still render for measurement
          const visibilityClass =
            !isInitialized && !isActive ? "opacity-0 absolute" : "";

          return (
            <div
              key={index}
              ref={(el) => {
                testimonialRefs.current[index] = el;
                // If this is the initial active slide, update height once ref is set
                if (isActive && el && !containerHeight) {
                  setTimeout(() => updateHeight(), 0);
                }
              }}
              className={`absolute top-0 left-0 w-full ${visibilityClass}`}
              style={{
                // Use visibility:hidden instead of display:none for non-active slides during initialization
                // so they can still be measured
                visibility: !isInitialized && !isActive ? "hidden" : "visible",
                pointerEvents: !isActive && isInitialized ? "none" : "auto",
                // Apply animation styles
                ...animationStyle,
              }}
            >
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
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-flamingo-400"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
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
