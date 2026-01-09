"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, Info, X, CheckCircle } from "lucide-react"
import { useQuote } from "@/app/contexts/quote-context"
import { cn } from "@/lib/utils"
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

interface ImportSummaryProps {
  data?: ImportSummaryData
}

export function ImportSummary({ data }: ImportSummaryProps) {
  const { quoteData, updateImportSummaryItem, setCurrentStep } = useQuote()
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

  const handleItemClick = React.useCallback((item: ImportSummaryItem) => {
    if (item.details?.type === "coverage-gap" || item.details?.type === "accident-history") {
      setSelectedItem(item)
      setResolutionOption("")
    } else if (item.relatedSection) {
      // Navigate to related section
      setCurrentStep(item.relatedSection).catch((error) => {
        console.error("Failed to navigate:", error)
      })
    }
  }, [setCurrentStep])

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    updateImportSummaryItem?.(itemId, checked)
  }

  const handleResolveCoverageGap = () => {
    if (selectedItem) {
      updateImportSummaryItem?.(selectedItem.id, true)
      setSelectedItem(null)
    }
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setResolutionOption("")
  }

  const getSeverityIcon = (severity: ImportSummaryItem["severity"]) => {
    switch (severity) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const coverageGapData = selectedItem?.details?.type === "coverage-gap" ? selectedItem.details.data : null
  const accidentHistoryData = selectedItem?.details?.type === "accident-history" ? selectedItem.details.data : null

  return (
    <div className="mb-8 flex w-full gap-6">
      {/* Left Panel */}
      <div className="flex flex-1 flex-col gap-6">
        {/* Imported Info Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2
            className="mb-4 text-lg font-semibold text-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Imported info
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-foreground">
                {importSummary.importedInfo.drivers.length} Drivers:{" "}
              </span>
              <span className="text-muted-foreground">
                {importSummary.importedInfo.drivers.map((d) => d.name).join(", ")}
              </span>
            </div>
            <div>
              <span className="font-medium text-foreground">
                {importSummary.importedInfo.vehicles.length} Vehicle:{" "}
              </span>
              <span className="text-muted-foreground">
                {importSummary.importedInfo.vehicles
                  .map((v) => `${v.year} ${v.make} ${v.model}`)
                  .join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* Missing Quote Info Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2
            className="mb-4 text-lg font-semibold text-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Missing quote info
          </h2>
          <div className="space-y-3">
            {importSummary.missingInfo.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 rounded-md p-3 transition-colors",
                  item.checked
                    ? "bg-muted/50 opacity-60"
                    : "hover:bg-muted/30 cursor-pointer"
                )}
                onClick={() => !item.checked && handleItemClick(item)}
              >
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(item.id, checked as boolean)
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex flex-1 items-center gap-2">
                  {getSeverityIcon(item.severity)}
                  <span
                    className={cn(
                      "text-sm",
                      item.checked
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    )}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Coverage Gap Modal */}
      {selectedItem?.details?.type === "coverage-gap" && coverageGapData && (
        <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Coverage Gap Detected - {quoteData.clientInfo?.firstName}{" "}
                {quoteData.clientInfo?.lastName}
              </DialogTitle>
              <DialogDescription>
                Review the coverage gap discrepancy and select a resolution option.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Report Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Report Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Gap Period:</span>{" "}
                    {new Date(coverageGapData.gapPeriod.start).toLocaleDateString()} -{" "}
                    {new Date(coverageGapData.gapPeriod.end).toLocaleDateString()} (
                    {coverageGapData.gapPeriod.days} days)
                  </p>
                  <p>
                    <span className="font-medium">Previous Carrier:</span>{" "}
                    {coverageGapData.previousCarrier}
                  </p>
                  <p>
                    <span className="font-medium">Current Carrier:</span>{" "}
                    {coverageGapData.currentCarrier} (Started{" "}
                    {new Date(coverageGapData.currentCarrierStart).toLocaleDateString()})
                  </p>
                </div>
              </div>

              {/* Discrepancy */}
              <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Discrepancy Detected
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Application states:</span>{" "}
                    "{coverageGapData.applicationStates}"
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Verisk RC2 report shows:</span>{" "}
                    {coverageGapData.reportShows}
                  </p>
                </div>
              </div>

              {/* Rate Impact */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Rate Impact</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current rate (with gap)</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${coverageGapData.rateImpact.current.toLocaleString()}/6mo
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Potential rate (if resolved)</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      ${coverageGapData.rateImpact.potential.toLocaleString()}/6mo
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Savings if resolved</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      ${Math.abs(coverageGapData.rateImpact.savings)}/6mo
                    </p>
                  </div>
                </div>
              </div>

              {/* Resolution Options */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Resolution Options</h3>
                <RadioGroup value={resolutionOption} onValueChange={setResolutionOption}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                      <RadioGroupItem value="provide-proof" id="provide-proof" />
                      <div className="flex-1">
                        <Label htmlFor="provide-proof" className="cursor-pointer font-medium">
                          Provide proof of coverage
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Upload declarations page or certificate showing coverage
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 h-auto p-0 text-sm"
                          onClick={() => {
                            // TODO: Implement file upload
                            console.log("Upload documents")
                          }}
                        >
                          [Upload Documents]
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                      <RadioGroupItem value="confirm-gap" id="confirm-gap" />
                      <div className="flex-1">
                        <Label htmlFor="confirm-gap" className="cursor-pointer font-medium">
                          Confirm gap is accurate
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Proceed with current rating
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                      <RadioGroupItem value="manual-review" id="manual-review" />
                      <div className="flex-1">
                        <Label htmlFor="manual-review" className="cursor-pointer font-medium">
                          Request manual review
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Escalate to underwriting for override consideration
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 h-auto p-0 text-sm"
                          onClick={() => {
                            // TODO: Implement note for underwriter
                            console.log("Add note for underwriter")
                          }}
                        >
                          [Add Note for Underwriter]
                        </Button>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t pt-4">
                <Button variant="ghost" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Full Report PDF ↓</Button>
                  <Button
                    onClick={handleResolveCoverageGap}
                    disabled={!resolutionOption}
                  >
                    Submit & Close
                  </Button>
                </div>
              </div>
            </div>
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
