"use client"

import { useState, useEffect, useMemo } from "react"
import { buildCommands, Command } from "../command-palette/commands"
import type { StepId } from "../../contexts/quote-context"
import type { RecentQuote } from "../command-palette/quote-types"
import type {
  CommandHistoryEntry,
} from "../command-palette/use-command-history"
import type { QuoteListItem } from "../quotes-list/types"

interface UseCommandPaletteProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onFindClient?: () => void
  // Quote context
  currentQuoteId?: string
  isImported?: boolean
  isUnbindable?: boolean
  onRunReports?: () => void
  onSendQuote?: () => void
  onDownloadPDF?: () => void
  onImportEzlynx?: () => void
  // Recent quotes
  recentQuotes?: RecentQuote[]
  onOpenQuote?: (quoteId: string) => void
  // History and favorites
  history?: CommandHistoryEntry[]
  favorites?: Set<string>
  customShortcuts?: Map<string, string>
  // Theme
  onSetTheme?: (theme: "light" | "dark" | "system") => void
  currentTheme?: "light" | "dark" | "system"
  // Quotes page context
  isQuotesPage?: boolean
  availableQuotes?: QuoteListItem[]
  onStartQuote?: () => void
  onFilterStatus?: (status: string) => void
  onClearFilters?: () => void
}

interface GroupedCommand {
  group: string
  commands: Command[]
}

interface UseCommandPaletteReturn {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  commands: GroupedCommand[]
}

export function useCommandPalette({
  currentStep,
  onStepChange,
  onFindClient,
  currentQuoteId,
  isImported,
  isUnbindable,
  onRunReports,
  onSendQuote,
  onDownloadPDF,
  onImportEzlynx,
  recentQuotes,
  onOpenQuote,
  history = [],
  favorites = new Set(),
  customShortcuts = new Map(),
  onSetTheme,
  currentTheme,
  isQuotesPage,
  availableQuotes,
  onStartQuote,
  onFilterStatus,
  onClearFilters,
}: UseCommandPaletteProps): UseCommandPaletteReturn {
  const [isOpen, setIsOpen] = useState(false)

  // Build commands based on context
  const allCommands = useMemo(
    () =>
      buildCommands({
        currentStep,
        onStepChange,
        onFindClient,
        currentQuoteId,
        isImported,
        isUnbindable,
        onRunReports,
        onSendQuote,
        onDownloadPDF,
        onImportEzlynx,
        recentQuotes,
        onOpenQuote,
        history,
        favorites,
        customShortcuts,
        onSetTheme,
        currentTheme,
        isQuotesPage,
        availableQuotes,
        onStartQuote,
        onFilterStatus,
        onClearFilters,
      }),
    [
      currentStep,
      onStepChange,
      onFindClient,
      currentQuoteId,
      isImported,
      isUnbindable,
      onRunReports,
      onSendQuote,
      onDownloadPDF,
      onImportEzlynx,
      recentQuotes,
      onOpenQuote,
      history,
      favorites,
      customShortcuts,
      onSetTheme,
      currentTheme,
      isQuotesPage,
      availableQuotes,
      onStartQuote,
      onFilterStatus,
      onClearFilters,
    ]
  )

  // Group commands by category and enhance with history/favorites
  const groupedCommands = useMemo(() => {
    const groups = new Map<string, Command[]>()
    const favoriteCommands: Command[] = []
    const historyCommands: Command[] = []
    const historyMap = new Map(
      history.map((entry) => [entry.commandId, entry])
    )

    // Process all commands
    const enhancedCommands = allCommands.map((cmd) => {
      const customShortcut = customShortcuts.get(cmd.id)
      const historyEntry = historyMap.get(cmd.id)
      const isFav = favorites.has(cmd.id)

      return {
        ...cmd,
        customShortcut: customShortcut || cmd.customShortcut,
        usageCount: historyEntry?.count,
        isFavorite: isFav,
      }
    })

    // Track command IDs that are in favorites or history to avoid duplicates
    const commandsInSpecialGroups = new Set<string>()

    // Group commands
    enhancedCommands.forEach((cmd) => {
      // Add to favorites if favorite
      if (cmd.isFavorite) {
        favoriteCommands.push(cmd)
        commandsInSpecialGroups.add(cmd.id)
      }

      // Add to history group if recently used
      if (cmd.usageCount && cmd.usageCount > 0) {
        historyCommands.push(cmd)
        commandsInSpecialGroups.add(cmd.id)
      }

      // Add to regular groups only if not already in favorites or history
      if (!commandsInSpecialGroups.has(cmd.id)) {
        if (!groups.has(cmd.group)) {
          groups.set(cmd.group, [])
        }
        groups.get(cmd.group)!.push(cmd)
      }
    })

    // Sort history commands by most recent
    historyCommands.sort((a, b) => {
      const aEntry = historyMap.get(a.id)
      const bEntry = historyMap.get(b.id)
      if (!aEntry || !bEntry) return 0
      return (
        new Date(bEntry.executedAt).getTime() -
        new Date(aEntry.executedAt).getTime()
      )
    })

    // Sort favorites by usage count
    favoriteCommands.sort((a, b) => {
      const aCount = a.usageCount || 0
      const bCount = b.usageCount || 0
      return bCount - aCount
    })

    // Add favorites and history groups at the beginning
    const result: Array<{ group: string; commands: Command[] }> = []

    if (favoriteCommands.length > 0) {
      result.push({ group: "favorites", commands: favoriteCommands })
    }

    if (historyCommands.length > 0) {
      result.push({
        group: "history",
        commands: historyCommands.slice(0, 5), // Show top 5 recently used
      })
    }

    // Add other groups
    groups.forEach((commands, group) => {
      // Skip groups that are already added
      if (group !== "favorites" && group !== "history") {
        result.push({ group, commands })
      }
    })

    return result
  }, [allCommands, history, favorites, customShortcuts])

  // Handle ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      // Prevent default browser shortcuts when palette is open
      if (isOpen) {
        // Note: ⌘S is no longer intercepted since auto-save handles saving
        // Prevent ⌘F from triggering browser find
        if ((e.metaKey || e.ctrlKey) && e.key === "f") {
          e.preventDefault()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Commands are already grouped in groupedCommands
  const commands = groupedCommands

  return {
    isOpen,
    setIsOpen,
    commands,
  }
}
