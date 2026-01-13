"use client"

import * as React from "react"
import { FileText, Shield, CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"
import { getWorkflowStage } from "./mock-ezlynx-data"

interface StickyWarningsBarProps {
  items: ImportSummaryItem[]
  onResolveAll: () => void
  onDismissAll: () => void
  onItemClick: (item: ImportSummaryItem) => void
  onScrollToWarnings?: () => void
  className?: string
}

export function StickyWarningsBar({
  items,
  onResolveAll,
  onDismissAll,
  onItemClick,
  onScrollToWarnings,
  className,
}: StickyWarningsBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  // Group items by workflow stage
  const groupedByStage = React.useMemo(() => {
    const groups = {
      quote: [] as ImportSummaryItem[],
      underwriting: [] as ImportSummaryItem[],
      bind: [] as ImportSummaryItem[],
    }
    
    items.forEach((item) => {
      const stage = getWorkflowStage(item)
      groups[stage].push(item)
    })
    
    return groups
  }, [items])
  
  const unresolvedQuote = groupedByStage.quote.filter((item) => !item.checked)
  const unresolvedUnderwriting = groupedByStage.underwriting.filter((item) => !item.checked)
  const unresolvedBind = groupedByStage.bind.filter((item) => !item.checked)
  const totalUnresolved = unresolvedQuote.length + unresolvedUnderwriting.length + unresolvedBind.length

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
          {unresolvedQuote.length > 0 && (
            <button
              onClick={handleViewAll}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <FileText className="h-4 w-4 text-destructive" />
              <span className="text-foreground">
                {unresolvedQuote.length} Needed for Quote
              </span>
            </button>
          )}

          {unresolvedUnderwriting.length > 0 && (
            <button
              onClick={handleViewAll}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Shield className="h-4 w-4 text-amber-500" />
              <span className="text-foreground">
                {unresolvedUnderwriting.length} Needed for Underwriting
              </span>
            </button>
          )}

          {unresolvedBind.length > 0 && (
            <button
              onClick={handleViewAll}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              <span className="text-foreground">
                {unresolvedBind.length} Needed for Bind
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
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 p-4 animate-in fade-in-0 slide-in-from-top-2">
          <div className="space-y-3">
            {/* Needed for Quote */}
            {unresolvedQuote.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-destructive uppercase tracking-wide">
                  Needed for Quote ({unresolvedQuote.length})
                </h4>
                <div className="space-y-1">
                  {unresolvedQuote.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemClick(item)
                        setIsExpanded(false)
                      }}
                      className="group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-destructive flex-shrink-0" />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Needed for Underwriting */}
            {unresolvedUnderwriting.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  Needed for Underwriting ({unresolvedUnderwriting.length})
                </h4>
                <div className="space-y-1">
                  {unresolvedUnderwriting.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemClick(item)
                        setIsExpanded(false)
                      }}
                      className="group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Needed for Bind */}
            {unresolvedBind.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Needed for Bind ({unresolvedBind.length})
                </h4>
                <div className="space-y-1">
                  {unresolvedBind.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemClick(item)
                        setIsExpanded(false)
                      }}
                      className="group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
