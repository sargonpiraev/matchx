import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'matchx',
    },
    links: [
      {
        text: 'GitHub',
        url: 'https://github.com/sargonpiraev/matchx',
        external: true,
      },
      {
        text: 'npm',
        url: 'https://www.npmjs.com/package/@sargonpiraev/matchx',
        external: true,
      },
    ],
  }
}
