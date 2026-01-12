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
import { ImportSummaryGroup } from "./import-summary-group"
import { ImportSummarySearch } from "./import-summary-search"
import { CoverageGapWizard } from "./coverage-gap-wizard"
import { ImportTimeline } from "./import-timeline"
import { ImportSummaryHeader } from "./import-summary-header"
import { CompactProgressIndicator } from "./compact-progress-indicator"
import { StickyWarningsBar } from "./sticky-warnings-bar"
import { CollapsibleImportedInfo } from "./collapsible-imported-info"
import { CollapsibleTimeline } from "./collapsible-timeline"

interface ImportSummaryProps {
  data?: ImportSummaryData
  quoteNumber?: string
}

export function ImportSummary({ data, quoteNumber }: ImportSummaryProps) {
  const { quoteData, updateImportSummaryItem, setCurrentStep } = useQuote()
  const [selectedItem, setSelectedItem] = React.useState<ImportSummaryItem | null>(null)
  const [resolutionOption, setResolutionOption] = React.useState<string>("")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const importSummary = data || quoteData.importSummary

  if (!importSummary) {
    return (
      <div className="mb-8 w-full text-center text-muted-foreground py-12">
        No import summary available
      </div>
    )
  }

  // Filter items based on search query only
  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return importSummary.missingInfo
    }
    return importSummary.missingInfo.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [importSummary.missingInfo, searchQuery])

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
  }

  const handleQuickResolve = React.useCallback(
    (itemId: string) => {
      updateImportSummaryItem?.(itemId, true)
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
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem, handleCloseModal])

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
    const events: Array<{
      id: string
      label: string
      status: "completed" | "pending" | "failed"
      timestamp: Date
    }> = [
      {
        id: "connect",
        label: "Connected to Ezlynx",
        status: "completed",
        timestamp: new Date(Date.now() - 5000),
      },
      {
        id: "fetch",
        label: "Fetched quote data",
        status: "completed",
        timestamp: new Date(Date.now() - 4000),
      },
      {
        id: "import-drivers",
        label: `Imported ${importSummary.importedInfo.drivers.length} driver${importSummary.importedInfo.drivers.length !== 1 ? "s" : ""}`,
        status: "completed",
        timestamp: new Date(Date.now() - 3000),
      },
      {
        id: "import-vehicles",
        label: `Imported ${importSummary.importedInfo.vehicles.length} vehicle${importSummary.importedInfo.vehicles.length !== 1 ? "s" : ""}`,
        status: "completed",
        timestamp: new Date(Date.now() - 2000),
      },
    ]

    // Add reports status
    if (importSummary.thirdPartyReports) {
      importSummary.thirdPartyReports.reports.forEach((report) => {
        const status: "completed" | "pending" | "failed" = 
          report.status === "completed" ? "completed" :
          report.status === "failed" ? "failed" :
          "pending"
        events.push({
          id: `report-${report.type}`,
          label: `${report.type.toUpperCase()} report ${status}`,
          status,
          timestamp: new Date(Date.now() - 1000),
        })
      })
    }

    return events
  }, [importSummary])

  const resolvedItems = importSummary.missingInfo.filter((item) => item.checked).length
  const totalItems = importSummary.missingInfo.length

  // Get unresolved errors and warnings for sticky bar
  const unresolvedErrors = React.useMemo(() => {
    return importSummary.missingInfo.filter(
      (item) => item.severity === "error" && !item.checked
    )
  }, [importSummary.missingInfo])

  const unresolvedWarnings = React.useMemo(() => {
    return importSummary.missingInfo.filter(
      (item) => item.severity === "warning" && !item.checked
    )
  }, [importSummary.missingInfo])

  // Ref for scrolling to warnings section
  const warningsSectionRef = React.useRef<HTMLDivElement>(null)

  const handleScrollToWarnings = () => {
    warningsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleResolveAllWarnings = () => {
    const allUnresolvedIds = [
      ...unresolvedErrors.map((item) => item.id),
      ...unresolvedWarnings.map((item) => item.id),
    ]
    allUnresolvedIds.forEach((itemId) => {
      updateImportSummaryItem?.(itemId, true)
    })
  }

  const handleDismissAllWarnings = () => {
    // Same as resolve for now
    handleResolveAllWarnings()
  }

  return (
    <div className="mb-8 flex w-full flex-col gap-6">
      {/* Compact Header Bar */}
      <ImportSummaryHeader
        quoteNumber={quoteNumber || quoteData.ezlynxQuoteNumber || "KBD78E7747"}
        primaryAddress={quoteData.clientInfo?.address || "5211 S McQueen Rd, Chandler, AZ 85249"}
        premiumEstimate={importSummary.premiumEstimate}
        thirdPartyReports={importSummary.thirdPartyReports}
      />

      {/* Compact Progress Indicator */}
      <div className="rounded-lg border border-border bg-card p-4">
        <CompactProgressIndicator
          resolved={resolvedItems}
          total={totalItems}
          driversCount={importSummary.importedInfo.drivers.length}
          vehiclesCount={importSummary.importedInfo.vehicles.length}
        />
      </div>

      {/* Sticky Warnings Bar */}
      {(unresolvedErrors.length > 0 || unresolvedWarnings.length > 0) && (
        <StickyWarningsBar
          errors={unresolvedErrors}
          warnings={unresolvedWarnings}
          onResolveAll={handleResolveAllWarnings}
          onDismissAll={handleDismissAllWarnings}
          onItemClick={handleItemClick}
          onScrollToWarnings={handleScrollToWarnings}
        />
      )}

      {/* Search */}
      <div className="flex flex-col gap-4">
        <ImportSummarySearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search items..."
        />
      </div>

      {/* Grouped Items - WARNINGS FIRST (Most Important) */}
      <div ref={warningsSectionRef} className="flex flex-col gap-6">
        {groupedItems.error.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">Action Required</h2>
            <ImportSummaryGroup
              severity="error"
              items={groupedItems.error}
              onItemClick={handleItemClick}
              onCheckboxChange={handleCheckboxChange}
              defaultExpanded={true}
              startIndex={0}
              onQuickResolve={handleQuickResolve}
              onQuickDismiss={handleQuickDismiss}
              showQuickActions={true}
            />
          </div>
        )}

        {groupedItems.warning.length > 0 && (
          <div className="space-y-2">
            {groupedItems.error.length === 0 && (
              <h2 className="text-lg font-bold text-foreground">Action Required</h2>
            )}
            <ImportSummaryGroup
              severity="warning"
              items={groupedItems.warning}
              onItemClick={handleItemClick}
              onCheckboxChange={handleCheckboxChange}
              defaultExpanded={true}
              startIndex={groupedItems.error.length}
              onQuickResolve={handleQuickResolve}
              onQuickDismiss={handleQuickDismiss}
              showQuickActions={true}
            />
          </div>
        )}

        {groupedItems.info.length > 0 && (
          <div className="space-y-2">
            {(groupedItems.error.length > 0 || groupedItems.warning.length > 0) && (
              <h2 className="text-lg font-bold text-foreground">Reference</h2>
            )}
            <ImportSummaryGroup
              severity="info"
              items={groupedItems.info}
              onItemClick={handleItemClick}
              onCheckboxChange={handleCheckboxChange}
              defaultExpanded={true}
              startIndex={groupedItems.error.length + groupedItems.warning.length}
              onQuickResolve={handleQuickResolve}
              onQuickDismiss={handleQuickDismiss}
              showQuickActions={true}
            />
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery.trim() 
                ? "No items match your search."
                : "No items to display."}
            </p>
          </div>
        )}
      </div>

      {/* Reference Information - Less Critical (Collapsed by Default) */}
      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Reference Information
        </h3>
        
        {/* Collapsible Imported Info */}
        <CollapsibleImportedInfo
          drivers={importSummary.importedInfo.drivers}
          vehicles={importSummary.importedInfo.vehicles}
          defaultOpen={false}
        />

        {/* Collapsible Timeline */}
        <CollapsibleTimeline events={timelineEvents} defaultOpen={false} />
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
