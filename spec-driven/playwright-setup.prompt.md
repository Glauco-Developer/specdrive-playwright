# Playwright setup & test generation (spec-driven)

Use this document as the **single source of truth** when the user asks to set up Playwright, run `/playwright:setup`, or generate page tests from URLs.

---

## Phase 0 — Collect URLs (required, do this first)

**Before writing any test files**, ask the user which pages to cover.

Use this exact prompt template:

```
Which pages should we add automated tests for?

Please provide one or more entries in either form:

1. Paths (relative to baseURL), e.g. `/`, `/contact-us/`, `/news-and-updates/`
2. Full URLs (if they belong to the same site)

Also confirm the base URL (default if unsure: ask or read `spec-driven/pages.urls.json`).

Example reply:
- baseURL: https://example.com
- / 
- /contact-us/
- /login/
```

After the user replies:

1. Create or update `spec-driven/pages.urls.json` (see schema below).
2. Set `playwright.config.ts` → `use.baseURL` to the confirmed `baseURL`.
3. Only then proceed to Phase 1–3.

---

## Phase 1 — Project setup (`/playwright:setup`)

If Playwright is not installed yet, follow `project-scaffolding.md`:

| Step | Action |
|------|--------|
| 1 | `npm i -D @playwright/test` |
| 2 | `npx playwright install --with-deps chromium` (CI/local with sudo) or `npx playwright install chromium` |
| 3 | `playwright.config.ts` — `testDir`, `baseURL` from `pages.urls.json`, Chromium, CI retries/reporters (see repo `playwright.config.ts`) |
| 4 | `tests/` directory + at least one smoke spec |
| 5 | `.github/workflows/playwright.yml` — Chromium only, upload HTML report on failure |

**Constraints**

- Only `@playwright/test` (no Cypress, Vitest browser, etc.).
- E2E against live URLs: use **~30s test timeout** and **~10s expect timeout** (not unit-test timings).
- Prefer role-based locators: `getByRole`, `getByLabel`, `getByText` (exact when needed).

**Site changes over time** — read [stability-guidelines.md](./stability-guidelines.md):

- Assert **structure** (sections, nav, href patterns), not rotating CMS copy.
- Put strings that may change in `tests/fixtures/site-contract.ts` (single update point).
- Tag suites: `@stable` (CI gate) vs `@volatile` (news feed, promos, dates).
- Never assert promo banner text; dismiss in `page-helpers.ts` only.

---

## Phase 2 — Explore pages (Playwright MCP or browser MCP)

For **each** entry in `spec-driven/pages.urls.json` → `pages[]`:

1. Navigate to `baseURL + path` (or full `url` if provided).
2. Capture an accessibility snapshot (Playwright MCP `browser_snapshot` or browser MCP equivalent).
3. Record in `spec-driven/pages.inventory.md` (create if missing):

   - Page title (`<title>`)
   - Main heading (`h1`)
   - Primary navigation links
   - Key CTAs (buttons/links)
   - Section headings (`h2`/`h3`)
   - Overlays to dismiss (cookie banners, promo bars)
   - Footer landmarks

4. Note duplicate nodes (mobile + desktop nav) and prefer `.first()` or scoped locators.
5. Label each element **stable** or **volatile** (see [stability-guidelines.md](./stability-guidelines.md)).

**Do not guess selectors** — derive them from the snapshot names/roles.

---

## Phase 3 — Generate tests

### File layout

```
tests/
  fixtures/
    page-helpers.ts      # shared helpers (dismiss banners, goto path)
    site-contract.ts     # stable copy/paths — update when IA changes on purpose
  pages/
    <page-id>.spec.ts    # one spec file per page id in pages.urls.json
spec-driven/
  pages.urls.json        # user URL list (source of truth)
  pages.inventory.md     # element map from MCP exploration
  playwright-setup.prompt.md
```

### Per-page spec rules

For each page in `pages.urls.json`:

1. Create `tests/pages/<id>.spec.ts`.
2. Implement every check listed in `checks[]` (see schema).
3. Use `test.beforeEach` to `goto` the path and run shared helpers.
4. Keep tests independent; no shared mutable state.

### Standard check types

| `checks` value | Assertion |
|----------------|-----------|
| `title` | `toHaveTitle` matches `expectedTitle` or regex from inventory |
| `hero` | `h1` visible with expected text fragment |
| `navigation` | Main nav links visible (`Become a Member`, `Login`, etc. from inventory) |
| `sections` | Each `sections[]` heading visible |
| `ctas` | Each `ctas[]` link/button visible and has correct `href` when applicable |
| `footer` | Footer headings/links visible |
| `links` | Custom link list from inventory |

Extend `checks` only when the user asks for more coverage.

Generate two `test.describe` blocks per page when applicable:

- `@stable` — title, nav, section headings, CTA hrefs, footer landmarks
- `@volatile` — news articles, stats, promo-adjacent content (structure only, not exact titles)

Import shared strings from `tests/fixtures/site-contract.ts`, not inline in every spec.

---

## `pages.urls.json` schema

```json
{
  "baseURL": "https://example.com/",
  "pages": [
    {
      "id": "home",
      "name": "Homepage",
      "path": "/",
      "checks": ["title", "hero", "navigation", "sections", "ctas", "footer"],
      "expectedTitle": "/Example/",
      "heroHeading": "/welcome/i",
      "sections": ["Features", "Pricing"],
      "ctas": [
        { "role": "link", "name": "Get started", "href": "/signup/" }
      ]
    }
  ]
}
```

- `id` — kebab-case, used as spec file name.
- `path` — relative to `baseURL` (leading slash required).
- `url` — optional full URL; overrides `baseURL + path` when set.
- `checks` — array of standard check types (see table above).
- `stable` — optional `{ sections, nav }` overrides for `site-contract.ts`
- `volatile` — optional string tags (`news-feed`, `promo-banner`) documenting what not to hard-code

---

## Phase 4 — Verify

```bash
npm test                  # all tests
npm run test:stable       # only @stable (recommended for CI)
npx playwright show-report   # after failures
```

Fix flaky steps (banners, animations) with helpers in `tests/fixtures/page-helpers.ts`, not arbitrary `waitForTimeout`.

---

## User-facing completion message

When done, respond with:

```
Playwright is set up and tests were generated.

- baseURL: <url>
- Pages covered: <list>
- Specs: tests/pages/*.spec.ts
- URL config: spec-driven/pages.urls.json
- Element inventory: spec-driven/pages.inventory.md

Run: npm test
```

---

## Error handling

| Situation | Action |
|-----------|--------|
| User gave no URLs | Stop at Phase 0; do not generate specs |
| `baseURL` unreachable | Report HTTP error; ask user to confirm URL |
| Browser/MCP unavailable | Use `pages.inventory.md` if present; otherwise fetch static HTML or ask user to retry MCP |
| Duplicate link names | Scope with `getByRole('navigation')` or `.first()` / `.nth()` |
| Test timeout | Prefer `domcontentloaded`; dismiss overlays first |
| Curly apostrophes (`'` U+2019) | Use regex like `/Ireland.s/` or `/we.re/` instead of ASCII `'` in `getByRole` name strings |
