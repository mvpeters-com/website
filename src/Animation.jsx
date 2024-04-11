import Spline from '@splinetool/react-spline';
import {useEffect, useState} from "react";

export default function Animation() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowSize]);

  useEffect(() => {
    if (windowSize.width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize.width]);

  return (
      <Spline style={{
        width: '90%',
        height: '90%',
        position: 'absolute',
        top: '5%',
        left: '5%',
      }} scene={isMobile ? 'https://prod.spline.design/PX7YtOY1JXXr-gFN/scene.splinecode' : 'https://prod.spline.design/1h5V2AEnzh10dGAd/scene.splinecode'}/>
  );
}
