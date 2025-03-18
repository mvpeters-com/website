import React from 'react';
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  desktopPlaybackId: string;
  mobilePlaybackId: string;
  buttonText?: string;
  metadata?: {
    video_title?: string;
    video_id?: string;
  };
}

export const VideoPlayer = ({ 
  desktopPlaybackId, 
  mobilePlaybackId, 
  buttonText = 'Play Video',
  metadata = {}
}: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [supportsHover, setSupportsHover] = React.useState(false);
  const playerRef = React.useRef<HTMLDivElement>(null);
  const muxPlayerRef = React.useRef<any>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Check if device supports hover on mount
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);
  }, []);

  // Function to check orientation
  const checkOrientation = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsOpen(false);
    if (muxPlayerRef.current) {
      muxPlayerRef.current.pause();
    }
  };

  // Handle fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isOpen]);

  // Handle video play
  const handlePlay = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setIsOpen(true);
    if (playerRef.current) {
      try {
        await playerRef.current.requestFullscreen();
        if (muxPlayerRef.current) {
          muxPlayerRef.current.play();
        }
      } catch (err) {
        console.error('Error requesting fullscreen:', err);
      }
    }
  };

  // Handle orientation detection
  React.useEffect(() => {
    checkOrientation();
    
    const handleResize = () => {
      checkOrientation();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!supportsHover) return;
    
    // Get the position relative to the viewport
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const gifUrl = `https://image.mux.com/${desktopPlaybackId}/animated.gif?start=11&end=16&width=640&fps=30`;

  return (
    <>
      <span className="relative inline-block">
        <a
         role="button"
          className="underline text-flamingo-400 hover:text-flamingo-500 transition-colors"
          onClick={handlePlay}
          onMouseEnter={() => supportsHover && setIsHovered(true)}
          onMouseLeave={() => supportsHover && setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {buttonText}
        </a>,
        
        {isHovered && supportsHover && (
          <div 
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y - 220}px`, // Offset above the cursor
              transform: 'translateX(-50%)'
            }}
          >
            <div className="relative">
              <img 
                src={gifUrl} 
                alt="Video preview" 
                className="rounded-lg shadow-lg max-w-[320px] w-auto h-auto"
              />
              <div className="absolute inset-0 rounded-lg border border-flamingo-400/20" />
            </div>
          </div>
        )}
      </span>

      <div 
        ref={playerRef}
        className={`fixed inset-0 z-50 bg-flamingo-400 ${isOpen ? 'block' : 'hidden'}`}
      >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            aria-label="Close video"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <MuxPlayer
            ref={muxPlayerRef}
            playbackId={isPortrait ? mobilePlaybackId : desktopPlaybackId}
            metadata={metadata}
            autoPlay={false}
            loop={false}
            streamType="on-demand"
            accentColor="#ff4f1a"
            placeholder="none"
            poster=""
            onEnded={handleClose}
            style={{
              height: '100%',
              width: '100%',
              maxWidth: '100vw',
              maxHeight: '100vh',
            }}
            forwardSeekOffset={0}
            backwardSeekOffset={0}
          />
      </div>
    </>
  );
}; 