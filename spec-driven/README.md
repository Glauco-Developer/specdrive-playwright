# Spec-driven

Pasta mínima para a IA trabalhar com **Playwright MCP** sem inventar estrutura extra.

## Ordem de trabalho

1. Perguntar quais URLs devem entrar
2. Atualizar `pages.urls.json`
3. Explorar cada URL com MCP
4. Criar ou atualizar `tests/pages/*.spec.ts`

## Arquivos

- [ai-init.prompt.md](/home/glauco/.local/share/me/mcp-aula/spec-driven/ai-init.prompt.md): prompt inicial recomendado
- [pages.urls.json](/home/glauco/.local/share/me/mcp-aula/spec-driven/pages.urls.json): URLs reais do projeto
- [pages.urls.example.json](/home/glauco/.local/share/me/mcp-aula/spec-driven/pages.urls.example.json): modelo para reaproveitar
- [pages.inventory.md](/home/glauco/.local/share/me/mcp-aula/spec-driven/pages.inventory.md): anotações da exploração MCP

## Regra principal

A IA deve sempre perguntar as URLs antes de gerar testes.
