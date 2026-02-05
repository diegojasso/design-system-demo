"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY_HISTORY = "command-palette-history"
const STORAGE_KEY_FAVORITES = "command-palette-favorites"
const STORAGE_KEY_CUSTOM_SHORTCUTS = "command-palette-custom-shortcuts"
const MAX_HISTORY = 20

export interface CommandHistoryEntry {
  commandId: string
  executedAt: string
  count: number
}

export interface FavoriteCommand {
  commandId: string
  favoritedAt: string
}

export interface CustomShortcut {
  commandId: string
  shortcut: string
}

/**
 * Hook for managing command history, favorites, and custom shortcuts
 */
export function useCommandHistory() {
  const [history, setHistory] = useState<CommandHistoryEntry[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [customShortcuts, setCustomShortcuts] = useState<
    Map<string, string>
  >(new Map())

  // Load from localStorage on mount
  useEffect(() => {
    try {
      // Load history
      const storedHistory = localStorage.getItem(STORAGE_KEY_HISTORY)
      if (storedHistory) {
        const parsed = JSON.parse(storedHistory) as CommandHistoryEntry[]
        setHistory(parsed.slice(0, MAX_HISTORY))
      }

      // Load favorites
      const storedFavorites = localStorage.getItem(STORAGE_KEY_FAVORITES)
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites) as FavoriteCommand[]
        setFavorites(new Set(parsed.map((f) => f.commandId)))
      }

      // Load custom shortcuts
      const storedShortcuts = localStorage.getItem(STORAGE_KEY_CUSTOM_SHORTCUTS)
      if (storedShortcuts) {
        const parsed = JSON.parse(storedShortcuts) as CustomShortcut[]
        setCustomShortcuts(
          new Map(parsed.map((s) => [s.commandId, s.shortcut]))
        )
      }
    } catch (error) {
      console.error("Failed to load command preferences:", error)
    }
  }, [])

  // Track command execution
  const trackCommand = useCallback((commandId: string) => {
    setHistory((prev) => {
      const existing = prev.find((entry) => entry.commandId === commandId)
      let updated: CommandHistoryEntry[]

      if (existing) {
        // Update existing entry
        updated = prev.map((entry) =>
          entry.commandId === commandId
            ? {
                ...entry,
                count: entry.count + 1,
                executedAt: new Date().toISOString(),
              }
            : entry
        )
        // Move to top
        updated = [
          updated.find((e) => e.commandId === commandId)!,
          ...updated.filter((e) => e.commandId !== commandId),
        ]
      } else {
        // Add new entry
        updated = [
          {
            commandId,
            executedAt: new Date().toISOString(),
            count: 1,
          },
          ...prev,
        ]
      }

      // Keep only MAX_HISTORY entries
      const limited = updated.slice(0, MAX_HISTORY)

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(limited))
      } catch (error) {
        console.error("Failed to save command history:", error)
      }

      return limited
    })
  }, [])

  // Toggle favorite
  const toggleFavorite = useCallback((commandId: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev)
      if (updated.has(commandId)) {
        updated.delete(commandId)
      } else {
        updated.add(commandId)
      }

      // Save to localStorage
      try {
        const favoritesArray: FavoriteCommand[] = Array.from(updated).map(
          (id) => ({
            commandId: id,
            favoritedAt: new Date().toISOString(),
          })
        )
        localStorage.setItem(
          STORAGE_KEY_FAVORITES,
          JSON.stringify(favoritesArray)
        )
      } catch (error) {
        console.error("Failed to save favorites:", error)
      }

      return updated
    })
  }, [])

  // Set custom shortcut
  const setCustomShortcut = useCallback(
    (commandId: string, shortcut: string | null) => {
      setCustomShortcuts((prev) => {
        const updated = new Map(prev)
        if (shortcut === null) {
          updated.delete(commandId)
        } else {
          updated.set(commandId, shortcut)
        }

        // Save to localStorage
        try {
          const shortcutsArray: CustomShortcut[] = Array.from(
            updated.entries()
          ).map(([id, shortcut]) => ({
            commandId: id,
            shortcut,
          }))
          localStorage.setItem(
            STORAGE_KEY_CUSTOM_SHORTCUTS,
            JSON.stringify(shortcutsArray)
          )
        } catch (error) {
          console.error("Failed to save custom shortcuts:", error)
        }

        return updated
      })
    },
    []
  )

  // Get command usage count
  const getUsageCount = useCallback(
    (commandId: string) => {
      const entry = history.find((e) => e.commandId === commandId)
      return entry?.count || 0
    },
    [history]
  )

  // Get most used commands
  const getMostUsed = useCallback(
    (limit: number = 5) => {
      return [...history]
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map((e) => e.commandId)
    },
    [history]
  )

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY_HISTORY)
  }, [])

  return {
    history,
    favorites,
    customShortcuts,
    trackCommand,
    toggleFavorite,
    setCustomShortcut,
    getUsageCount,
    getMostUsed,
    clearHistory,
    isFavorite: (commandId: string) => favorites.has(commandId),
  }
}
