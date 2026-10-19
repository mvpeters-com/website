import { lazy, Suspense, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@website/ui/dialog';

const MuxPlayer = lazy(() => import('@mux/mux-player-react'));
const desktopPlaybackId = '9iN02OeFuZV4Gz6slDLRY3E3tDS6NaqVxzlaMQDlZxG00';
const mobilePlaybackId = '8FuOEsucOCrJwIFlCXMDXscTwCtc66tGPGzj0100Vmu68';

export function InterimVideo({ label = 'interim CTO', className = '' }: { label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [preview, setPreview] = useState<{ x: number; y: number } | null>(null);

  return <Dialog open={open} onOpenChange={(next) => {
    if (next) setPortrait(window.innerHeight > window.innerWidth);
    setOpen(next);
    setPreview(null);
  }}>
    <DialogTrigger asChild>
      <button type="button" className={`text-primary underline transition-colors hover:text-flamingo-500 dark:hover:text-flamingo-200 ${className}`}
        onPointerMove={(event) => {
          if (event.pointerType === 'mouse' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setPreview({ x: Math.min(Math.max(event.clientX, 168), window.innerWidth - 168), y: Math.max(event.clientY - 200, 8) });
          }
        }} onPointerLeave={() => setPreview(null)}>{label}</button>
    </DialogTrigger>
    {preview && !open && <img aria-hidden="true" alt="" src={`https://image.mux.com/${desktopPlaybackId}/animated.gif?start=11&end=16&width=640&fps=30`} className="pointer-events-none fixed z-40 w-80 -translate-x-1/2 rounded-lg shadow-lg" style={{ left: preview.x, top: preview.y }} />}
    <DialogContent className="inset-0 top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-0 bg-background p-0 sm:rounded-none">
      <DialogTitle className="sr-only">Simon as interim CTO</DialogTitle>
      <DialogDescription className="sr-only">Watch Simon explain his work as an interim CTO.</DialogDescription>
      {open && <Suspense fallback={<p role="status">Loading video…</p>}><MuxPlayer playbackId={portrait ? mobilePlaybackId : desktopPlaybackId} autoPlay streamType="on-demand" accentColor="#ff4f1a" onEnded={() => setOpen(false)} style={{ width: '100%', height: '100%' }} /></Suspense>}
    </DialogContent>
  </Dialog>;
}
