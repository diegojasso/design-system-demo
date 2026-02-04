"use client"

import * as React from "react"
import { Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ImportSummaryData } from "./mock-ezlynx-data"
import { ThirdPartyReportsDetail } from "./third-party-reports-detail"

interface ImportSummaryHeaderProps {
  quoteNumber: string
  primaryAddress: string
  premiumEstimate?: ImportSummaryData["premiumEstimate"]
  thirdPartyReports: ImportSummaryData["thirdPartyReports"]
  className?: string
}

const REPORT_TYPE_LABELS: Record<string, string> = {
  "financial-score": "Financial Score",
  "verify-coverage": "Verify Coverage",
  "verify-claims": "Verify Claims",
  "mvr": "MVR",
  "car-report": "Car Report (Carfax)",
}

export function ImportSummaryHeader({
  quoteNumber,
  primaryAddress,
  premiumEstimate,
  thirdPartyReports,
  className,
}: ImportSummaryHeaderProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quoteNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const formatPremium = () => {
    if (!premiumEstimate) return "N/A"
    const currency = premiumEstimate.currency || "USD"
    const symbol = currency === "USD" ? "$" : ""
    return `${symbol}${premiumEstimate.monthly}/mo`
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 xl:grid-cols-5",
        className
      )}
    >
      {/* Premium Estimate */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          Premium Estimate
        </span>
        <span className="text-sm font-semibold text-foreground">
          {formatPremium()}
        </span>
      </div>

      {/* Quote Number */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          Quote Number
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {quoteNumber}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0"
            aria-label="Copy quote number"
          >
            {copied ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Primary Address */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          Primary Address
        </span>
        <span className="text-sm text-foreground">{primaryAddress}</span>
      </div>

      {/* Third Party Reports */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          3rd Party Reports
        </span>
        <ThirdPartyReportsDetail
          reports={thirdPartyReports.reports}
          overallStatus={thirdPartyReports.status}
        />
      </div>
    </div>
  )
}
