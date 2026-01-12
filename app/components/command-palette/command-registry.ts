"use client"

import { useMemo } from "react"
import type { Command } from "./commands"
import { commandToHint, type CommandHint } from "./command-hints"

/**
 * Command Registry Hook
 * Provides programmatic access to available commands
 */
export function useCommandRegistry(commands: Command[]) {
  const registry = useMemo(() => {
    return {
      /**
       * Get all available commands
       */
      getAvailableCommands: (): Command[] => {
        return commands.filter((cmd) => isCommandAvailable(cmd))
      },

      /**
       * Get commands filtered by group
       */
      getCommandsByGroup: (group: string): Command[] => {
        return commands.filter(
          (cmd) => cmd.group === group && isCommandAvailable(cmd)
        )
      },

      /**
       * Get commands filtered by context requirement
       */
      getCommandsByContext: (context: string): Command[] => {
        return commands.filter(
          (cmd) => cmd.context === context && isCommandAvailable(cmd)
        )
      },

      /**
       * Get a specific command by ID
       */
      getCommandById: (id: string): Command | undefined => {
        const cmd = commands.find((c) => c.id === id)
        return cmd && isCommandAvailable(cmd) ? cmd : undefined
      },

      /**
       * Get command hints optimized for AI agents
       */
      getCommandHints: (): CommandHint[] => {
        return commands
          .filter((cmd) => isCommandAvailable(cmd))
          .map((cmd) => commandToHint(cmd, true))
      },

      /**
       * Get command hints filtered by group
       */
      getHintsByGroup: (group: string): CommandHint[] => {
        return commands
          .filter((cmd) => cmd.group === group && isCommandAvailable(cmd))
          .map((cmd) => commandToHint(cmd, true))
      },

      /**
       * Get command hints filtered by context
       */
      getHintsByContext: (context: string): CommandHint[] => {
        return commands
          .filter((cmd) => cmd.context === context && isCommandAvailable(cmd))
          .map((cmd) => commandToHint(cmd, true))
      },

      /**
       * Search commands by keyword or label
       */
      searchCommands: (query: string): Command[] => {
        const lowerQuery = query.toLowerCase()
        return commands.filter((cmd) => {
          if (!isCommandAvailable(cmd)) return false
          const labelMatch = cmd.label.toLowerCase().includes(lowerQuery)
          const keywordMatch = cmd.keywords.some((kw) =>
            kw.toLowerCase().includes(lowerQuery)
          )
          const descriptionMatch =
            cmd.description?.toLowerCase().includes(lowerQuery) ||
            cmd.agentDescription?.toLowerCase().includes(lowerQuery)
          return labelMatch || keywordMatch || descriptionMatch
        })
      },

      /**
       * Check if a command is available
       */
      isCommandAvailable: (id: string): boolean => {
        const cmd = commands.find((c) => c.id === id)
        return cmd ? isCommandAvailable(cmd) : false
      },
    }
  }, [commands])

  return registry
}

/**
 * Determines if a command is available based on its context requirements
 * This is a simplified check - in a real implementation, you'd check
 * actual context values (e.g., quote-id exists, current-step is set, etc.)
 */
function isCommandAvailable(cmd: Command): boolean {
  // For now, all commands are considered available
  // In a real implementation, you'd check context requirements here
  // e.g., if cmd.contextRequirements includes "quote-id", check if quoteId exists
  return true
}
