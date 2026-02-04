"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle, CheckCircle2, ChevronDown } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { WorkflowStageGroup } from "./workflow-stage-group"
import { getWorkflowStage } from "./mock-ezlynx-data"
import { CoverageGapWizard } from "./coverage-gap-wizard"
import { ImportSummaryHeader } from "./import-summary-header"
import { TwoColumnLayout } from "./two-column-layout"
import { DisclosuresNotices } from "./disclosures-notices"

interface ImportSummaryProps {
  data?: ImportSummaryData
  quoteNumber?: string
}

export function ImportSummary({ data, quoteNumber }: ImportSummaryProps) {
  const { quoteData, updateImportSummaryItem, setCurrentStep, updateVehicles } = useQuote()
  const [selectedItem, setSelectedItem] = React.useState<ImportSummaryItem | null>(null)
  const [resolutionOption, setResolutionOption] = React.useState<string>("")

  const importSummary = data || quoteData.importSummary

  if (!importSummary) {
    return (
      <div className="mb-8 w-full text-center text-muted-foreground py-12">
        No import summary available
      </div>
    )
  }

  // Group items by workflow stage
  const groupedItems = React.useMemo(() => {
    const groups: {
      quote: ImportSummaryItem[]
      underwriting: ImportSummaryItem[]
      bind: ImportSummaryItem[]
    } = {
      quote: [],
      underwriting: [],
      bind: [],
    }

    importSummary.missingInfo.forEach((item) => {
      const stage = getWorkflowStage(item)
      if (groups[stage]) {
        groups[stage].push(item)
      }
    })

    return groups
  }, [importSummary.missingInfo])

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

  const handleVINSave = React.useCallback(
    async (vin: string) => {
      // Find the item to get vehicle ID
      const item = importSummary.missingInfo.find(
        (i) => i.details?.type === "missing-vin"
      )
      
      const vehicleId = item?.details?.data?.vehicleId
      if (vehicleId && quoteData.vehicles) {
        // Update the vehicle VIN
        const updatedVehicles = quoteData.vehicles.map((vehicle) =>
          vehicle.id === vehicleId
            ? { ...vehicle, vin }
            : vehicle
        )
        updateVehicles(updatedVehicles)
      }
    },
    [importSummary.missingInfo, quoteData.vehicles, updateVehicles]
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

  const unresolvedItems = React.useMemo(
    () => importSummary.missingInfo.filter((item) => !item.checked),
    [importSummary.missingInfo]
  )

  const hasDriverAlert = React.useCallback(
    (driverName: string) =>
      unresolvedItems.some(
        (item) =>
          item.relatedSection === "driver" &&
          (!item.details?.data?.driverName ||
            item.details.data.driverName === driverName)
      ),
    [unresolvedItems]
  )

  const hasVehicleAlert = React.useCallback(
    (vehicleLabel: string) =>
      unresolvedItems.some(
        (item) =>
          item.relatedSection === "vehicle" &&
          (!item.details?.data?.vehicleName ||
            item.details.data.vehicleName === vehicleLabel)
      ),
    [unresolvedItems]
  )


  return (
    <div className="mb-8 flex w-full flex-col gap-6">
      {/* Compact Header Bar */}
      <ImportSummaryHeader
        quoteNumber={quoteNumber || quoteData.ezlynxQuoteNumber || "KBD78E7747"}
        primaryAddress={quoteData.clientInfo?.address || "5211 S McQueen Rd, Chandler, AZ 85249"}
        premiumEstimate={importSummary.premiumEstimate}
        thirdPartyReports={importSummary.thirdPartyReports}
      />

      {/* Two-Column Layout */}
      <TwoColumnLayout
        leftColumn={
          <>
            <div className="space-y-6">
              {/* Action Required Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-foreground">Action Required</h2>

                {/* Grouped Items by Workflow Stage */}
                <div className="flex flex-col gap-6">
                {/* Needed for Quote */}
                {groupedItems.quote.length > 0 && (
                  <WorkflowStageGroup
                    stage="quote"
                    items={groupedItems.quote}
                    onItemClick={handleItemClick}
                    onCheckboxChange={handleCheckboxChange}
                    defaultExpanded={true}
                    startIndex={0}
                    onQuickResolve={handleQuickResolve}
                    onQuickDismiss={handleQuickDismiss}
                    showQuickActions={true}
                    onVINSave={handleVINSave}
                  />
                )}

                {/* Needed for Underwriting */}
                {groupedItems.underwriting.length > 0 && (
                  <WorkflowStageGroup
                    stage="underwriting"
                    items={groupedItems.underwriting}
                    onItemClick={handleItemClick}
                    onCheckboxChange={handleCheckboxChange}
                    defaultExpanded={true}
                    startIndex={groupedItems.quote.length}
                    onQuickResolve={handleQuickResolve}
                    onQuickDismiss={handleQuickDismiss}
                    showQuickActions={true}
                    onVINSave={handleVINSave}
                  />
                )}

                {/* Needed for Bind */}
                {groupedItems.bind.length > 0 && (
                  <WorkflowStageGroup
                    stage="bind"
                    items={groupedItems.bind}
                    onItemClick={handleItemClick}
                    onCheckboxChange={handleCheckboxChange}
                    defaultExpanded={true}
                    startIndex={groupedItems.quote.length + groupedItems.underwriting.length}
                    onQuickResolve={handleQuickResolve}
                    onQuickDismiss={handleQuickDismiss}
                    showQuickActions={true}
                    onVINSave={handleVINSave}
                  />
                )}

                {/* Show "All requirements met" if all stages are empty */}
                {groupedItems.quote.length === 0 &&
                  groupedItems.underwriting.length === 0 &&
                  groupedItems.bind.length === 0 && (
                    <div className="rounded-lg border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 p-8 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-green-900 dark:text-green-100 mb-1">
                        All requirements met
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Ready to proceed with quote generation
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        }
        rightColumn={
          <>
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground">Drivers</h3>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="divide-y divide-border">
                  {quoteData.drivers?.map((driver, index) => {
                    const driverName = `${driver.firstName} ${driver.lastName}`.trim()
                    const isPrimary = index === 0
                    return (
                      <div key={driver.id} className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-1 items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground">
                              {driver.firstName?.[0]}
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {driverName}
                            </span>
                          </div>
                          {hasDriverAlert(driverName) && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">
                            {isPrimary ? "Primary Insured" : "Covered Driver"}
                          </Badge>
                          {driver.dateOfBirth && (
                            <Badge variant="secondary">
                              {new Date(driver.dateOfBirth).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </Badge>
                          )}
                          <Badge variant="secondary">Verified</Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground">Vehicles</h3>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="divide-y divide-border">
                  {quoteData.vehicles?.map((vehicle) => {
                    const vehicleLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.trim()
                    return (
                      <div key={vehicle.id} className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-1 items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground">
                              {vehicle.make?.[0]}
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {vehicleLabel}
                            </span>
                          </div>
                          {hasVehicleAlert(vehicleLabel) && (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">Clean Title</Badge>
                          <Badge variant="secondary">Carfax</Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <DisclosuresNotices />

            </div>
          </>
        }
      />

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
