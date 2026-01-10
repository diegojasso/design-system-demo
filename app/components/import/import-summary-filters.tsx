"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ImportSummaryItem } from "./mock-ezlynx-data"

type FilterSeverity = "all" | "error" | "warning" | "info"
type FilterStatus = "all" | "resolved" | "unresolved"

interface ImportSummaryFiltersProps {
  items: ImportSummaryItem[]
  severityFilter: FilterSeverity
  statusFilter: FilterStatus
  onSeverityChange: (severity: FilterSeverity) => void
  onStatusChange: (status: FilterStatus) => void
}

export function ImportSummaryFilters({
  items,
  severityFilter,
  statusFilter,
  onSeverityChange,
  onStatusChange,
}: ImportSummaryFiltersProps) {
  // Calculate counts for each filter
  const totalCount = items.length
  const resolvedCount = items.filter((item) => item.checked).length
  const unresolvedCount = totalCount - resolvedCount

  const errorCount = items.filter(
    (item) => item.severity === "error" && !item.checked
  ).length
  const warningCount = items.filter(
    (item) => item.severity === "warning" && !item.checked
  ).length
  const infoCount = items.filter(
    (item) => item.severity === "info" && !item.checked
  ).length

  const severityFilters: Array<{
    value: FilterSeverity
    label: string
    count?: number
    variant?: "default" | "destructive" | "outline"
  }> = [
    { value: "all", label: "All", count: totalCount },
    {
      value: "error",
      label: "Errors",
      count: errorCount,
      variant: "destructive",
    },
    {
      value: "warning",
      label: "Warnings",
      count: warningCount,
    },
    { value: "info", label: "Info", count: infoCount },
  ]

  const statusFilters: Array<{
    value: FilterStatus
    label: string
    count: number
  }> = [
    { value: "all", label: "All", count: totalCount },
    { value: "unresolved", label: "Unresolved", count: unresolvedCount },
    { value: "resolved", label: "Resolved", count: resolvedCount },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Severity Filters */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Severity:
        </span>
        <div className="flex flex-wrap gap-2">
          {severityFilters.map((filter) => {
            const isActive = severityFilter === filter.value
            const showCount = filter.count !== undefined && filter.count > 0

            return (
              <button
                key={filter.value}
                onClick={() => onSeverityChange(filter.value)}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted",
                  filter.value === "error" &&
                    isActive &&
                    "border-destructive bg-destructive text-white",
                  filter.value === "warning" &&
                    isActive &&
                    "border-amber-500 bg-amber-500 text-white",
                  filter.value === "info" &&
                    isActive &&
                    "border-blue-500 bg-blue-500 text-white"
                )}
              >
                {filter.label}
                {showCount && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-5 min-w-5 rounded-full px-1.5 text-[10px] font-semibold",
                      isActive
                        ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground"
                    )}
                  >
                    {filter.count}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Status:
        </span>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = statusFilter === filter.value

            return (
              <button
                key={filter.value}
                onClick={() => onStatusChange(filter.value)}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted"
                )}
              >
                {filter.label}
                <Badge
                  variant="outline"
                  className={cn(
                    "h-5 min-w-5 rounded-full px-1.5 text-[10px] font-semibold",
                    isActive
                      ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground"
                      : "border-border bg-muted text-muted-foreground"
                  )}
                >
                  {filter.count}
                </Badge>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
