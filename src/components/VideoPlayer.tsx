import React, { useRef } from 'react';
import MuxPlayer from "@mux/mux-player-react";
import { Button } from './ui/button';
import { X } from 'lucide-react';

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
  const playerRef = React.useRef<HTMLDivElement>(null);
  const playerInitTime = useRef(Date.now());
  const muxPlayerRef = React.useRef<any>(null);

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

  const gifUrl = `https://image.mux.com/${desktopPlaybackId}/animated.gif?start=0&end=4&width=640&fps=30`;

  return (
    <>
      <span className="relative inline-block">
        <a
          href="#"
          className="text-4xl underline text-flamingo-400 hover:text-flamingo-500 transition-colors"
          onClick={handlePlay}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {buttonText}
        </a>,
        
        {isHovered && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50">
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

      <span 
        ref={playerRef}
        className={`fixed inset-0 z-50 bg-flamingo-400 ${isOpen ? 'block' : 'hidden'}`}
      >
          <MuxPlayer
            ref={muxPlayerRef}
            playerInitTime={undefined}
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
      </span>
    </>
  );
}; 