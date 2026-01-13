"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, Info, XCircle, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"
import { ImportSummaryQuickActions } from "./import-summary-quick-actions"
import { InlineVINEditor } from "./inline-vin-editor"

interface ImportSummaryItemCardProps {
  item: ImportSummaryItem
  onClick: () => void
  onCheckboxChange: (checked: boolean) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  tabIndex?: number
  isSelected?: boolean
  onSelect?: (selected: boolean) => void
  onQuickResolve?: () => void
  onQuickDismiss?: () => void
  showQuickActions?: boolean
  onVINSave?: (vin: string) => Promise<void> | void
}

export function ImportSummaryItemCard({
  item,
  onClick,
  onCheckboxChange,
  onKeyDown,
  tabIndex = 0,
  isSelected = false,
  onSelect,
  onQuickResolve,
  onQuickDismiss,
  showQuickActions = true,
  onVINSave,
}: ImportSummaryItemCardProps) {
  const getSeverityIcon = (severity: ImportSummaryItem["severity"]) => {
    switch (severity) {
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }


  const hasDetails = item.details?.type === "coverage-gap" || item.details?.type === "accident-history"
  const hasNavigation = !!item.relatedSection

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (item.checked) return

    // Enter or Space to activate
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
    // Space should toggle checkbox if focused on checkbox
    else if (e.key === " " && e.target === e.currentTarget) {
      e.preventDefault()
      onCheckboxChange(!item.checked)
    }

    // Call parent handler for navigation
    onKeyDown?.(e)
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSelect) {
      onSelect(!isSelected)
    } else {
      onCheckboxChange(!item.checked)
    }
  }

  const getHelpText = () => {
    switch (item.severity) {
      case "error":
        return "This is a critical issue that must be resolved before proceeding."
      case "warning":
        return "This item requires review. It may impact the quote rating."
      case "info":
        return "This is informational. Review and resolve as needed."
      default:
        return ""
    }
  }

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      className={cn(
        "group relative flex items-start gap-4 p-5 transition-all duration-200",
        item.checked
          ? "bg-muted/30 opacity-60 animate-out fade-out-0 slide-out-to-right-4"
          : cn(
              "hover:bg-muted/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in-0 slide-in-from-left-4",
              item.severity === "error" &&
                "border-l-4 border-l-destructive hover:bg-destructive/5",
              item.severity === "warning" &&
                "border-l-4 border-l-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/50",
              item.severity === "info" &&
                "border-l-4 border-l-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/50"
            ),
        !item.checked && "focus-visible:bg-muted/70",
        isSelected && !item.checked && "bg-primary/5 ring-2 ring-primary/20"
      )}
      onClick={() => !item.checked && onClick()}
      onKeyDown={handleKeyDown}
      aria-label={item.label}
      aria-checked={item.checked}
      aria-selected={isSelected}
    >
      {/* Checkbox */}
      <Checkbox
        checked={onSelect ? isSelected : item.checked}
        onCheckedChange={(checked) => {
          if (onSelect) {
            onSelect(checked as boolean)
          } else {
            onCheckboxChange(checked as boolean)
          }
        }}
        onClick={handleCheckboxClick}
        className="mt-0.5"
      />

      {/* Content */}
      <div className="flex flex-1 items-start gap-3">
        {/* Icon - Larger for better visibility */}
        <div className="mt-0.5 flex-shrink-0">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              item.severity === "error" && "bg-destructive/10",
              item.severity === "warning" && "bg-amber-500/10",
              item.severity === "info" && "bg-blue-500/10"
            )}
          >
            {getSeverityIcon(item.severity)}
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-base font-semibold",
                item.checked
                  ? "text-muted-foreground line-through"
                  : cn(
                      "text-foreground",
                      item.severity === "error" && "text-destructive",
                      item.severity === "warning" && "text-amber-600 dark:text-amber-400"
                    )
              )}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.label}
            </span>
            {!item.checked && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p className="text-xs">{getHelpText()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Inline VIN Editor for missing VIN items */}
          {!item.checked &&
            item.details?.type === "missing-vin" &&
            onVINSave &&
            item.details.data?.vehicleName && (
              <div 
                className="mt-3 pt-3 border-t border-border animate-in fade-in-0 slide-in-from-top-2 duration-300"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <InlineVINEditor
                  value={""}
                  vehicleName={item.details.data.vehicleName}
                  onSave={async (vin) => {
                    await onVINSave(vin)
                    // Auto-resolve the item after saving VIN
                    onCheckboxChange(true)
                  }}
                />
              </div>
            )}

          {/* Action Hints */}
          {!item.checked && item.details?.type !== "missing-vin" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {hasDetails && (
                <span className="flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" />
                  Click to view details
                </span>
              )}
              {hasNavigation && !hasDetails && (
                <span className="flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" />
                  Navigate to {item.relatedSection}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Status Indicator */}
        {item.checked && (
          <div className="flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        )}

        {/* Quick Actions */}
        {showQuickActions && !item.checked && (
          <ImportSummaryQuickActions
            item={item}
            onResolve={() => {
              onQuickResolve?.()
              if (!onQuickResolve) {
                onCheckboxChange(true)
              }
            }}
            onDismiss={() => {
              onQuickDismiss?.()
            }}
            onNavigate={() => {
              onClick()
            }}
          />
        )}
      </div>
    </div>
  )
}
