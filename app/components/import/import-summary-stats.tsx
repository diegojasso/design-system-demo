"use client"

import * as React from "react"
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ImportSummaryData } from "./mock-ezlynx-data"

interface ImportSummaryStatsProps {
  data: ImportSummaryData
  onFilterChange?: (filter: {
    severity?: "error" | "warning" | "info"
    status?: "resolved" | "unresolved"
  }) => void
}

export function ImportSummaryStats({
  data,
  onFilterChange,
}: ImportSummaryStatsProps) {
  const { importedInfo, missingInfo } = data

  // Calculate statistics
  const totalItems = missingInfo.length
  const resolvedItems = missingInfo.filter((item) => item.checked).length
  const unresolvedItems = totalItems - resolvedItems

  const errors = missingInfo.filter(
    (item) => item.severity === "error" && !item.checked
  ).length
  const warnings = missingInfo.filter(
    (item) => item.severity === "warning" && !item.checked
  ).length
  const infoItems = missingInfo.filter(
    (item) => item.severity === "info" && !item.checked
  ).length

  const completionPercentage =
    totalItems > 0 ? Math.round((resolvedItems / totalItems) * 100) : 100

  const handleMetricClick = (
    severity?: "error" | "warning" | "info",
    status?: "resolved" | "unresolved"
  ) => {
    onFilterChange?.({ severity, status })
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6">
        <h2
          className="mb-2 text-lg font-semibold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Import Summary
        </h2>
        <p className="text-sm text-muted-foreground">
          Review and resolve items to complete the import
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {resolvedItems} of {totalItems} resolved
          </span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
        <div className="mt-1 text-xs text-muted-foreground">
          {completionPercentage}% complete
        </div>
      </div>

      {/* Imported Info */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <div className="mb-1 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-foreground">
              Drivers Imported
            </span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {importedInfo.drivers.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {importedInfo.drivers.map((d) => d.name).join(", ")}
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-3">
          <div className="mb-1 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-foreground">
              Vehicles Imported
            </span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {importedInfo.vehicles.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {importedInfo.vehicles
              .map((v) => `${v.year} ${v.make} ${v.model}`)
              .join(", ")}
          </p>
        </div>
      </div>

      {/* Status Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {errors > 0 && (
          <button
            onClick={() => handleMetricClick("error", "unresolved")}
            className={cn(
              "group flex flex-col items-start gap-1 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-left transition-all hover:border-destructive/40 hover:bg-destructive/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
            )}
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium text-muted-foreground">
                Errors
              </span>
            </div>
            <p className="text-xl font-semibold text-destructive">{errors}</p>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              Need attention
            </p>
          </button>
        )}

        {warnings > 0 && (
          <button
            onClick={() => handleMetricClick("warning", "unresolved")}
            className={cn(
              "group flex flex-col items-start gap-1 rounded-md border border-amber-200 bg-amber-50 p-3 text-left transition-all hover:border-amber-300 hover:bg-amber-100",
              "dark:border-amber-800 dark:bg-amber-950 dark:hover:border-amber-700 dark:hover:bg-amber-900",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            )}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-muted-foreground">
                Warnings
              </span>
            </div>
            <p className="text-xl font-semibold text-amber-600 dark:text-amber-400">
              {warnings}
            </p>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              Review needed
            </p>
          </button>
        )}

        {infoItems > 0 && (
          <button
            onClick={() => handleMetricClick("info", "unresolved")}
            className={cn(
              "group flex flex-col items-start gap-1 rounded-md border border-blue-200 bg-blue-50 p-3 text-left transition-all hover:border-blue-300 hover:bg-blue-100",
              "dark:border-blue-800 dark:bg-blue-950 dark:hover:border-blue-700 dark:hover:bg-blue-900",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            )}
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-muted-foreground">
                Info
              </span>
            </div>
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {infoItems}
            </p>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              For reference
            </p>
          </button>
        )}

        {errors === 0 && warnings === 0 && infoItems === 0 && (
          <div className="col-span-3 flex items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-foreground">
              All items resolved! Import is complete.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
