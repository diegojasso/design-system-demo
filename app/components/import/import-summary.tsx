"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { useQuote } from "@/app/contexts/quote-context"
import type { ImportSummaryData, ImportSummaryItem } from "./mock-ezlynx-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ImportSummaryStats } from "./import-summary-stats"
import { ImportSummaryFilters } from "./import-summary-filters"
import { ImportSummaryGroup } from "./import-summary-group"
import { ImportSummarySearch } from "./import-summary-search"
import { ImportSummaryBulkActions } from "./import-summary-bulk-actions"
import { CoverageGapWizard } from "./coverage-gap-wizard"
import { ImportTimeline } from "./import-timeline"

type FilterSeverity = "all" | "error" | "warning" | "info"
type FilterStatus = "all" | "resolved" | "unresolved"

interface ImportSummaryProps {
  data?: ImportSummaryData
}

export function ImportSummary({ data }: ImportSummaryProps) {
  const { quoteData, updateImportSummaryItem, setCurrentStep } = useQuote()
  const [selectedItem, setSelectedItem] = React.useState<ImportSummaryItem | null>(null)
  const [resolutionOption, setResolutionOption] = React.useState<string>("")
  const [severityFilter, setSeverityFilter] = React.useState<FilterSeverity>("all")
  const [statusFilter, setStatusFilter] = React.useState<FilterStatus>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const importSummary = data || quoteData.importSummary

  if (!importSummary) {
    return (
      <div className="mb-8 w-full text-center text-muted-foreground py-12">
        No import summary available
      </div>
    )
  }

  // Filter items based on current filters and search
  const filteredItems = React.useMemo(() => {
    return importSummary.missingInfo.filter((item) => {
      const matchesSeverity =
        severityFilter === "all" || item.severity === severityFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "resolved" && item.checked) ||
        (statusFilter === "unresolved" && !item.checked)
      const matchesSearch =
        !searchQuery.trim() ||
        item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())

      return matchesSeverity && matchesStatus && matchesSearch
    })
  }, [
    importSummary.missingInfo,
    severityFilter,
    statusFilter,
    searchQuery,
  ])

  // Get unresolved items for bulk actions
  const unresolvedItems = React.useMemo(() => {
    return filteredItems.filter((item) => !item.checked)
  }, [filteredItems])

  // Group items by severity
  const groupedItems = React.useMemo(() => {
    const groups: {
      error: ImportSummaryItem[]
      warning: ImportSummaryItem[]
      info: ImportSummaryItem[]
    } = {
      error: [],
      warning: [],
      info: [],
    }

    filteredItems.forEach((item) => {
      if (groups[item.severity]) {
        groups[item.severity].push(item)
      }
    })

    return groups
  }, [filteredItems])

  const handleItemClick = React.useCallback(
    (item: ImportSummaryItem) => {
      if (
        item.details?.type === "coverage-gap" ||
        item.details?.type === "accident-history"
      ) {
        setSelectedItem(item)
        setResolutionOption("")
      } else if (item.relatedSection) {
        // Navigate to related section
        setCurrentStep(item.relatedSection).catch((error) => {
          console.error("Failed to navigate:", error)
        })
      }
    },
    [setCurrentStep]
  )

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    updateImportSummaryItem?.(itemId, checked)
    // Remove from selection if resolved
    if (checked) {
      setSelectedItems((prev) => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    }
  }

  const handleBulkSelect = (itemId: string, selected: boolean) => {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      if (selected) {
        next.add(itemId)
      } else {
        next.delete(itemId)
      }
      return next
    })
  }

  const handleQuickResolve = React.useCallback(
    (itemId: string) => {
      updateImportSummaryItem?.(itemId, true)
      setSelectedItems((prev) => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    },
    [updateImportSummaryItem]
  )

  const handleQuickDismiss = React.useCallback(
    (itemId: string) => {
      // Same as resolve for now
      handleQuickResolve(itemId)
    },
    [handleQuickResolve]
  )

  const handleSelectAll = React.useCallback(() => {
    const allUnresolvedIds = new Set(
      unresolvedItems.map((item) => item.id)
    )
    setSelectedItems(allUnresolvedIds)
  }, [unresolvedItems])

  const handleDeselectAll = React.useCallback(() => {
    setSelectedItems(new Set())
  }, [])

  const handleResolveSelected = React.useCallback(() => {
    selectedItems.forEach((itemId) => {
      updateImportSummaryItem?.(itemId, true)
    })
    setSelectedItems(new Set())
  }, [selectedItems, updateImportSummaryItem])

  const handleDismissSelected = React.useCallback(() => {
    // For now, dismissing is the same as resolving
    // In the future, this could mark items as "dismissed" vs "resolved"
    selectedItems.forEach((itemId) => {
      updateImportSummaryItem?.(itemId, true)
    })
    setSelectedItems(new Set())
  }, [selectedItems, updateImportSummaryItem])

  const handleResolveCoverageGap = (option: string) => {
    if (selectedItem) {
      updateImportSummaryItem?.(selectedItem.id, true)
      setSelectedItem(null)
      setResolutionOption("")
    }
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setResolutionOption("")
  }

  const handleFilterChange = React.useCallback(
    (filter: { severity?: "error" | "warning" | "info"; status?: "resolved" | "unresolved" }) => {
      if (filter.severity !== undefined) {
        setSeverityFilter(filter.severity === "all" ? "all" : filter.severity)
      }
      if (filter.status !== undefined) {
        setStatusFilter(filter.status === "all" ? "all" : filter.status)
      }
    },
    []
  )

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close modal on Escape
      if (e.key === "Escape" && selectedItem) {
        handleCloseModal()
        return
      }

      // Don't handle shortcuts when typing in inputs or modals are open
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        selectedItem
      ) {
        return
      }

      // Keyboard shortcuts
      // Cmd/Ctrl + A: Select all unresolved items
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault()
        if (unresolvedItems.length > 0) {
          handleSelectAll()
        }
        return
      }

      // Cmd/Ctrl + D: Dismiss selected items
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault()
        if (selectedItems.size > 0) {
          handleDismissSelected()
        }
        return
      }

      // Cmd/Ctrl + R: Resolve selected items
      if ((e.metaKey || e.ctrlKey) && e.key === "r") {
        e.preventDefault()
        if (selectedItems.size > 0) {
          handleResolveSelected()
        }
        return
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    selectedItem,
    unresolvedItems.length,
    selectedItems.size,
    handleSelectAll,
    handleDismissSelected,
    handleResolveSelected,
    handleCloseModal,
  ])

  const coverageGapData =
    selectedItem?.details?.type === "coverage-gap"
      ? selectedItem.details.data
      : null
  const accidentHistoryData =
    selectedItem?.details?.type === "accident-history"
      ? selectedItem.details.data
      : null

  // Generate timeline events from import summary
  const timelineEvents = React.useMemo(() => {
    const events = [
      {
        id: "connect",
        label: "Connected to Ezlynx",
        status: "completed" as const,
        timestamp: new Date(Date.now() - 5000),
      },
      {
        id: "fetch",
        label: "Fetched quote data",
        status: "completed" as const,
        timestamp: new Date(Date.now() - 4000),
      },
      {
        id: "import-drivers",
        label: `Imported ${importSummary.importedInfo.drivers.length} driver${importSummary.importedInfo.drivers.length !== 1 ? "s" : ""}`,
        status: "completed" as const,
        timestamp: new Date(Date.now() - 3000),
      },
      {
        id: "import-vehicles",
        label: `Imported ${importSummary.importedInfo.vehicles.length} vehicle${importSummary.importedInfo.vehicles.length !== 1 ? "s" : ""}`,
        status: "completed" as const,
        timestamp: new Date(Date.now() - 2000),
      },
    ]

    // Add reports status
    if (importSummary.thirdPartyReports) {
      importSummary.thirdPartyReports.reports.forEach((report) => {
        events.push({
          id: `report-${report.type}`,
          label: `${report.type.toUpperCase()} report ${report.status === "completed" ? "completed" : "pending"}`,
          status: report.status === "completed" ? ("completed" as const) : ("pending" as const),
          timestamp: new Date(Date.now() - 1000),
        })
      })
    }

    return events
  }, [importSummary])

  return (
    <div className="mb-8 flex w-full flex-col gap-6">
      {/* Summary Statistics Dashboard */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImportSummaryStats
            data={importSummary}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-4">
            <ImportTimeline events={timelineEvents} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ImportSummarySearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search items..."
        />
        <div className="rounded-lg border border-border bg-card p-4">
          <ImportSummaryFilters
            items={importSummary.missingInfo}
            severityFilter={severityFilter}
            statusFilter={statusFilter}
            onSeverityChange={setSeverityFilter}
            onStatusChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {unresolvedItems.length > 0 && (
        <ImportSummaryBulkActions
          selectedItems={selectedItems}
          totalItems={filteredItems.length}
          unresolvedItems={unresolvedItems.length}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onResolveSelected={handleResolveSelected}
          onDismissSelected={handleDismissSelected}
        />
      )}

      {/* Grouped Items */}
      <div className="flex flex-col gap-4">
        {groupedItems.error.length > 0 && (
          <ImportSummaryGroup
            severity="error"
            items={groupedItems.error}
            onItemClick={handleItemClick}
            onCheckboxChange={handleCheckboxChange}
            defaultExpanded={true}
            startIndex={0}
            selectedItems={selectedItems}
            onBulkSelect={handleBulkSelect}
            onQuickResolve={handleQuickResolve}
            onQuickDismiss={handleQuickDismiss}
            showQuickActions={selectedItems.size === 0}
          />
        )}

        {groupedItems.warning.length > 0 && (
          <ImportSummaryGroup
            severity="warning"
            items={groupedItems.warning}
            onItemClick={handleItemClick}
            onCheckboxChange={handleCheckboxChange}
            defaultExpanded={true}
            startIndex={groupedItems.error.length}
            selectedItems={selectedItems}
            onBulkSelect={handleBulkSelect}
            onQuickResolve={handleQuickResolve}
            onQuickDismiss={handleQuickDismiss}
            showQuickActions={selectedItems.size === 0}
          />
        )}

        {groupedItems.info.length > 0 && (
          <ImportSummaryGroup
            severity="info"
            items={groupedItems.info}
            onItemClick={handleItemClick}
            onCheckboxChange={handleCheckboxChange}
            defaultExpanded={true}
            startIndex={groupedItems.error.length + groupedItems.warning.length}
            selectedItems={selectedItems}
            onBulkSelect={handleBulkSelect}
            onQuickResolve={handleQuickResolve}
            onQuickDismiss={handleQuickDismiss}
            showQuickActions={selectedItems.size === 0}
          />
        )}

        {filteredItems.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No items match the current filters.
            </p>
          </div>
        )}
      </div>

      {/* Coverage Gap Wizard Modal */}
      {selectedItem?.details?.type === "coverage-gap" && coverageGapData && (
        <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Coverage Gap Resolution
              </DialogTitle>
              <DialogDescription>
                Step-by-step guide to resolve the coverage gap for{" "}
                {quoteData.clientInfo?.firstName} {quoteData.clientInfo?.lastName}
              </DialogDescription>
            </DialogHeader>
            <CoverageGapWizard
              data={coverageGapData}
              clientName={`${quoteData.clientInfo?.firstName} ${quoteData.clientInfo?.lastName}`}
              onResolve={handleResolveCoverageGap}
              onClose={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Right Panel - Accident History Modal */}
      {selectedItem?.details?.type === "accident-history" && accidentHistoryData && (
        <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                MVR Report - {accidentHistoryData.driverName}
              </DialogTitle>
              <DialogDescription>
                Review the Motor Vehicle Record report for this driver.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Driver Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Driver Information</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Status:</span> {accidentHistoryData.status}
                  </p>
                  <p>
                    <span className="font-medium">Report Date:</span>{" "}
                    {new Date(accidentHistoryData.reportDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-medium">License Number:</span> {accidentHistoryData.licenseNumber} ({accidentHistoryData.licenseState})
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">Summary</h3>
                  <div className="mt-2 h-px bg-border" />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>{accidentHistoryData.summary.violations}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>{accidentHistoryData.summary.accidents}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>{accidentHistoryData.summary.licenseStatus}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    <span>{accidentHistoryData.summary.licenseClass}</span>
                  </li>
                </ul>
              </div>

              {/* Impact Statement */}
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                <p className="text-sm text-foreground">{accidentHistoryData.impact}</p>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t pt-4">
                <Button variant="ghost" onClick={handleCloseModal}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // TODO: Implement PDF download
                      console.log("Download Full Report PDF")
                    }}
                  >
                    Download Full Report PDF ↓
                  </Button>
                  <Button
                    onClick={() => {
                      updateImportSummaryItem?.(selectedItem.id, true)
                      handleCloseModal()
                    }}
                  >
                    Verify & Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
