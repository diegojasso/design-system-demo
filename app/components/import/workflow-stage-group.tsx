"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, FileText, Shield, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"
import { ImportSummaryItemCard } from "./import-summary-item-card"

interface WorkflowStageGroupProps {
  stage: "quote" | "underwriting" | "bind"
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
  onVINSave?: (vin: string) => Promise<void> | void
}

const stageConfig = {
  quote: {
    label: "Needed for Quote",
    description: "Items required to generate quote",
    icon: FileText,
    color: "text-destructive",
    borderColor: "border-destructive/30",
    headerBg: "bg-destructive/5",
    iconBg: "bg-destructive/10",
    badgeBg: "bg-destructive/10 text-destructive",
    accentBorder: "border-destructive/40",
  },
  underwriting: {
    label: "Needed for Underwriting",
    description: "Items required for underwriting review",
    icon: Shield,
    color: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    headerBg: "bg-amber-50 dark:bg-amber-950",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    badgeBg: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    accentBorder: "border-amber-400/60",
  },
  bind: {
    label: "Needed for Bind",
    description: "Items required to bind policy",
    icon: CheckCircle2,
    color: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    headerBg: "bg-blue-50 dark:bg-blue-950",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    accentBorder: "border-blue-400/60",
  },
}

export function WorkflowStageGroup({
  stage,
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
  onVINSave,
}: WorkflowStageGroupProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  const config = stageConfig[stage]
  const Icon = config.icon

  const unresolvedCount = items.filter((item) => !item.checked).length
  const allResolved = unresolvedCount === 0

  if (items.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-card shadow-sm transition-all overflow-hidden",
        config.borderColor
      )}
    >
      {/* Colored Header Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between gap-3 p-4 transition-colors",
          config.headerBg,
          "hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        aria-expanded={isExpanded}
        aria-label={`${config.label} - ${items.length} items`}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              config.iconBg,
              config.color
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-base font-semibold", config.color)}>
              {config.label}
            </span>
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                allResolved
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                  : config.badgeBg
              )}
            >
              {unresolvedCount > 0 ? `${unresolvedCount} unresolved` : "All resolved ✓"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className={cn("h-5 w-5", config.color)} />
          ) : (
            <ChevronRight className={cn("h-5 w-5", config.color)} />
          )}
        </div>
      </button>

      {/* Content Area */}
      {isExpanded && (
        <div 
          className={cn(
            "bg-background border-t border-border animate-in fade-in-0 slide-in-from-top-2 duration-300",
            // Colored left border matching stage
            "border-l-2",
            config.accentBorder
          )}
        >
          <div className="space-y-0">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "animate-in fade-in-0 slide-in-from-left-2",
                  // Add subtle divider between items (except last)
                  index < items.length - 1 && "border-b border-border/50"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationDuration: "300ms",
                  animationFillMode: "both",
                }}
              >
                <ImportSummaryItemCard
                  item={item}
                  onClick={() => onItemClick(item)}
                  onCheckboxChange={(checked) => onCheckboxChange(item.id, checked)}
                  tabIndex={startIndex + index}
                  isSelected={selectedItems.has(item.id)}
                  onSelect={onBulkSelect ? (selected) => onBulkSelect(item.id, selected) : undefined}
                  onQuickResolve={() => onQuickResolve?.(item.id)}
                  onQuickDismiss={() => onQuickDismiss?.(item.id)}
                  showQuickActions={showQuickActions}
                  onVINSave={onVINSave}
                  isInWorkflowGroup={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
