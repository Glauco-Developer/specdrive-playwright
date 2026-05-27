# Playwright MCP

Este boilerplate foi pensado para ser usado com **MCP do Playwright no Cursor**.

## Instalação

```bash
npm ci
npx playwright install --with-deps chromium
npx playwright install --with-deps chrome
```

## Importante

- `chromium` é para `npm test`
- `chrome` é para o MCP
- instalar só `chromium` não resolve o MCP

Depois da instalação do `chrome`, reinicie o Cursor.

## Como validar

Peça no chat:

```text
Use o Playwright MCP para abrir https://example.com e fazer um snapshot.
```

Se estiver funcionando, a IA consegue navegar e inspecionar a página antes de criar os testes.

## Fluxo esperado neste boilerplate

1. Você informa as URLs
2. A IA atualiza `spec-driven/pages.urls.json`
3. A IA explora as páginas com MCP
4. A IA cria `tests/pages/*.spec.ts`

## Erro comum

Se aparecer algo como `chrome is not found`, rode:

```bash
npx playwright install --with-deps chrome
```
