# Playwright E2E — The Wheel

Testes end-to-end com [@playwright/test](https://playwright.dev/) contra o site de staging, com suíte **estável** para CI e geração spec-driven documentada em [`spec-driven/`](./spec-driven/).

## Pré-requisitos

- **Node.js 20+**
- Linux/WSL: dependências do Chromium (`npx playwright install --with-deps chromium`) — pede `sudo` uma vez

## Instalação (primeira vez)

```bash
npm ci
npx playwright install --with-deps chromium   # ou: npx playwright install chromium
```

## Comandos

| Comando | Uso |
|---------|-----|
| `npm test` | Todos os testes (`@stable` + `@volatile`) |
| `npm run test:stable` | Só testes estáveis (recomendado no dia a dia) |
| `npm run test:ci` | **O mesmo que o GitHub Actions executa** |
| `npm run test:ui` | Interface visual para depurar |
| `npm run test:headed` | Browser visível |
| `npm run test:debug` | Passo a passo com inspector |
| `npm run report` | Abre o relatório HTML da última execução |

## Ver resultados no navegador (local)

```bash
npm test
npm run report
```

O relatório fica em `playwright-report/` (não commitar).

## GitHub Actions (CI)

Workflow: [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml)

| Quando roda | Push/PR em `main` ou `master`, ou manualmente em **Actions → Playwright E2E → Run workflow** |
| O que executa | `npm run test:ci` (Chromium, suíte `@stable`, 2 retries) |
| Se falhar | Anotações na PR + artifacts **playwright-report** e **test-results** |

### Ver relatório após o CI

1. **Actions** → execução → **Artifacts**
2. Baixe `playwright-report.zip` e extraia
3. No projeto (ou na pasta extraída):

```bash
npx playwright show-report caminho/para/playwright-report
```

Se o relatório não mostrar imagens, baixe também o artifact **test-results** (screenshots ficam nessa pasta).

## O que você realmente precisa (e o que é opcional)

| Recurso | Necessário? | O que é |
|---------|-------------|---------|
| **Relatório HTML** (`npm run report`) | **Sim** | Lista de testes, erros, qual passo falhou. É o principal. |
| **Screenshot** em falha | Recomendado | Foto da página no momento do erro (já ligado). |
| **Trace** (`.zip`) | Não (por padrão) | “DVR” da execução: cada clique, DOM, rede. Útil para bugs difíceis; mais pesado e confuso no início. |
| **Vídeo** | Não | Gravação em vídeo da janela — desligado no projeto. |

**No CI:** basta o artifact **playwright-report**. O **test-results** só ajuda se quiser ver screenshots fora do HTML.

Para ligar trace só quando precisar depurar, em `playwright.config.ts` mude `trace: 'off'` para `trace: 'on-first-retry'` e rode `npx playwright show-trace caminho/trace.zip`.

## Estrutura do projeto

```
tests/
  fixtures/
    page-helpers.ts      # navegação, dismiss de banners
    site-contract.ts     # textos/URLs estáveis — edite quando o site mudar de propósito
  pages/
    home.spec.ts         # homepage (@stable / @volatile)
spec-driven/             # prompts e inventário para gerar novos testes com IA
.github/workflows/       # CI
playwright.config.ts
```

## Site mudou — o que atualizar?

| Tipo de mudança | Arquivo |
|-------------------|---------|
| Menu, títulos de seção, CTAs | `tests/fixtures/site-contract.ts` |
| Nova página | `spec-driven/pages.urls.json` + novo `tests/pages/*.spec.ts` |
| Redesign grande | Re-explorar com browser MCP → `spec-driven/pages.inventory.md` |

Detalhes: [`spec-driven/stability-guidelines.md`](./spec-driven/stability-guidelines.md).

## Boas práticas usadas aqui

- **Locators por acessibilidade** (`getByRole`, `getByText`)
- **Contrato centralizado** (`site-contract.ts`) em vez de strings espalhadas
- **Tags `@stable` / `@volatile`** — CI só bloqueia em estável
- **Retries** no CI + **screenshot** só em falha (sem trace/vídeo por padrão)
- **Reporter `github`** — resumo visível na aba Checks da PR
- **Artifacts** — relatório HTML para auditoria pós-falha

## Documentação spec-driven / IA

- Setup completo: [`spec-driven/playwright-setup.prompt.md`](./spec-driven/playwright-setup.prompt.md)
- Scaffolding inicial: [`project-scaffolding.md`](./project-scaffolding.md)
# specdrive-playwright
