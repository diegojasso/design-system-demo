"use client"

import * as React from "react"
import { Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@novo/ui"
import { cn } from "@/shared/utils"
import { useMessages } from "@/shared/hooks/use-messages"
import type { ImportSummaryData } from "./mock-ezlynx-data"
import { ThirdPartyReportsDetail } from "./third-party-reports-detail"

interface ImportSummaryHeaderProps {
  quoteNumber: string
  primaryAddress: string
  premiumEstimate?: ImportSummaryData["premiumEstimate"]
  thirdPartyReports: ImportSummaryData["thirdPartyReports"]
  className?: string
}

export function ImportSummaryHeader({
  quoteNumber,
  primaryAddress,
  premiumEstimate,
  thirdPartyReports,
  className,
}: ImportSummaryHeaderProps) {
  const t = useMessages()
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
    if (!premiumEstimate) return t("import-summary.header.premium-unavailable")
    const currency = premiumEstimate.currency || "USD"
    const symbol = currency === "USD" ? "$" : ""
    return `${symbol}${premiumEstimate.monthly}/mo`
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {/* Premium Estimate */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          {t("import-summary.header.premium-estimate")}
        </span>
        <span
          className="text-lg font-bold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatPremium()}
        </span>
      </div>

      {/* Quote Number */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          {t("import-summary.header.quote-number")}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-bold text-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {quoteNumber}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0"
            aria-label={t("import-summary.header.copy-quote-number")}
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
          {t("import-summary.header.primary-address")}
        </span>
        <span
          className="text-sm text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {primaryAddress}
        </span>
      </div>

      {/* Third Party Reports */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">
          {t("import-summary.header.third-party-reports")}
        </span>
        <ThirdPartyReportsDetail
          reports={thirdPartyReports.reports}
          overallStatus={thirdPartyReports.status}
        />
      </div>
    </div>
  )
}
