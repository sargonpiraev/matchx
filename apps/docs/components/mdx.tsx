import defaultMdxComponents from 'fumadocs-ui/mdx'
import {
  LimitOrderTable,
  MarketOrderTable,
  MatchingEngineTable,
  OrderValidationErrorTable,
  TradeTable,
  TradingDisabledErrorTable,
} from '@/components/api-reference'
import { LiveExample } from '@/components/live-example'
import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    LiveExample,
    MatchingEngineTable,
    TradeTable,
    LimitOrderTable,
    MarketOrderTable,
    OrderValidationErrorTable,
    TradingDisabledErrorTable,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
