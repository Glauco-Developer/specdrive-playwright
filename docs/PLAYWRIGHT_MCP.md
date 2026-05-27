# Playwright MCP

This boilerplate is designed to be used with **Playwright MCP in Cursor**.

## Install

```bash
npm ci
npx playwright install --with-deps chromium
npx playwright install --with-deps chrome
```

## Important

- `chromium` is for `npm test`
- `chrome` is for Playwright MCP
- installing only `chromium` is not enough for MCP

Restart Cursor after installing `chrome`.

## Validate MCP

Ask the AI:

```text
Use Playwright MCP to open https://example.com and take a snapshot.
```

If MCP is working, the AI can navigate and inspect the page before creating tests.

## Expected workflow

1. You provide the URLs
2. The AI updates `spec-driven/pages.urls.json`
3. The AI explores the pages with MCP
4. The AI creates `tests/pages/*.spec.ts`

## Common error

If you see `chrome is not found`, run:

```bash
npx playwright install --with-deps chrome
```
