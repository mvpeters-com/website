import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

/** Both apps use this pipeline; brand and routes remain inside each app. */
export function siteConfig({ port, srcDir }: { port: number; srcDir: string }) {
  return defineConfig({
    server: { port, strictPort: true },
    resolve: { alias: { '@': srcDir }, dedupe: ['react', 'react-dom'] },
    plugins: [tailwindcss(), tanstackStart(), nitro(), react()],
  });
}
