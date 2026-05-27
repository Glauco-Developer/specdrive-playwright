# Project scaffolding

Checklist curta para copiar este boilerplate para outro projeto:

1. Copiar a pasta de testes e `spec-driven/`
2. Rodar `npm i -D @playwright/test`
3. Rodar `npx playwright install --with-deps chromium`
4. Rodar `npx playwright install --with-deps chrome`
5. Ajustar `spec-driven/pages.urls.json`
6. Pedir para a IA criar as specs com base no prompt de `spec-driven/ai-init.prompt.md`

Arquivos principais:

- `playwright.config.ts`
- `tests/helpers/page-spec.ts`
- `tests/pages/home.spec.ts`
- `spec-driven/pages.urls.example.json`
