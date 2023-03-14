import { defineConfig } from '@playwright/test';

const url = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000/';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: false,
    baseURL: url,
    viewport: { width: 1080, height: 720 },
  },
});
