# matchx

Turborepo monorepo for **matchx** — an in-memory order matching engine for financial markets.

## Packages

| Path | npm | Description |
|------|-----|-------------|
| [`packages/matchx`](packages/matchx) | [`@sargonpiraev/matchx`](https://www.npmjs.com/package/@sargonpiraev/matchx) | Core matching engine library |
| [`apps/docs`](apps/docs) | — | Fumadocs documentation site (MDX + auto API from source) |

## Quick start

```bash
npm install
npm run build
npm run test:unit
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build all packages and apps |
| `npm run dev` | Docs site on http://localhost:3001 (Fumadocs + MDX) |
| `npm run test:unit` | Run unit tests |
| `npm run test:type` | Typecheck all workspaces |
| `npm run test:codestyles` | Prettier check |

## Install the library

```bash
npm install @sargonpiraev/matchx
```

See [`packages/matchx/README.md`](packages/matchx/README.md) for API docs and examples.
