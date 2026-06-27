import { MatchingAlgorithm, MatchingEngine, OrderSide, OrderType } from '@sargonpiraev/matchx'

export function LiveExample() {
  const engine = new MatchingEngine(MatchingAlgorithm.PRICE_TIME)

  engine.match({
    id: '00000000-0000-4000-8000-000000000001',
    side: OrderSide.ASK,
    quantity: 10,
    time: 1,
    type: OrderType.LIMIT,
    price: 100,
  })

  const trades = engine.match({
    id: '00000000-0000-4000-8000-000000000002',
    side: OrderSide.BID,
    quantity: 4,
    time: 2,
    type: OrderType.LIMIT,
    price: 100,
  })

  return (
    <pre>
      <code>{JSON.stringify(trades, null, 2)}</code>
    </pre>
  )
}
