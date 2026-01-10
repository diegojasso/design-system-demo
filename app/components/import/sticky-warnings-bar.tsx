"use client"

import * as React from "react"
import { AlertTriangle, XCircle, ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"

interface StickyWarningsBarProps {
  errors: ImportSummaryItem[]
  warnings: ImportSummaryItem[]
  onResolveAll: () => void
  onDismissAll: () => void
  onItemClick: (item: ImportSummaryItem) => void
  onScrollToWarnings?: () => void
  className?: string
}

export function StickyWarningsBar({
  errors,
  warnings,
  onResolveAll,
  onDismissAll,
  onItemClick,
  onScrollToWarnings,
  className,
}: StickyWarningsBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const unresolvedErrors = errors.filter((item) => !item.checked)
  const unresolvedWarnings = warnings.filter((item) => !item.checked)
  const totalUnresolved = unresolvedErrors.length + unresolvedWarnings.length

  // Auto-collapse when all resolved
  React.useEffect(() => {
    if (totalUnresolved === 0 && isExpanded) {
      setIsExpanded(false)
    }
  }, [totalUnresolved, isExpanded])

  // Don't show if everything is resolved
  if (totalUnresolved === 0) {
    return null
  }

  const handleViewAll = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded && onScrollToWarnings) {
      // Small delay to ensure expansion animation completes
      setTimeout(() => {
        onScrollToWarnings()
      }, 100)
    }
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-20 rounded-lg border border-border bg-card shadow-sm backdrop-blur-sm bg-card/95 transition-all",
        className
      )}
    >
      {/* Collapsed View */}
      <div className="flex items-center justify-between gap-4 p-3">
        <div className="flex items-center gap-4">
          {unresolvedErrors.length > 0 && (
            <button
              onClick={handleViewAll}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-foreground">
                {unresolvedErrors.length} Error{unresolvedErrors.length !== 1 ? "s" : ""}
              </span>
            </button>
          )}

          {unresolvedWarnings.length > 0 && (
            <button
              onClick={handleViewAll}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-foreground">
                {unresolvedWarnings.length} Warning{unresolvedWarnings.length !== 1 ? "s" : ""}
              </span>
            </button>
          )}

          <Badge variant="outline" className="text-xs">
            {totalUnresolved} unresolved
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAll}
            className="h-8 text-xs"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-3 w-3" />
                Hide
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-3 w-3" />
                View All
              </>
            )}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onResolveAll}
            className="h-8 text-xs"
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Resolve All
          </Button>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 p-4 animate-in fade-in-0 slide-in-from-top-2">
          <div className="space-y-3">
            {/* Errors */}
            {unresolvedErrors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-destructive uppercase tracking-wide">
                  Errors ({unresolvedErrors.length})
                </h4>
                <div className="space-y-1">
                  {unresolvedErrors.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemClick(item)
                        setIsExpanded(false)
                      }}
                      className="group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {unresolvedWarnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  Warnings ({unresolvedWarnings.length})
                </h4>
                <div className="space-y-1">
                  {unresolvedWarnings.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemClick(item)
                        setIsExpanded(false)
                      }}
                      className="group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismissAll}
                className="h-8 text-xs"
              >
                Dismiss All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onResolveAll}
                className="h-8 text-xs"
              >
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Resolve All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
