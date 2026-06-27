/**
 * Side of an order in the book.
 */
export enum OrderSide {
  ASK, // sell
  BID, // buy
}

/**
 * Supported order types.
 */
export enum OrderType {
  LIMIT,
  MARKET,
  // STOP_LIMIT,
  // ICEBERG,
}

export type BaseOrder = {
  id: string
  side: OrderSide
  quantity: number
  time: number
}

export type MarketOrder = BaseOrder & {
  type: OrderType.MARKET
  price?: never
}

export type LimitOrder = BaseOrder & {
  type: OrderType.LIMIT
  price: number
}

export type Order = LimitOrder | MarketOrder

/**
 * Executed trade between a bid and an ask.
 */
export type Trade = {
  askOrderId: string
  bidOrderId: string
  price: number
  quantity: number
}

/**
 * Matching priority algorithm for the order book.
 */
export enum MatchingAlgorithm {
  PRICE_TIME,
  PRO_RATA,
}
