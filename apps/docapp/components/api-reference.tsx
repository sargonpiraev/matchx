import { AutoTypeTable } from 'fumadocs-typescript/ui'
import { packageSrc, typeGenerator } from '@/lib/type-generator'

export function MatchingEngineTable() {
  return (
    <AutoTypeTable
      path={packageSrc('MatchingEngine.ts')}
      name="MatchingEngine"
      generator={typeGenerator}
    />
  )
}

export function TradeTable() {
  return (
    <AutoTypeTable path={packageSrc('types.ts')} name="Trade" generator={typeGenerator} />
  )
}

export function LimitOrderTable() {
  return (
    <AutoTypeTable
      path={packageSrc('types.ts')}
      name="LimitOrder"
      generator={typeGenerator}
    />
  )
}

export function MarketOrderTable() {
  return (
    <AutoTypeTable
      path={packageSrc('types.ts')}
      name="MarketOrder"
      generator={typeGenerator}
    />
  )
}

export function OrderValidationErrorTable() {
  return (
    <AutoTypeTable
      path={packageSrc('errors.ts')}
      name="OrderValidationError"
      generator={typeGenerator}
    />
  )
}

export function TradingDisabledErrorTable() {
  return (
    <AutoTypeTable
      path={packageSrc('errors.ts')}
      name="TradingDisabledError"
      generator={typeGenerator}
    />
  )
}
