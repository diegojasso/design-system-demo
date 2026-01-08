"use client"

import * as React from "react"
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuoteSaveStatusProps {
  isSaving: boolean
  lastSaved: Date | null
  error: Error | null
  onRetry?: () => void
  className?: string
}

export function QuoteSaveStatus({
  isSaving,
  lastSaved,
  error,
  onRetry,
  className,
}: QuoteSaveStatusProps) {
  const [showSaved, setShowSaved] = React.useState(false)

  // Show "Saved" indicator briefly after successful save
  React.useEffect(() => {
    if (!isSaving && lastSaved && !error) {
      setShowSaved(true)
      const timer = setTimeout(() => {
        setShowSaved(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSaving, lastSaved, error])

  // Don't show anything if idle and no recent save
  if (!isSaving && !showSaved && !error) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm",
        className
      )}
    >
      {isSaving && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Saving...
          </span>
        </>
      )}
      {showSaved && !isSaving && (
        <>
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Saved
          </span>
        </>
      )}
      {error && !isSaving && (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-destructive" style={{ fontFamily: "Inter, sans-serif" }}>
            Save failed
          </span>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="h-6 px-2 text-xs"
              disabled={isSaving}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
