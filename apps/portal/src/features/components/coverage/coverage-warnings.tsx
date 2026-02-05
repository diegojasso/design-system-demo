"use client"

import * as React from "react"
import { Button } from "@novo/ui"
import { Badge } from "@novo/ui"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@novo/ui"
import { AlertTriangle, Info, X, ChevronDown, ChevronUp } from "lucide-react"
import { validateCoverage, CoverageWarning } from "./validation"
import { CoverageData } from "./types"
import { Vehicle } from "@/features/components/vehicles-table/types"
import { cn } from "@/shared/utils"

interface CoverageWarningsProps {
  coverage: CoverageData
  vehicles: Vehicle[]
  onFixWarning?: (warning: CoverageWarning) => void
  onDismissWarning?: (warningId: string) => void
}

export function CoverageWarnings({
  coverage,
  vehicles,
  onFixWarning,
  onDismissWarning,
}: CoverageWarningsProps) {
  const [dismissedWarnings, setDismissedWarnings] = React.useState<Set<string>>(new Set())
  const [isExpanded, setIsExpanded] = React.useState(false)

  const warnings = React.useMemo(() => {
    return validateCoverage(coverage, vehicles)
  }, [coverage, vehicles])

  const visibleWarnings = warnings.filter((w) => !dismissedWarnings.has(w.id))

  const handleDismiss = (warningId: string) => {
    setDismissedWarnings((prev) => new Set(prev).add(warningId))
    onDismissWarning?.(warningId)
  }

  const handleFix = (warning: CoverageWarning) => {
    onFixWarning?.(warning)
  }

  const handleFixAll = () => {
    visibleWarnings.forEach((warning) => {
      if (warning.autoFix) {
        handleFix(warning)
      }
    })
  }

  if (visibleWarnings.length === 0) {
    return null
  }

  const errors = visibleWarnings.filter((w) => w.severity === "error")
  const warningsOnly = visibleWarnings.filter((w) => w.severity === "warning")
  const infoOnly = visibleWarnings.filter((w) => w.severity === "info")
  const fixableWarnings = visibleWarnings.filter((w) => w.autoFix)

  const getSeverityColor = () => {
    if (errors.length > 0) return "red"
    if (warningsOnly.length > 0) return "amber"
    return "blue"
  }

  const severityColor = getSeverityColor()

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border text-sm",
          severityColor === "red" &&
            "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20",
          severityColor === "amber" &&
            "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20",
          severityColor === "blue" &&
            "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20"
        )}
      >
        <AlertTriangle
          className={cn(
            "h-3.5 w-3.5 flex-shrink-0",
            severityColor === "red" && "text-red-600 dark:text-red-400",
            severityColor === "amber" && "text-amber-600 dark:text-amber-400",
            severityColor === "blue" && "text-blue-600 dark:text-blue-400"
          )}
        />
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "font-medium",
              severityColor === "red" && "text-red-900 dark:text-red-100",
              severityColor === "amber" && "text-amber-900 dark:text-amber-100",
              severityColor === "blue" && "text-blue-900 dark:text-blue-100"
            )}
          >
            Coverage Warnings
          </span>
          {errors.length > 0 && (
            <Badge variant="destructive" className="h-4 px-1.5 text-xs">
              {errors.length}
            </Badge>
          )}
          {warningsOnly.length > 0 && (
            <Badge
              variant="outline"
              className={cn(
                "h-4 px-1.5 text-xs",
                severityColor === "amber" &&
                  "border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
              )}
            >
              {warningsOnly.length}
            </Badge>
          )}
          {infoOnly.length > 0 && (
            <Badge
              variant="outline"
              className={cn(
                "h-4 px-1.5 text-xs",
                severityColor === "blue" &&
                  "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
              )}
            >
              {infoOnly.length}
            </Badge>
          )}
        </div>
        {fixableWarnings.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={handleFixAll}
          >
            Fix All
          </Button>
        )}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            {isExpanded ? (
              <>
                Hide
                <ChevronUp className="h-3 w-3 ml-1" />
              </>
            ) : (
              <>
                Details
                <ChevronDown className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 space-y-1.5">
        {visibleWarnings.map((warning) => (
          <div
            key={warning.id}
            className={cn(
              "px-3 py-2 rounded-md border text-sm",
              warning.severity === "error" &&
                "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10",
              warning.severity === "warning" &&
                "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10",
              warning.severity === "info" &&
                "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 flex items-start gap-2">
                {warning.severity === "error" && (
                  <AlertTriangle className="h-3.5 w-3.5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                )}
                {warning.severity === "warning" && (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                )}
                {warning.severity === "info" && (
                  <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-xs font-medium flex-1">{warning.message}</span>
              </div>
              <div className="flex items-center gap-1">
                {warning.autoFix && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleFix(warning)}
                  >
                    {warning.autoFix.action}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDismiss(warning.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
