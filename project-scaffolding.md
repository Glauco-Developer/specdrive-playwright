# Project Scaffolding

Short checklist for copying this boilerplate into another project:

1. Copy the test folder and `spec-driven/`
2. Run `npm i -D @playwright/test`
3. Run `npx playwright install --with-deps chromium`
4. Run `npx playwright install --with-deps chrome`
5. Update `spec-driven/pages.urls.json`
6. Ask the AI to generate specs using `spec-driven/ai-init.prompt.md`

Main files:

- `playwright.config.ts`
- `tests/helpers/page-spec.ts`
- `tests/pages/home.spec.ts`
- `spec-driven/pages.urls.example.json`
