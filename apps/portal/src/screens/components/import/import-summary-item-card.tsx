"use client"

import * as React from "react"
import { Checkbox } from "@novo/ui"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@novo/ui"
import { CheckCircle2, ArrowRight, HelpCircle } from "lucide-react"
import { cn } from "@/shared/utils"
import { useMessages } from "@/shared/hooks/use-messages"
import type { ImportSummaryItem } from "./mock-ezlynx-data"
import { getWorkflowStage } from "@/shared/import-summary-utils"
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
  onVINSave?: (item: ImportSummaryItem, vin: string) => Promise<void> | void
  isInWorkflowGroup?: boolean
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
  isInWorkflowGroup = false,
}: ImportSummaryItemCardProps) {
  const t = useMessages()
  const hasDetails =
    item.details?.type === "coverage-gap" || item.details?.type === "accident-history"
  const hasNavigation = !!item.relatedSection

  const workflowStage = item.workflowStage ?? getWorkflowStage(item)

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
        return t("import-summary.item.help.error")
      case "warning":
        return t("import-summary.item.help.warning")
      case "info":
        return t("import-summary.item.help.info")
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
              // Only add left border if NOT in workflow group (content area has border)
              !isInWorkflowGroup && workflowStage === "quote" &&
                "border-l-4 border-l-destructive hover:bg-destructive/5",
              !isInWorkflowGroup && workflowStage === "underwriting" &&
                "border-l-4 border-l-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/50",
              !isInWorkflowGroup && workflowStage === "bind" &&
                "border-l-4 border-l-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/50",
              // Hover states when in workflow group
              isInWorkflowGroup && workflowStage === "quote" &&
                "hover:bg-destructive/5",
              isInWorkflowGroup && workflowStage === "underwriting" &&
                "hover:bg-amber-50/50 dark:hover:bg-amber-950/50",
              isInWorkflowGroup && workflowStage === "bind" &&
                "hover:bg-blue-50/50 dark:hover:bg-blue-950/50"
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
      <div className="flex flex-1 items-start">
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
                      workflowStage === "quote" && "text-destructive",
                      workflowStage === "underwriting" && "text-amber-600 dark:text-amber-400",
                      workflowStage === "bind" && "text-blue-600 dark:text-blue-400"
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

          {/* VIN Missing Item Details */}
          {!item.checked &&
            item.details?.type === "missing-vin" &&
            item.details.data?.vehicleName && (
              <div className="space-y-1 mt-2">
                <p className="text-sm text-muted-foreground">
                  {t("import-summary.item.vehicle-label", {
                    vehicleName: item.details.data.vehicleName,
                  })}
                </p>
                {onVINSave && (
                  <div 
                    className="mt-2"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <InlineVINEditor
                      value={""}
                      onSave={async (vin) => {
                        await onVINSave(item, vin)
                        // Auto-resolve the item after saving VIN
                        onCheckboxChange(true)
                      }}
                    />
                  </div>
                )}
              </div>
            )}

          {/* Action Hints */}
          {!item.checked && item.details?.type !== "missing-vin" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {hasDetails && (
                <span className="flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" />
                  {t("import-summary.item.click-details")}
                </span>
              )}
              {hasNavigation && !hasDetails && (
                <span className="flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" />
                  {t("import-summary.item.navigate-to", {
                    section: item.relatedSection,
                  })}
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

      </div>
    </div>
  )
}
