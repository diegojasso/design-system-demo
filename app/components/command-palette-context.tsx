"use client"

import { createContext, useContext, useState, useCallback, useMemo } from "react"

interface CommandPaletteContextValue {
  open: () => void
  close: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
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

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  
  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ open, close, isOpen, setIsOpen }),
    [open, close, isOpen, setIsOpen]
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
    }
  }
  return context
}
