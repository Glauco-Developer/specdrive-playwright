import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

/**
 * E2E tests against a live staging/production URL.
 * Timeouts are higher than unit tests because network + CMS render add latency.
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
    baseURL: 'https://thewheel.wpenginepowered.com/',
    ...devices['Desktop Chrome'],
    // Evidências em falha (ver README — o essencial é o relatório HTML):
    screenshot: 'only-on-failure', // print da tela → aparece no npm run report
    trace: 'off', // gravação passo a passo (.zip) — desligado por padrão
    video: 'off', // vídeo da run — desligado (pesado, raramente necessário)
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
