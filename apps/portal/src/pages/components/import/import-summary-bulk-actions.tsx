"use client"

import * as React from "react"
import { Button } from "@novo/ui"
import { CheckCircle2, X, CheckSquare2, Square } from "lucide-react"
import { cn } from "@/shared/utils"

interface ImportSummaryBulkActionsProps {
  selectedItems: Set<string>
  totalItems: number
  unresolvedItems: number
  onSelectAll: () => void
  onDeselectAll: () => void
  onResolveSelected: () => void
  onDismissSelected: () => void
  className?: string
}

export function ImportSummaryBulkActions({
  selectedItems,
  totalItems,
  unresolvedItems,
  onSelectAll,
  onDeselectAll,
  onResolveSelected,
  onDismissSelected,
}: ImportSummaryBulkActionsProps) {
  const allSelected = selectedItems.size === unresolvedItems && unresolvedItems > 0
  const someSelected = selectedItems.size > 0 && !allSelected

  const handleSelectAllToggle = () => {
    if (allSelected) {
      onDeselectAll()
    } else {
      onSelectAll()
    }
  }

  if (selectedItems.size === 0 && unresolvedItems === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-3 shadow-sm",
        "backdrop-blur-sm bg-card/95"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleSelectAllToggle}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
            "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          {allSelected ? (
            <CheckSquare2 className="h-4 w-4 text-primary" />
          ) : someSelected ? (
            <div className="h-4 w-4 rounded border-2 border-primary bg-primary/20" />
          ) : (
            <Square className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm text-foreground">
            {selectedItems.size > 0
              ? `${selectedItems.size} selected`
              : unresolvedItems > 0
                ? `Select all (${unresolvedItems})`
                : "All resolved"}
          </span>
        </button>

        {selectedItems.size > 0 && (
          <span className="text-xs text-muted-foreground">
            of {unresolvedItems} unresolved
          </span>
        )}
      </div>

      {selectedItems.size > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDismissSelected}
            className="h-8 text-xs"
            disabled={selectedItems.size === 0}
          >
            <X className="mr-1 h-3 w-3" />
            Dismiss ({selectedItems.size})
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onResolveSelected}
            className="h-8 text-xs"
            disabled={selectedItems.size === 0}
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Resolve ({selectedItems.size})
          </Button>
        </div>
      )}
    </div>
  )
}
