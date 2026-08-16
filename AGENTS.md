# matchx

In-memory order matching engine (CLOB) for financial markets, published as npm `@sargonpiraev/matchx`. Limit + market orders; Price-Time and Pro-Rata algorithms.

Turborepo: library in `packages/matchx`; Fumadocs docs in `apps/docapp` (not part of the published product surface).

## Workspaces

| Path | npm name | Role |
| --- | --- | --- |
| `packages/matchx` | `@sargonpiraev/matchx` | published matching engine |
| `apps/docapp` | `@matchx/docapp` | Fumadocs + MDX docs site |

## Commands

```bash
npm install
npm run build                 # turbo: packages + apps
npm run dev                   # docs on :3001
npm run test:unit             # Jest in packages/matchx
npm run test:type             # tsc across workspaces
npm run test:codestyles       # Prettier check
npm run test:alint            # FS structure / presence
```

Playwright lanes for docapp: `test:functional`, `test:seo`, `test:analytics`, `test:spec`, `test:visual`, `test:cwv`.

## Stack

- TypeScript, Jest (`packages/matchx`)
- Next.js + Fumadocs + MDX (`apps/docapp`)
- Lefthook (shared remotes), Conventional Commits, semantic-release → GitHub / npm

## Conventions

- Prefer changes in `packages/matchx` for engine behavior; keep docs/examples in sync.
- Before engine changes: `npm run test:unit`.
- Commits: Conventional Commits (`feat:`, `fix:`, …).
