"use client"

import { createContext, useContext, useState, useCallback, useMemo, useRef } from "react"
import type { Command } from "./command-palette/commands"
import type { CommandHint } from "./command-palette/command-hints"
import { useCommandRegistry } from "./command-palette/command-registry"

interface CommandRegistry {
  getAvailableCommands: () => Command[]
  getCommandsByGroup: (group: string) => Command[]
  getCommandsByContext: (context: string) => Command[]
  getCommandById: (id: string) => Command | undefined
  getCommandHints: () => CommandHint[]
  getHintsByGroup: (group: string) => CommandHint[]
  getHintsByContext: (context: string) => CommandHint[]
  searchCommands: (query: string) => Command[]
  isCommandAvailable: (id: string) => boolean
}

interface CommandPaletteContextValue {
  open: () => void
  close: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  // Registry methods (available when CommandPalette is mounted)
  availableCommands: Command[]
  getCommandHints: () => CommandHint[]
  getCommandsByGroup: (group: string) => Command[]
  getCommandById: (id: string) => Command | undefined
  registry: CommandRegistry | null
  // Internal method for CommandPalette to register itself
  _registerRegistry?: (registry: CommandRegistry) => void
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null
)

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const registryRef = useRef<CommandRegistry | null>(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  
  // Register registry (called by CommandPalette when it mounts)
  const registerRegistry = useCallback((registry: CommandRegistry) => {
    registryRef.current = registry
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      open,
      close,
      isOpen,
      setIsOpen,
      availableCommands: registryRef.current?.getAvailableCommands() || [],
      getCommandHints: () => registryRef.current?.getCommandHints() || [],
      getCommandsByGroup: (group: string) =>
        registryRef.current?.getCommandsByGroup(group) || [],
      getCommandById: (id: string) => registryRef.current?.getCommandById(id),
      registry: registryRef.current,
      // Internal method for CommandPalette to register itself
      _registerRegistry: registerRegistry,
    }),
    [open, close, isOpen, setIsOpen, registerRegistry]
  )

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  )
}

export function useCommandPaletteContext() {
  const context = useContext(CommandPaletteContext)
  if (!context) {
    // Return a no-op implementation if context is not available
    // This allows the hint to work even without the provider
    return {
      open: () => {},
      close: () => {},
      isOpen: false,
      setIsOpen: () => {},
      availableCommands: [],
      getCommandHints: () => [],
      getCommandsByGroup: () => [],
      getCommandById: () => undefined,
      registry: null,
      _registerRegistry: () => {},
    }
  }
  return context
}
