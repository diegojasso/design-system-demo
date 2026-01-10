"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AlertTriangle, Info, X, ChevronDown, ChevronUp } from "lucide-react"
import { validateCoverage, CoverageWarning } from "./validation"
import { CoverageData } from "./types"
import { Vehicle } from "@/app/components/vehicles-table/types"
import { cn } from "@/lib/utils"

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
  const [isExpanded, setIsExpanded] = React.useState(true)

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

  if (visibleWarnings.length === 0) {
    return null
  }

  const errors = visibleWarnings.filter((w) => w.severity === "error")
  const warningsOnly = visibleWarnings.filter((w) => w.severity === "warning")
  const infoOnly = visibleWarnings.filter((w) => w.severity === "info")

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Alert
        className={cn(
          errors.length > 0
            ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
            : warningsOnly.length > 0
            ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20"
            : "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20"
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1">
            <AlertTriangle
              className={cn(
                "h-4 w-4 mt-0.5",
                errors.length > 0 && "text-red-600 dark:text-red-400",
                warningsOnly.length > 0 && "text-amber-600 dark:text-amber-400",
                infoOnly.length > 0 && "text-blue-600 dark:text-blue-400"
              )}
            />
            <div className="flex-1">
              <AlertTitle>
                Coverage Warnings ({visibleWarnings.length})
              </AlertTitle>
              <AlertDescription className="mt-1">
                {errors.length > 0 && (
                  <span className="text-red-700 dark:text-red-300 font-medium">
                    {errors.length} error{errors.length > 1 ? "s" : ""}
                  </span>
                )}
                {errors.length > 0 && warningsOnly.length > 0 && " • "}
                {warningsOnly.length > 0 && (
                  <span className="text-amber-700 dark:text-amber-300 font-medium">
                    {warningsOnly.length} warning{warningsOnly.length > 1 ? "s" : ""}
                  </span>
                )}
                {infoOnly.length > 0 && (errors.length > 0 || warningsOnly.length > 0) && " • "}
                {infoOnly.length > 0 && (
                  <span className="text-blue-700 dark:text-blue-300">
                    {infoOnly.length} suggestion{infoOnly.length > 1 ? "s" : ""}
                  </span>
                )}
              </AlertDescription>
            </div>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4 space-y-2">
          {visibleWarnings.map((warning) => (
            <div
              key={warning.id}
              className="p-3 rounded-md bg-background/80 border border-border"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {warning.severity === "error" && (
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                    {warning.severity === "warning" && (
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    )}
                    {warning.severity === "info" && (
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                    <span className="text-sm font-medium">{warning.message}</span>
                  </div>
                  {warning.autoFix && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 h-7 text-xs"
                      onClick={() => handleFix(warning)}
                    >
                      {warning.autoFix.action}
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDismiss(warning.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Alert>
    </Collapsible>
  )
}
