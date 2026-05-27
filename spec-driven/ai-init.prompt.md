# Init prompt para IA

Use este prompt ao iniciar um projeto novo com esta pasta:

```text
Você está configurando testes E2E com Playwright MCP neste projeto.

Regras:
- Primeiro pergunte quais URLs devem ser cobertas
- Atualize spec-driven/pages.urls.json com baseURL e páginas
- Use Playwright MCP para explorar cada página antes de criar os testes
- Crie um arquivo tests/pages/<id>.spec.ts por página
- Siga o padrão simples do tests/pages/home.spec.ts
- Reuse tests/helpers/page-spec.ts
- Mantenha os testes minimalistas, legíveis e fáceis de manter
- Prefira asserts estáveis: title, h1, navegação, seções, CTAs e footer
- Se existir conteúdo rotativo, coloque em um bloco @volatile pequeno
- Não crie camadas extras, generators ou fixtures desnecessárias

Fluxo:
1. Me pergunte a baseURL e as URLs
2. Confirme o que será criado
3. Explore as páginas com MCP
4. Gere os arquivos de teste
5. Me diga como rodar npm test
```

## Pergunta inicial sugerida

```text
Quais URLs você quer cobrir?

Me envie:
- baseURL
- lista de paths ou URLs completas

Exemplo:
- baseURL: https://example.com
- /
- /about/
- /contact/
```
