import type { QuoteListItem, QuoteFilters } from "../types"

/**
 * Filter quotes based on search query (searches name and email)
 */
export function searchQuotes(
  quotes: QuoteListItem[],
  query: string
): QuoteListItem[] {
  if (!query.trim()) {
    return quotes
  }

  const lowerQuery = query.toLowerCase().trim()

  return quotes.filter((quote) => {
    const nameMatch = quote.name.toLowerCase().includes(lowerQuery)
    const emailMatch = quote.email.toLowerCase().includes(lowerQuery)
    return nameMatch || emailMatch
  })
}

/**
 * Filter quotes based on filter criteria
 */
export function filterQuotes(
  quotes: QuoteListItem[],
  filters: QuoteFilters
): QuoteListItem[] {
  let filtered = [...quotes]

  // Filter by status
  if (filters.status !== "all") {
    filtered = filtered.filter((quote) => quote.status === filters.status)
  }

  // Filter by created date
  if (filters.createdDate !== "all") {
    const now = new Date()
    let startDate: Date

    switch (filters.createdDate) {
      case "last-7-days":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "last-30-days":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "last-90-days":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(0) // Beginning of time
    }

    filtered = filtered.filter((quote) => {
      return quote.createdDate >= startDate && quote.createdDate <= now
    })
  }

  // Filter by agency
  if (filters.agency !== "all") {
    filtered = filtered.filter((quote) => quote.agency === filters.agency)
  }

  // Filter by agent
  if (filters.agent !== "all") {
    filtered = filtered.filter((quote) => quote.agent === filters.agent)
  }

  return filtered
}

/**
 * Combine search and filters
 */
export function applySearchAndFilters(
  quotes: QuoteListItem[],
  searchQuery: string,
  filters: QuoteFilters
): QuoteListItem[] {
  // First apply search
  const searched = searchQuotes(quotes, searchQuery)
  // Then apply filters
  return filterQuotes(searched, filters)
}
