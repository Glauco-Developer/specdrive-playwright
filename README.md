# Playwright MCP Boilerplate

Minimal boilerplate for E2E tests with `@playwright/test` and page exploration through **Playwright MCP**.

This repository is meant to be copied into any web project as a starting point. The intended AI workflow is:

1. Ask which URLs should be covered
2. Update `spec-driven/pages.urls.json`
3. Explore each page with Playwright MCP
4. Create or update `tests/pages/*.spec.ts`

## Structure

```text
tests/
  helpers/
    page-spec.ts
  pages/
    home.spec.ts
spec-driven/
  README.md
  ai-init.prompt.md
  pages.urls.json
  pages.urls.example.json
  pages.inventory.md
docs/
  PLAYWRIGHT_MCP.md
playwright.config.ts
```

## Install

```bash
npm ci
npx playwright install --with-deps chromium
npx playwright install --with-deps chrome
```

- `chromium` is used for local runs and CI
- `chrome` is used by Playwright MCP in Cursor

## Usage

1. Update `spec-driven/pages.urls.json`
2. Generate or edit `tests/pages/*.spec.ts`
3. Run:

```bash
npm test
```

Useful commands:

- `npm run test:stable`
- `npm run test:ui`
- `npm run test:headed`
- `npm run report`

## Recommended AI prompt

Use [spec-driven/ai-init.prompt.md](/home/glauco/.local/share/me/mcp-aula/spec-driven/ai-init.prompt.md).

Short version:

```text
Set up Playwright MCP tests in this project.
First ask which URLs should be covered.
Then update spec-driven/pages.urls.json, explore the pages with MCP,
and create one tests/pages/<id>.spec.ts file per page.
Keep the structure minimal and follow the existing example.
```

## Rules for AI-generated specs

- One file per page in `tests/pages/`
- Reuse `tests/helpers/page-spec.ts`
- Use `@volatile` only for frequently changing content
- Prefer `getByRole`, `getByText`, and simple assertions
- Avoid extra abstraction unless it removes real repetition

## Next step

To create real specs for a project, provide:

- `baseURL`
- a list of paths such as `/`, `/about/`, `/contact/`
