/**
 * Quote status types
 */
export type QuoteStatus = "draft" | "pending" | "sent" | "accepted" | "rejected"

/**
 * Quote interface
 */
export interface Quote {
  id: string
  quoteNumber: string
  clientName: string
  status: QuoteStatus
  createdAt: string
  updatedAt: string
}

/**
 * Recent quote entry (for localStorage)
 */
export interface RecentQuote {
  id: string
  quoteNumber: string
  clientName: string
  status: QuoteStatus
  accessedAt: string
}
