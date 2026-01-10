"use client"

import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"
import { ImportSummaryItemCard } from "./import-summary-item-card"

interface ImportSummaryGroupProps {
  severity: "error" | "warning" | "info"
  items: ImportSummaryItem[]
  onItemClick: (item: ImportSummaryItem) => void
  onCheckboxChange: (itemId: string, checked: boolean) => void
  defaultExpanded?: boolean
  startIndex?: number
  selectedItems?: Set<string>
  onBulkSelect?: (itemId: string, selected: boolean) => void
  onQuickResolve?: (itemId: string) => void
  onQuickDismiss?: (itemId: string) => void
  showQuickActions?: boolean
}

const severityConfig = {
  error: {
    label: "Errors",
    icon: "🔴",
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
  },
  warning: {
    label: "Warnings",
    icon: "⚠️",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  info: {
    label: "Info",
    icon: "ℹ️",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
}

export function ImportSummaryGroup({
  severity,
  items,
  onItemClick,
  onCheckboxChange,
  defaultExpanded = true,
  startIndex = 0,
  selectedItems = new Set(),
  onBulkSelect,
  onQuickResolve,
  onQuickDismiss,
  showQuickActions = true,
}: ImportSummaryGroupProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  if (items.length === 0) {
    return null
  }

  const config = severityConfig[severity]
  const unresolvedCount = items.filter((item) => !item.checked).length

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Group Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-t-lg border-b border-border px-4 py-3 transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          config.bgColor,
          config.borderColor
        )}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={cn("text-sm font-semibold", config.color)}>
            {config.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
          {unresolvedCount > 0 && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                config.bgColor,
                config.color
              )}
            >
              {unresolvedCount} unresolved
            </span>
          )}
        </div>
      </button>

      {/* Group Items */}
      {isExpanded && (
        <div className="divide-y divide-border">
          {items.map((item, index) => (
            <ImportSummaryItemCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
              onCheckboxChange={(checked) =>
                onCheckboxChange(item.id, checked)
              }
              tabIndex={startIndex + index}
              isSelected={selectedItems.has(item.id)}
              onSelect={onBulkSelect}
              onQuickResolve={() => onQuickResolve?.(item.id)}
              onQuickDismiss={() => onQuickDismiss?.(item.id)}
              showQuickActions={showQuickActions}
            />
          ))}
        </div>
      )}
    </div>
  )
}
