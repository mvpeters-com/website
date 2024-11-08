// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react(), tailwind({
      applyBaseStyles: false,
    })],

  output: 'server',
  adapter: vercel()
});