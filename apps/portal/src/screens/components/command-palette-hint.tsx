"use client"

import { Search } from "lucide-react"
import { Button } from "@novo/ui"
import { Kbd, KbdGroup } from "@novo/ui"
import { cn } from "@/shared/utils"
import { useCommandPaletteContext } from "./command-palette-context"

interface CommandPaletteHintProps {
  className?: string
  variant?: "button" | "text" | "minimal"
}

export function CommandPaletteHint({
  className,
  variant = "button",
}: CommandPaletteHintProps) {
  const { open } = useCommandPaletteContext()
  const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0
  const shortcut = isMac ? "⌘K" : "Ctrl+K"

  if (variant === "minimal") {
    return (
      <button
        onClick={open}
        className={cn(
          "text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors",
          className
        )}
        aria-label="Open command palette"
      >
        <Search className="h-3.5 w-3.5" />
        <KbdGroup>
          <Kbd>{shortcut}</Kbd>
        </KbdGroup>
      </button>
    )
  }

  if (variant === "text") {
    return (
      <button
        onClick={open}
        className={cn(
          "text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors",
          className
        )}
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
        <KbdGroup>
          <Kbd>{shortcut}</Kbd>
        </KbdGroup>
      </button>
    )
  }

  // Default: button variant
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={open}
      className={cn("gap-2", className)}
      aria-label="Open command palette"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <KbdGroup>
        <Kbd className="hidden sm:inline-flex">{shortcut}</Kbd>
      </KbdGroup>
    </Button>
  )
}
