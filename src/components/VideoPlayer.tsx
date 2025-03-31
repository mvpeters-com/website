import React from "react";
import MuxPlayer from "@mux/mux-player-react";

// Custom event names
export const VIDEO_PLAY_EVENT = "video-play-requested";
export const HOVER_START_EVENT = "hover-start";
export const HOVER_MOVE_EVENT = "hover-move";
export const HOVER_END_EVENT = "hover-end";

interface VideoConfig {
  desktopPlaybackId: string;
  mobilePlaybackId: string;
}

type VideoSlug =
  | "interim-cto"
  | "inclusive-developer"
  | "pragmatic-digital-builder";

const videos: Record<VideoSlug, VideoConfig> = {
  "interim-cto": {
    desktopPlaybackId: "9iN02OeFuZV4Gz6slDLRY3E3tDS6NaqVxzlaMQDlZxG00",
    mobilePlaybackId: "8FuOEsucOCrJwIFlCXMDXscTwCtc66tGPGzj0100Vmu68",
  },
  "inclusive-developer": {
    desktopPlaybackId: "9iN02OeFuZV4Gz6slDLRY3E3tDS6NaqVxzlaMQDlZxG00",
    mobilePlaybackId: "8FuOEsucOCrJwIFlCXMDXscTwCtc66tGPGzj0100Vmu68",
  },
  "pragmatic-digital-builder": {
    desktopPlaybackId: "9iN02OeFuZV4Gz6slDLRY3E3tDS6NaqVxzlaMQDlZxG00",
    mobilePlaybackId: "8FuOEsucOCrJwIFlCXMDXscTwCtc66tGPGzj0100Vmu68",
  },
};

// Event interfaces
interface VideoPlayRequest {
  videoSlug: VideoSlug;
  metadata?: {
    video_title?: string;
    video_id?: string;
  };
}

interface HoverStartPayload {
  imageUrl: string;
}

interface HoverMovePayload {
  x: number;
  y: number;
}

// Button component props
interface VideoPlayerButtonProps {
  videoSlug: VideoSlug;
  buttonText?: string;
}

export const VideoPlayerButton = ({
  videoSlug,
  buttonText = "Play Video",
}: VideoPlayerButtonProps) => {
  const [supportsHover, setSupportsHover] = React.useState(false);

  // Check if device supports hover on mount
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setSupportsHover(mediaQuery.matches);
  }, []);

  const handlePlay = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Dispatch custom event
    const event = new CustomEvent<VideoPlayRequest>(VIDEO_PLAY_EVENT, {
      detail: { videoSlug },
    });

    document.dispatchEvent(event);
  };

  const handleMouseEnter = () => {
    if (!supportsHover) return;

    const video = videos[videoSlug];
    if (!video) return;

    const gifUrl = `https://image.mux.com/${video.desktopPlaybackId}/animated.gif?start=11&end=16&width=640&fps=30`;

    // Dispatch hover start event
    const event = new CustomEvent<HoverStartPayload>(HOVER_START_EVENT, {
      detail: { imageUrl: gifUrl },
    });

    document.dispatchEvent(event);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!supportsHover) return;

    // Dispatch hover move event
    const event = new CustomEvent<HoverMovePayload>(HOVER_MOVE_EVENT, {
      detail: { x: e.clientX, y: e.clientY },
    });

    document.dispatchEvent(event);
  };

  const handleMouseLeave = () => {
    if (!supportsHover) return;

    // Dispatch hover end event
    document.dispatchEvent(new CustomEvent(HOVER_END_EVENT));
  };

  return (
    <span className="relative inline">
      <a
        role="button"
        className="underline text-flamingo-400 hover:text-flamingo-500 transition-colors"
        onClick={handlePlay}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {buttonText}
      </a>
    </span>
  );
};

export const HoverPreview = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleHoverStart = (e: Event) => {
      const customEvent = e as CustomEvent<HoverStartPayload>;
      setImageUrl(customEvent.detail.imageUrl);
      setIsVisible(true);
    };

    const handleHoverMove = (e: Event) => {
      const customEvent = e as CustomEvent<HoverMovePayload>;
      setPosition({
        x: customEvent.detail.x,
        y: customEvent.detail.y,
      });
    };

    const handleHoverEnd = () => {
      setIsVisible(false);
    };

    // Add event listeners
    document.addEventListener(HOVER_START_EVENT, handleHoverStart);
    document.addEventListener(HOVER_MOVE_EVENT, handleHoverMove);
    document.addEventListener(HOVER_END_EVENT, handleHoverEnd);

    return () => {
      document.removeEventListener(HOVER_START_EVENT, handleHoverStart);
      document.removeEventListener(HOVER_MOVE_EVENT, handleHoverMove);
      document.removeEventListener(HOVER_END_EVENT, handleHoverEnd);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 220}px`, // Offset above the cursor
        transform: "translateX(-50%)",
      }}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt="Video preview"
          className="rounded-lg shadow-lg max-w-[320px] w-auto h-auto"
        />
        <div className="absolute inset-0 rounded-lg border border-flamingo-400/20" />
      </div>
    </div>
  );
};

interface VideoPlayerProps {
  videoSlug: VideoSlug;
}

export const VideoPlayer = ({ videoSlug }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState(false);
  const playerRef = React.useRef<HTMLDivElement>(null);
  const muxPlayerRef = React.useRef<any>(null);
  const [metadata, setMetadata] = React.useState({});

  const video = videos[videoSlug];

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

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isOpen]);

  // Handle video play event
  React.useEffect(() => {
    const handleVideoPlay = async (e: Event) => {
      const customEvent = e as CustomEvent<VideoPlayRequest>;
      if (customEvent.detail.videoSlug !== videoSlug) return;

      setIsOpen(true);
      setMetadata(customEvent.detail.metadata || {});

      if (playerRef.current) {
        try {
          await playerRef.current.requestFullscreen();
          if (muxPlayerRef.current) {
            muxPlayerRef.current.play();
          }
        } catch (err) {
          console.error("Error requesting fullscreen:", err);
        }
      }
    };

    // Add event listener for custom event
    document.addEventListener(VIDEO_PLAY_EVENT, handleVideoPlay);

    return () => {
      document.removeEventListener(VIDEO_PLAY_EVENT, handleVideoPlay);
    };
  }, [videoSlug]);

  // Handle orientation detection
  React.useEffect(() => {
    checkOrientation();

    const handleResize = () => {
      checkOrientation();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  if (!video) return null;

  return (
    <div
      ref={playerRef}
      className={`fixed inset-0 z-50 bg-flamingo-400 ${isOpen ? "block" : "hidden"}`}
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
        playbackId={
          isPortrait ? video.mobilePlaybackId : video.desktopPlaybackId
        }
        metadata={metadata}
        autoPlay={false}
        loop={false}
        preload="metadata"
        streamType="on-demand"
        accentColor="#ff4f1a"
        placeholder="none"
        poster=""
        onEnded={handleClose}
        style={{
          height: "100%",
          width: "100%",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
        forwardSeekOffset={0}
        backwardSeekOffset={0}
      />
    </div>
  );
};
