# Stability guidelines — tests that survive site changes

The site **will change** (CMS content, promos, news, dates, copy tweaks). Tests should fail only when something **meaningful** breaks—not when a blog post rotates.

## Stable vs volatile

| Stable (assert in every run) | Volatile (avoid hard-coding) |
|------------------------------|------------------------------|
| Brand in `<title>` (partial regex) | Exact news article titles |
| Core `h1` / main section **headings** | Promo banner text (“Summit 2026”, etc.) |
| Primary **nav** labels & top-level IA | Dates on news cards |
| Section **structure** (e.g. “How we help” exists) | Stats numbers (2,600+ members) |
| Critical CTA **href patterns** (`/join-us/`, `/login/`) | Copyright year in footer |
| Footer **landmarks** (Newsletter, Privacy) | Benefit bullet wording (prefer count) |
| Accessibility (skip link, main landmarks) | Featured training cards in mega-menu |

When exploring with MCP, tag each element in `pages.inventory.md` as **stable** or **volatile**.

## Where to update when the site changes on purpose

| Change type | Update here |
|-------------|-------------|
| Nav renamed / new top-level section | `tests/fixtures/site-contract.ts` → `primaryNav`, `sections` |
| Hero or brand title changed | `site-contract.ts` → `brandTitle`, `heroH1` |
| CTA paths moved | `site-contract.ts` → `ctas` + `spec-driven/pages.urls.json` |
| New page to test | `spec-driven/pages.urls.json` + new `tests/pages/<id>.spec.ts` |
| Re-explore DOM after redesign | `spec-driven/pages.inventory.md` (re-run Phase 2) |

**Do not** scatter copy strings across many spec files—keep contracts in one place.

## Test design rules

1. **Prefer structure over copy** — e.g. “news section has ≥1 article link”, not a specific headline.
2. **Prefer href patterns over full URLs** — `/news-and-updates/` not full domain.
3. **Use regex for typography** — curly apostrophes: `/Ireland.s/`, `/we.re/`.
4. **Dismiss overlays in helpers** — promos/cookies; never assert promo text.
5. **Tag optional suites** — `@volatile` for checks that may need frequent updates; `@stable` for CI gate.
6. **Re-run MCP exploration** after major redesigns, then adjust `site-contract.ts` only.

## `pages.urls.json` stability fields

```json
{
  "stable": {
    "sections": ["How we help"],
    "nav": ["Get Support", "Login"]
  },
  "volatile": ["news-feed", "promo-banner", "footer-year"]
}
```

AI: when generating specs, put volatile checks in `test.describe('@volatile')` and stable checks in `@stable`.
