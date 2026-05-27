# Spec-driven Playwright

Reuse these files to instruct an AI agent to set up Playwright and generate page tests.

| File | Purpose |
|------|---------|
| [playwright-setup.prompt.md](./playwright-setup.prompt.md) | Full workflow: **ask URLs → setup → MCP explore → generate tests** |
| [pages.urls.json](./pages.urls.json) | Active URL list for this project |
| [pages.urls.example.json](./pages.urls.example.json) | Template to copy for new projects |
| [pages.inventory.md](./pages.inventory.md) | Element map from browser/MCP exploration |
| [stability-guidelines.md](./stability-guidelines.md) | What to assert vs what will change on the site |
| `tests/fixtures/site-contract.ts` | Single file to edit when nav/IA/copy changes on purpose |

## Quick prompts

**Setup only**

> Follow `spec-driven/playwright-setup.prompt.md` Phase 1 and `project-scaffolding.md`.

**Add tests for new pages**

> Read `spec-driven/playwright-setup.prompt.md`. Ask me which URLs to add, update `pages.urls.json`, explore with Playwright MCP, then generate `tests/pages/<id>.spec.ts`.

**Full flow**

> Run `/playwright:setup` using `spec-driven/playwright-setup.prompt.md` — ask which URLs first, then implement.
