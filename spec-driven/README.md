# Spec-driven

Minimal files for AI-assisted Playwright MCP test creation.

## Expected order

1. Ask which URLs should be covered
2. Update `pages.urls.json`
3. Explore each page with Playwright MCP
4. Create or update `tests/pages/*.spec.ts`

## Files

- [ai-init.prompt.md](/home/glauco/.local/share/me/mcp-aula/spec-driven/ai-init.prompt.md): recommended startup prompt
- [pages.urls.json](/home/glauco/.local/share/me/mcp-aula/spec-driven/pages.urls.json): active project URLs
- [pages.urls.example.json](/home/glauco/.local/share/me/mcp-aula/spec-driven/pages.urls.example.json): reusable example
- [pages.inventory.md](/home/glauco/.local/share/me/mcp-aula/spec-driven/pages.inventory.md): MCP exploration notes

## Main rule

The AI should always ask for the target URLs before generating tests.
