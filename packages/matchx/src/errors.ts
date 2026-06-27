/**
 * Thrown when order fields fail validation.
 */
export class OrderValidationError extends Error {
  constructor(message: string) {
    super(`Order validation failed: ${message}`)
    this.name = 'OrderValidationError'
  }
}

/**
 * Thrown when matching is attempted while trading is disabled.
 */
export class TradingDisabledError extends Error {
  constructor() {
    super('Trading is currently disabled')
    this.name = 'TradingDisabledError'
  }
}
