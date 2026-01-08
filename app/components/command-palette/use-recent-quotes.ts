"use client"

import { useState, useEffect, useCallback } from "react"
import type { RecentQuote, QuoteStatus } from "./quote-types"

const STORAGE_KEY = "command-palette-recent-quotes"
const MAX_RECENT_QUOTES = 10

/**
 * Hook for managing recent quotes in localStorage
 */
export function useRecentQuotes() {
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])

  // Load recent quotes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as RecentQuote[]
        // Sort by accessedAt (most recent first)
        const sorted = parsed.sort(
          (a, b) =>
            new Date(b.accessedAt).getTime() - new Date(a.accessedAt).getTime()
        )
        setRecentQuotes(sorted.slice(0, MAX_RECENT_QUOTES))
      }
    } catch (error) {
      console.error("Failed to load recent quotes:", error)
    }
  }, [])

  // Save recent quotes to localStorage
  const saveRecentQuotes = useCallback((quotes: RecentQuote[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes))
      setRecentQuotes(quotes)
    } catch (error) {
      console.error("Failed to save recent quotes:", error)
    }
  }, [])

  // Add a quote to recent quotes
  const addRecentQuote = useCallback(
    (quote: {
      id: string
      quoteNumber: string
      clientName: string
      status: QuoteStatus
    }) => {
      const newRecent: RecentQuote = {
        ...quote,
        accessedAt: new Date().toISOString(),
      }

      setRecentQuotes((prev) => {
        // Remove if already exists
        const filtered = prev.filter((q) => q.id !== quote.id)
        // Add to beginning
        const updated = [newRecent, ...filtered]
        // Keep only MAX_RECENT_QUOTES
        const limited = updated.slice(0, MAX_RECENT_QUOTES)
        saveRecentQuotes(limited)
        return limited
      })
    },
    [saveRecentQuotes]
  )

  // Clear all recent quotes
  const clearRecentQuotes = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setRecentQuotes([])
  }, [])

  return {
    recentQuotes,
    addRecentQuote,
    clearRecentQuotes,
  }
}
