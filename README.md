# Pokédex + Storybook: guia de setup

Os arquivos estão na mesma estrutura do projeto. Copie as pastas `src`, `e2e`, `.storybook` e os arquivos da raiz, mesclando com o que já existe.

## Pressupostos

- Next.js (App Router), TypeScript e Tailwind v4 (`@import "tailwindcss";` em `src/app/globals.css`).
- Alias `@/*` apontando para `./src/*` no `tsconfig.json`.
- `src/app/layout.tsx` já existente. Sugestão: `<html lang="pt-BR">`.
- `.storybook/main.ts`, `.storybook/preview.ts` e `vitest.config.ts` podem já existir: mescle em vez de sobrescrever.

## Dependências extras

```bash
npm i -D msw msw-storybook-addon vitest @vitest/browser-playwright @vitest/coverage-v8 \
  @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom @playwright/test playwright @axe-core/playwright

npx msw init public/ --save
npx playwright install chromium
```

Os addons que você já tem cobrem o restante (`addon-vitest`, `addon-a11y`, `addon-docs`, `@chromatic-com/storybook`).

## Scripts do package.json

```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "test": "vitest run",
  "test:unit": "vitest run --project unit",
  "test:storybook": "vitest run --project storybook",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test --project app-desktop --project app-mobile",
  "test:visual": "playwright test --project storybook",
  "test:visual:update": "playwright test --project storybook --update-snapshots",
  "chromatic": "chromatic --exit-zero-on-changes"
}
```

## .gitignore

```
playwright-report/
test-results/
coverage/
storybook-static/
```

## Mapa dos testes

| Tipo | Arquivos |
| --- | --- |
| Unitários | `src/lib/*.test.ts`, `src/components/ui/button/button.test.tsx` |
| Snapshots (Vitest) | `button.test.tsx`, `pokemon-card.test.tsx` (gera `__snapshots__` na primeira execução) |
| Stories como testes (portable stories) | `pagination.test.tsx`, `pokemon-card.test.tsx` |
| Integração com mock de rede | `src/components/pokemon/pokedex/pokedex.test.tsx` (MSW em Node) |
| Interação | funções `play` em todas as `*.stories.tsx` |
| Acessibilidade | `a11y: { test: 'error' }` no preview, stories `A11y/*` com `test: 'todo'`, `e2e/storybook/accessibility.spec.ts` |
| Responsividade | stories `Mobile`/`Tablet`, `e2e/app/pokedex.spec.ts` (projeto mobile), `e2e/storybook/visual.spec.ts` |
| Regressão visual | Chromatic e `e2e/storybook/visual.spec.ts` (baselines com `npm run test:visual:update`) |
| E2E | `e2e/app/pokedex.spec.ts` com PokeAPI interceptada por `page.route` |
| Mock de requisições no Storybook | `src/mocks/handlers.ts` + `msw-storybook-addon` |
