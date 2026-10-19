import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { trace: 'retain-on-failure', reducedMotion: 'reduce' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: [
    { command: 'pnpm --filter @website/mvpeters start', url: 'http://localhost:3100', env: { PORT: '3100' }, reuseExistingServer: false },
    { command: 'pnpm --filter @website/spaced start', url: 'http://localhost:3101', env: { PORT: '3101' }, reuseExistingServer: false },
  ],
});
