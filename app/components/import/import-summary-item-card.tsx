"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, Info, XCircle, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"
import { ImportSummaryQuickActions } from "./import-summary-quick-actions"

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
}: ImportSummaryItemCardProps) {
  const getSeverityIcon = (severity: ImportSummaryItem["severity"]) => {
    switch (severity) {
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getSeverityBadge = (severity: ImportSummaryItem["severity"]) => {
    switch (severity) {
      case "error":
        return (
          <Badge
            variant="destructive"
            className="text-[10px] font-semibold"
          >
            Error
          </Badge>
        )
      case "warning":
        return (
          <Badge
            className="border-amber-500 bg-amber-500 text-white text-[10px] font-semibold"
          >
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge
            className="border-blue-500 bg-blue-500 text-white text-[10px] font-semibold"
          >
            Info
          </Badge>
        )
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
        "group relative flex items-start gap-3 p-4 transition-all duration-200",
        item.checked
          ? "bg-muted/30 opacity-60 animate-out fade-out-0 slide-out-to-right-4"
          : "hover:bg-muted/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in-0 slide-in-from-left-4",
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
        {/* Icon */}
        <div className="mt-0.5 flex-shrink-0">
          {getSeverityIcon(item.severity)}
        </div>

        {/* Text Content */}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-sm font-medium",
                item.checked
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              )}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.label}
            </span>
            {getSeverityBadge(item.severity)}
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

          {/* Action Hints */}
          {!item.checked && (
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
