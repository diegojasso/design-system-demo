"use client"

import { useCommandPaletteContext } from "../command-palette-context"
import type { Command } from "../command-palette/commands"
import type { CommandHint } from "../command-palette/command-hints"

/**
 * Hook for AI agents to discover and interact with available commands
 * Provides a simplified API optimized for programmatic access
 */
export function useCommandPaletteAgent() {
  const context = useCommandPaletteContext()

  return {
    /**
     * Get all available commands
     */
    commands: context.availableCommands,

    /**
     * Get command hints optimized for AI agents
     */
    hints: context.getCommandHints(),

    /**
     * Execute a command by ID
     */
    execute: (id: string) => {
      const command = context.getCommandById(id)
      if (command) {
        command.action()
      } else {
        console.warn(`Command not found: ${id}`)
      }
    },

    /**
     * Search commands by query
     */
    search: (query: string): Command[] => {
      if (!context.registry) return []
      return context.registry.searchCommands(query)
    },

    /**
     * Get commands filtered by group
     */
    getByGroup: (group: string): Command[] => {
      return context.getCommandsByGroup(group)
    },

    /**
     * Get commands filtered by context
     */
    getByContext: (contextType: string): Command[] => {
      if (!context.registry) return []
      return context.registry.getCommandsByContext(contextType)
    },

    /**
     * Get a specific command by ID
     */
    getById: (id: string): Command | undefined => {
      return context.getCommandById(id)
    },

    /**
     * Check if a command is available
     */
    isAvailable: (id: string): boolean => {
      if (!context.registry) return false
      return context.registry.isCommandAvailable(id)
    },

    /**
     * Get command hints filtered by group
     */
    getHintsByGroup: (group: string): CommandHint[] => {
      if (!context.registry) return []
      return context.registry.getHintsByGroup(group)
    },

    /**
     * Get command hints filtered by context
     */
    getHintsByContext: (contextType: string): CommandHint[] => {
      if (!context.registry) return []
      return context.registry.getHintsByContext(contextType)
    },

    /**
     * Open the command palette UI
     */
    openPalette: () => {
      context.open()
    },

    /**
     * Close the command palette UI
     */
    closePalette: () => {
      context.close()
    },

    /**
     * Check if command palette is open
     */
    isOpen: context.isOpen,
  }
}
