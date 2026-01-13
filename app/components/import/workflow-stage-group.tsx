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
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    headerBg: "bg-destructive/5",
    shadow: "shadow-destructive/10",
    iconBg: "bg-destructive/20",
  },
  underwriting: {
    label: "Needed for Underwriting",
    description: "Items required for underwriting review",
    icon: Shield,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    borderColor: "border-amber-200 dark:border-amber-800",
    headerBg: "bg-amber-50 dark:bg-amber-950",
    shadow: "shadow-amber-500/10",
    iconBg: "bg-amber-100 dark:bg-amber-900",
  },
  bind: {
    label: "Needed for Bind",
    description: "Items required to bind policy",
    icon: CheckCircle2,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    headerBg: "bg-blue-50 dark:bg-blue-950",
    shadow: "shadow-blue-500/10",
    iconBg: "bg-blue-100 dark:bg-blue-900",
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
        "rounded-lg border-2 transition-all",
        config.borderColor,
        config.bgColor,
        config.shadow,
        "shadow-lg"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-t-lg transition-all duration-200",
          config.headerBg,
          "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2",
          config.color.replace("text-", "focus:ring-"),
          "hover:shadow-md"
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
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className={cn("text-base font-bold", config.color)}>
                {config.label}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  allResolved
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : config.bgColor + " " + config.color
                )}
              >
                {unresolvedCount > 0 ? `${unresolvedCount} unresolved` : "All resolved ✓"}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-0.5">
              {config.description}
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

      {/* Items */}
      {isExpanded && (
        <div className="bg-card space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in-0 slide-in-from-left-2"
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
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
