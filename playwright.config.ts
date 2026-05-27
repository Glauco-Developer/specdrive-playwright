import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const pagesConfigPath = path.join(__dirname, 'spec-driven', 'pages.urls.json');
const pagesConfig = JSON.parse(fs.readFileSync(pagesConfigPath, 'utf-8')) as {
  baseURL?: string;
};

/**
 * Minimal boilerplate for live-site E2E.
 * The base URL comes from spec-driven/pages.urls.json so the same folder can be reused.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  timeout: 30_000,
  expect: { timeout: 10_000 },

  reporter: isCI
    ? [
        ['github'],
        ['html', { open: 'never' }],
        ['list'],
      ]
    : [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? pagesConfig.baseURL,
    ...devices['Desktop Chrome'],
    screenshot: 'only-on-failure',
    trace: 'off',
    video: 'off',
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
