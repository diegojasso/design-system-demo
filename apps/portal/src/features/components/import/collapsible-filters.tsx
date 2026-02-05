"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@novo/ui"
import { Button } from "@novo/ui"
import { cn } from "@/shared/utils"
import { ImportSummaryFilters } from "./import-summary-filters"
import type { ImportSummaryItem } from "./mock-ezlynx-data"

type FilterSeverity = "all" | "error" | "warning" | "info"
type FilterStatus = "all" | "resolved" | "unresolved"

interface CollapsibleFiltersProps {
  items: ImportSummaryItem[]
  severityFilter: FilterSeverity
  statusFilter: FilterStatus
  onSeverityChange: (severity: FilterSeverity) => void
  onStatusChange: (status: FilterStatus) => void
  defaultOpen?: boolean
  className?: string
}

export function CollapsibleFilters({
  items,
  severityFilter,
  statusFilter,
  onSeverityChange,
  onStatusChange,
  defaultOpen = true,
  className,
}: CollapsibleFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  // Determine if filters are active (not "all")
  const hasActiveFilters = severityFilter !== "all" || statusFilter !== "all"
  const activeFilterCount =
    (severityFilter !== "all" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn("space-y-2", className)}>
      <div className="rounded-lg border border-border bg-card">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Filters</h3>
                <p className="text-xs text-muted-foreground">
                  {hasActiveFilters
                    ? `${activeFilterCount} active filter${activeFilterCount !== 1 ? "s" : ""}`
                    : "No filters applied"}
                </p>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 pb-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 overflow-hidden">
          <div className="pt-2">
            <ImportSummaryFilters
              items={items}
              severityFilter={severityFilter}
              statusFilter={statusFilter}
              onSeverityChange={onSeverityChange}
              onStatusChange={onStatusChange}
            />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
