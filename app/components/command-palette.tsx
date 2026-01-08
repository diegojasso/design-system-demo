"use client"

import { useState, useMemo } from "react"
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
import type { StepId } from "./quote-progress"
import type { Command } from "./command-palette/commands"

interface CommandPaletteProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onSaveDraft?: () => void
  onFindClient?: () => void
}

const groupLabels: Record<string, string> = {
  "quick-actions": "Quick Actions",
  navigation: "Jump to Section",
  "quote-actions": "Reports & Actions",
  recent: "Recent Quotes",
}

export function CommandPalette({
  currentStep,
  onStepChange,
  onSaveDraft,
  onFindClient,
}: CommandPaletteProps) {
  const { isOpen, setIsOpen, commands } = useCommandPalette({
    currentStep,
    onStepChange,
    onSaveDraft,
    onFindClient,
  })

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
        .filter((cmd) => ["new-quote", "save-draft", "find-client"].includes(cmd.id))
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
    command.action()
    setIsOpen(false)
    setSearch("")
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
              return (
                <CommandItem
                  key={command.id}
                  value={`${command.id} ${command.label} ${command.keywords.join(" ")} ${command.shortcut || ""}`}
                  onSelect={() => handleSelect(command)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{command.label}</span>
                  {command.shortcut && (
                    <CommandShortcut>{command.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
