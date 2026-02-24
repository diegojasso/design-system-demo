"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@novo/ui"
import { Button } from "@novo/ui"
import { cn } from "@/shared/utils"

interface ImportSummarySearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
}

export function ImportSummarySearch({
  value,
  onChange,
  placeholder = "Search items...",
  onFocus,
  onBlur,
}: ImportSummarySearchProps) {
  const [localValue, setLocalValue] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Debounce search input (300ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, onChange])

  // Sync external value changes
  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Focus search on "/" key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Focus search on "/"
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleClear = () => {
    setLocalValue("")
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          "w-full pl-9 pr-9",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        )}
      />
      {localValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </Button>
      )}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <kbd className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
          <span className="text-xs">/</span>
        </kbd>
      </div>
    </div>
  )
}
