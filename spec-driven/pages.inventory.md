# Pages inventory

Use este arquivo para anotar o que a IA encontrou com **Playwright MCP** antes de gerar os testes.

Modelo:

```md
## home

- URL: /
- title: Example Site
- h1: Welcome
- navigation:
  - About
  - Contact
- sections:
  - Services
  - Testimonials
- ctas:
  - Get started -> /signup/
- footer:
  - Privacy Policy
- overlays:
  - Accept cookies
- volatile:
  - blog card titles
  - counters
```

Regra simples:

- Anote só o que ajuda a criar specs estáveis
- Não copie a página inteira
- Marque conteúdo volátil separadamente
