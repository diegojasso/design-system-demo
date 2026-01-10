"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, XCircle, AlertTriangle, Info } from "lucide-react"
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
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    headerBg: "bg-destructive/5",
    shadow: "shadow-destructive/10",
  },
  warning: {
    label: "Warnings",
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    borderColor: "border-amber-200 dark:border-amber-800",
    headerBg: "bg-amber-50 dark:bg-amber-950",
    shadow: "shadow-amber-500/10",
  },
  info: {
    label: "Info",
    icon: Info,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    headerBg: "bg-blue-50 dark:bg-blue-950",
    shadow: "shadow-blue-500/10",
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

  const IconComponent = config.icon

  return (
    <div
      className={cn(
        "rounded-lg border-2 bg-card shadow-sm transition-shadow",
        config.borderColor,
        severity === "error" && "shadow-lg shadow-destructive/10",
        severity === "warning" && "shadow-md shadow-amber-500/10"
      )}
    >
      {/* Group Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-t-lg border-b-2 px-5 py-4 transition-all",
          "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          config.headerBg,
          config.borderColor,
          severity === "error" && "hover:shadow-lg hover:shadow-destructive/20"
        )}
      >
        <div className="flex items-center gap-4">
          {isExpanded ? (
            <ChevronDown className={cn("h-5 w-5 transition-transform", config.color)} />
          ) : (
            <ChevronRight className={cn("h-5 w-5 transition-transform", config.color)} />
          )}
          <IconComponent className={cn("h-5 w-5", config.color)} />
          <div className="flex items-center gap-3">
            <span className={cn("text-base font-bold", config.color)}>
              {config.label}
            </span>
            <span className="text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
            {unresolvedCount > 0 && (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-bold",
                  severity === "error"
                    ? "bg-destructive text-destructive-foreground"
                    : severity === "warning"
                      ? "bg-amber-500 text-white"
                      : "bg-blue-500 text-white"
                )}
              >
                {unresolvedCount} unresolved
              </span>
            )}
          </div>
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
              onSelect={onBulkSelect ? (selected) => onBulkSelect(item.id, selected) : undefined}
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
