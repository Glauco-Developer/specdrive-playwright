# Playwright MCP Boilerplate

Boilerplate minimalista para testes E2E com `@playwright/test` e exploração guiada por **Playwright MCP**.

Use este projeto como pasta-base para qualquer site/tema. A IA deve:

1. Perguntar quais URLs você quer cobrir
2. Atualizar `spec-driven/pages.urls.json`
3. Explorar cada página com MCP
4. Criar `tests/pages/*.spec.ts` seguindo o exemplo existente

## Estrutura

```text
tests/
  helpers/
    page-spec.ts           # helper genérico para suites simples
  pages/
    home.spec.ts           # exemplo real e template de referência
spec-driven/
  README.md                # fluxo curto para IA
  ai-init.prompt.md        # prompt inicial recomendado
  pages.urls.json          # baseURL + lista de páginas
  pages.urls.example.json  # exemplo para novos projetos
docs/
  PLAYWRIGHT_MCP.md        # como ativar MCP no Cursor
playwright.config.ts       # lê baseURL do pages.urls.json
```

## Instalação

```bash
npm ci
npx playwright install --with-deps chromium
npx playwright install --with-deps chrome
```

- `chromium`: usado pelos testes locais e CI
- `chrome`: usado pelo MCP do Playwright no Cursor

## Como usar

1. Ajuste `spec-driven/pages.urls.json`
2. Gere ou edite `tests/pages/*.spec.ts`
3. Rode:

```bash
npm test
```

Comandos úteis:

- `npm run test:stable`
- `npm run test:ui`
- `npm run test:headed`
- `npm run report`

## Exemplo de pedido para a IA

Use o prompt de [spec-driven/ai-init.prompt.md](/home/glauco/.local/share/me/mcp-aula/spec-driven/ai-init.prompt.md).

Versão curta:

```text
Quero configurar testes com Playwright MCP neste projeto.
Primeiro me pergunte quais URLs devo cobrir.
Depois atualize spec-driven/pages.urls.json, explore as páginas com MCP
e crie um arquivo tests/pages/<id>.spec.ts para cada URL, seguindo o
exemplo existente e mantendo tudo simples.
```

## Como a IA deve criar specs

- Um arquivo por página em `tests/pages/`
- Reusar `tests/helpers/page-spec.ts` para os checks estáveis
- Adicionar `@volatile` só quando houver conteúdo rotativo
- Preferir `getByRole`, `getByText` e asserts simples
- Não criar abstrações extras sem necessidade

## Próximo passo

Para adicionar páginas novas, me diga:

- `baseURL`
- lista de paths, por exemplo `/`, `/contato/`, `/blog/`
