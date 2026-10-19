import { Moon, Sun } from 'lucide-react';
import { Button } from '@website/ui/button';

export function ModeToggle() {
  function toggleTheme() {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* Theme still works without storage. */ }
  }

  return <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme"><Sun aria-hidden="true" className="dark:hidden" /><Moon aria-hidden="true" className="hidden dark:block" /></Button>;
}
