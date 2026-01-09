"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface QuoteSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function QuoteSearch({
  value,
  onChange,
  placeholder = "Search by name or email",
}: QuoteSearchProps) {
  const [localValue, setLocalValue] = React.useState(value)

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

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-9",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        )}
      />
    </div>
  )
}
