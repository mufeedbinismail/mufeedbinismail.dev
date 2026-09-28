import { defineConfig, devices } from '@playwright/test';

// Runs against the production build, served like Cloudflare Pages serves it,
// in the locally installed Chrome, so no browser download is needed.
export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.e2e.ts',
  use: { baseURL: 'http://localhost:4322', ...devices['Desktop Chrome'], channel: 'chrome' },
  webServer: {
    command: 'npm run build && node e2e/serve-dist.mjs 4322',
    url: 'http://localhost:4322',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
