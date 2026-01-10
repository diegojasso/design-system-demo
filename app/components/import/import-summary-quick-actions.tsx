"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"

interface ImportSummaryQuickActionsProps {
  item: ImportSummaryItem
  onResolve: () => void
  onDismiss: () => void
  onNavigate?: () => void
  className?: string
}

export function ImportSummaryQuickActions({
  item,
  onResolve,
  onDismiss,
  onNavigate,
  className,
}: ImportSummaryQuickActionsProps) {
  const hasDetails =
    item.details?.type === "coverage-gap" ||
    item.details?.type === "accident-history"
  const hasNavigation = !!item.relatedSection

  if (item.checked) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {hasDetails ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onNavigate}
          className="h-7 text-xs"
        >
          View Details
        </Button>
      ) : hasNavigation ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onNavigate}
          className="h-7 text-xs"
        >
          <ArrowRight className="mr-1 h-3 w-3" />
          Go to {item.relatedSection}
        </Button>
      ) : null}

      {item.severity === "info" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-3 w-3" />
          Dismiss
        </Button>
      )}

      {item.severity !== "error" && (
        <Button
          variant="default"
          size="sm"
          onClick={onResolve}
          className="h-7 text-xs"
        >
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Resolve
        </Button>
      )}
    </div>
  )
}
