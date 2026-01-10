"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command"
import { useCommandPalette } from "./hooks/use-command-palette"
import { commandFilter } from "./command-palette/fuzzy-search"
import { useRecentQuotes } from "./command-palette/use-recent-quotes"
import { useCommandHistory } from "./command-palette/use-command-history"
import { useCommandPaletteContext } from "./command-palette-context"
import { useTheme } from "@/hooks/use-theme"
import type { StepId } from "../contexts/quote-context"
import type { Command } from "./command-palette/commands"
import type { RecentQuote } from "./command-palette/quote-types"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface CommandPaletteProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onFindClient?: () => void
  // Quote context
  currentQuoteId?: string
  onRunReports?: () => void
  onSendQuote?: () => void
  onDownloadPDF?: () => void
  onImportEzlynx?: () => void
  onOpenQuote?: (quoteId: string) => void
}

const groupLabels: Record<string, string> = {
  favorites: "Favorites",
  history: "Recently Used",
  "quick-actions": "Quick Actions",
  navigation: "Jump to Section",
  "quote-actions": "Reports & Actions",
  recent: "Recent Quotes",
  settings: "Settings",
}

export function CommandPalette({
  currentStep,
  onStepChange,
  onFindClient,
  currentQuoteId,
  onRunReports,
  onSendQuote,
  onDownloadPDF,
  onImportEzlynx,
  onOpenQuote,
}: CommandPaletteProps) {
  // Get recent quotes
  const { recentQuotes, addRecentQuote } = useRecentQuotes()

  // Get command history and favorites
  const {
    history,
    favorites,
    customShortcuts,
    trackCommand,
    toggleFavorite,
    getUsageCount,
    getMostUsed,
    isFavorite,
  } = useCommandHistory()

  // Get theme functions
  const { setTheme, theme } = useTheme()

  // Wrap onOpenQuote to track recent quotes
  const handleOpenQuoteWithTracking = (quoteId: string) => {
    // Add to recent quotes (with mock data for demo)
    // In a real app, you'd fetch quote data first
    addRecentQuote({
      id: quoteId,
      quoteNumber: `Q-${quoteId.slice(-6)}`,
      clientName: `Client ${quoteId.slice(-3)}`,
      status: "draft",
    })
    onOpenQuote?.(quoteId)
  }

  const context = useCommandPaletteContext()
  const { isOpen: hookIsOpen, setIsOpen: setHookIsOpen, commands } = useCommandPalette({
    currentStep,
    onStepChange,
    onFindClient,
    currentQuoteId,
    onRunReports,
    onSendQuote,
    onDownloadPDF,
    onImportEzlynx,
    recentQuotes,
    onOpenQuote: handleOpenQuoteWithTracking,
    history,
    favorites,
    customShortcuts,
    onSetTheme: setTheme,
    currentTheme: theme as "light" | "dark" | "system" | undefined,
  })

  // Use hook state as source of truth
  const isOpen = hookIsOpen
  
  // Sync context to hook when opened from hint button (one-way: context -> hook)
  useEffect(() => {
    if (context.isOpen && !hookIsOpen) {
      setHookIsOpen(true)
    }
  }, [context.isOpen, hookIsOpen, setHookIsOpen])

  // Unified setIsOpen that updates both states
  const setIsOpen = useCallback((open: boolean) => {
    setHookIsOpen(open)
    context.setIsOpen(open)
  }, [context.setIsOpen])

  const [search, setSearch] = useState("")

  // Get all available commands for suggestions
  const allCommands = useMemo(() => {
    return commands.flatMap(({ commands: groupCommands }) => groupCommands)
  }, [commands])

  // Get popular/suggested commands for empty state
  const suggestedCommands = useMemo(() => {
    if (!search) {
      // When no search, suggest common commands
      return allCommands
        .filter((cmd) => ["new-quote", "find-client"].includes(cmd.id))
        .slice(0, 3)
    }

    // When there's a search but no results, suggest similar commands
    const lowerSearch = search.toLowerCase()
    return allCommands
      .filter((cmd) => {
        const label = cmd.label.toLowerCase()
        const keywords = cmd.keywords.join(" ").toLowerCase()
        return (
          label.includes(lowerSearch[0]) ||
          keywords.includes(lowerSearch[0]) ||
          cmd.label.toLowerCase().startsWith(lowerSearch[0])
        )
      })
      .slice(0, 3)
  }, [search, allCommands])

  const handleSelect = (command: Command) => {
    // Track command execution
    trackCommand(command.id)
    command.action()
    setIsOpen(false)
    setSearch("")
  }

  // Handle right-click or long-press to favorite (for future enhancement)
  const handleFavoriteToggle = (
    e: React.MouseEvent,
    command: Command
  ) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(command.id)
  }

  // Reset search when dialog closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setSearch("")
    }
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={handleOpenChange} filter={commandFilter}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-medium text-foreground">
                No results found
                {search && (
                  <span className="text-muted-foreground"> for "{search}"</span>
                )}
              </p>
              {search && suggestedCommands.length > 0 && (
                <div className="mt-3 flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">
                    Did you mean:
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {suggestedCommands.map((cmd) => {
                      const Icon = cmd.icon
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => handleSelect(cmd)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                        >
                          <Icon className="h-3 w-3" />
                          {cmd.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              {!search && (
                <p className="text-xs text-muted-foreground mt-1">
                  Try searching for actions, navigation, or use shortcuts
                </p>
              )}
            </div>
          </div>
        </CommandEmpty>
        {commands.map(({ group, commands: groupCommands }) => (
          <CommandGroup key={group} heading={groupLabels[group] || group}>
            {groupCommands.map((command: Command) => {
              const Icon = command.icon
              const statusColors: Record<string, string> = {
                draft: "bg-muted text-muted-foreground",
                pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
                sent: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
                accepted: "bg-green-500/10 text-green-600 dark:text-green-500",
                rejected: "bg-red-500/10 text-red-600 dark:text-red-500",
              }
              const favorite = isFavorite(command.id)
              const displayShortcut = command.customShortcut || command.shortcut
              const isActiveTheme = command.meta === "Active"
              return (
                <CommandItem
                  key={command.id}
                  value={`${command.id} ${command.label} ${command.keywords.join(" ")} ${displayShortcut || ""} ${command.meta || ""}`}
                  onSelect={() => handleSelect(command)}
                  className="group/item"
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex flex-1 items-center gap-2">
                    <span>{command.label}</span>
                    {command.meta && !isActiveTheme && (
                      <span className="text-xs text-muted-foreground">
                        {command.meta}
                      </span>
                    )}
                    {isActiveTheme && (
                      <Badge
                        variant="outline"
                        className="h-5 text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        Active
                      </Badge>
                    )}
                    {command.status && (
                      <Badge
                        variant="outline"
                        className={`h-5 text-xs ${statusColors[command.status] || ""}`}
                      >
                        {command.status}
                      </Badge>
                    )}
                    {command.usageCount !== undefined && command.usageCount > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ({command.usageCount}x)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {favorite && (
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    )}
                    {displayShortcut && (
                      <CommandShortcut>{displayShortcut}</CommandShortcut>
                    )}
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
