import type { QuoteStatus } from "@/pages/components/command-palette/quote-types"

/**
 * Quote list item interface
 */
export interface QuoteListItem {
  id: string
  quoteNumber: string
  name: string // Client name (firstName + lastName)
  email: string
  status: QuoteStatus
  createdDate: Date
  agency: string
  agent: string
}

/**
 * Filter options for quote list
 */
export interface QuoteFilters {
  status: QuoteStatus | "all"
  createdDate: "all" | "last-7-days" | "last-30-days" | "last-90-days"
  agency: string | "all"
  agent: string | "all"
}

/**
 * Pagination state
 */
export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

/**
 * Agency list (real agencies and quote aggregators)
 */
export const AGENCIES = [
  "The Zebra",
  "ezlynx",
  "EverQuote",
  "Savvy",
  "Novo",
  "Policygenius",
  "Insurify",
  "Compare.com",
  "The General",
  "Progressive",
] as const

export type Agency = typeof AGENCIES[number]
