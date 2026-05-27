# Project scaffolding — Playwright

For URL-driven test generation and the full AI workflow, see [spec-driven/playwright-setup.prompt.md](./spec-driven/playwright-setup.prompt.md).

## What to include

- Install only Playwright test runner (no extra frameworks)
- Configure `baseURL` and timeouts suited to E2E against a real URL (see `playwright.config.ts`: 30s test, 10s expect)
- Create a `tests/` directory and a first spec using `@playwright/test`
- CI: GitHub Actions workflow that installs and runs only Chromium

## Local setup

1. **Install dev dependency**

   ```bash
   npm i -D @playwright/test
   ```

2. **Install only Chromium browser binaries (smaller and faster)**

   ```bash
   npx playwright install --with-deps chromium
   ```

## GitHub Actions (Chromium only)

Create `.github/workflows/playwright.yml` with a job that:

- Checks out the repo
- Sets up Node.js
- Runs `npm ci`
- Runs `npx playwright install --with-deps chromium`
- Runs `npm test`
- Uploads the HTML report as an artifact on failure
