import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@website/ui/dialog';

const dismissalKey = 'spaced-mvpeters-announcement-v1';

export function MvpetersAnnouncement() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { setOpen(sessionStorage.getItem(dismissalKey) !== 'dismissed'); }
    catch { setOpen(true); }
  }, []);

  function changeOpen(next: boolean) {
    setOpen(next);
    if (!next) {
      try { sessionStorage.setItem(dismissalKey, 'dismissed'); } catch { /* Dismissal works when storage is unavailable. */ }
    }
  }

  return <Dialog open={open} onOpenChange={changeOpen}>
    <DialogContent closeLabel="Sluiten" className="max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-2xl gap-7 overflow-y-auto rounded-none border-foreground bg-ivory p-7 pt-14 sm:rounded-none sm:p-12 sm:pt-16"
      onCloseAutoFocus={(event) => { event.preventDefault(); document.getElementById('spaced-home-link')?.focus(); }}>
      <DialogTitle className="max-w-lg text-4xl leading-[1.15] font-normal tracking-normal sm:text-6xl">Spaced is nu MVPeters.</DialogTitle>
      <DialogDescription className="max-w-prose text-lg leading-relaxed text-foreground sm:text-xl">Simon gaat verder als MVPeters. Voor nieuwe projecten en contact vind je hem voortaan op mvpeters.com.</DialogDescription>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
        <a href="https://mvpeters.com" onClick={() => changeOpen(false)} className="inline-flex min-h-12 items-center justify-center bg-foreground px-6 py-3 text-lg text-background transition-colors hover:bg-foreground/80">Ontdek MVPeters</a>
        <DialogClose className="min-h-12 py-3 text-lg underline underline-offset-4">Verder naar Spaced</DialogClose>
      </div>
    </DialogContent>
  </Dialog>;
}
