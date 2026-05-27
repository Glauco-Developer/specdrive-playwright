# Stability Guidelines

Prefer assertions that survive normal site updates.

## Good for `@stable`

- page title
- `h1`
- primary navigation links
- section headings
- main CTAs
- basic footer items

## Avoid hard-coded `@stable` checks for

- post titles
- dates
- animated numbers
- campaign banners
- seasonal promotional text

## When to use `@volatile`

Use a small `@volatile` block when a page has content that changes often but still deserves a light structural check.
