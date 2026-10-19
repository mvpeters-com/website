import type { ReactNode } from 'react';

export function SkipLink({ children = 'Skip to content' }: { children?: ReactNode }) {
  return <a href="#main" className="sr-only fixed top-4 left-4 z-[100] bg-background p-3 text-foreground focus:not-sr-only">{children}</a>;
}
