import { useLottie } from "lottie-react";
import animationData from "./blob.json";
import { useState } from "react";

export function AnimatedBlob() {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
  };

  const { View, playSegments, goToAndStop } = useLottie(defaultOptions);
  const [selectedSegment, setSelectedSegment] = useState<{ start: number; end: number } | null>(null);

  const segments = [
    {
      "start": 0,
      "end": 15
    }, 
    {
      "start": 16,
      "end": 30
    }, 
    {
      "start": 31,
      "end": 45
    }
  ]


  const handleMouseEnter = () => {
    console.log("mouse enter");
    // Get a random segment from the segments array
    const randomSegment = segments[Math.floor(Math.random() * segments.length)];
    setSelectedSegment(randomSegment);
    playSegments([randomSegment.start, randomSegment.end], true);
  };

  const handleMouseLeave = () => {
    if (selectedSegment) {
      playSegments([selectedSegment.end, selectedSegment.start], false);
      setSelectedSegment(null);
    }
  };

  return (
    <div 
      className="w-[40px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {View}
    </div>
  );
}
