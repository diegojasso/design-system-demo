"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const REPORT_TYPE_LABELS: Record<string, string> = {
  "financial-score": "Financial Score",
  "verify-coverage": "Verify Coverage",
  "verify-claims": "Verify Claims",
  "mvr": "MVR",
  "car-report": "Car Report (Carfax)",
}

interface ThirdPartyReport {
  type: "financial-score" | "verify-coverage" | "verify-claims" | "mvr" | "car-report"
  status: "completed" | "pending" | "failed"
  provider?: string
  findings?: any
  pendingReason?: string
}

interface ThirdPartyReportsDetailProps {
  reports: ThirdPartyReport[]
  overallStatus: "completed" | "pending" | "failed"
  className?: string
}

export function ThirdPartyReportsDetail({
  reports,
  overallStatus,
  className,
}: ThirdPartyReportsDetailProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="border-green-500 bg-green-500 text-white text-[10px] font-semibold">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="border-amber-500 bg-amber-500 text-white text-[10px] font-semibold">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge
            variant="destructive"
            className="text-[10px] font-semibold"
          >
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
        )
      case "pending":
        return (
          <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
        )
      case "failed":
        return <XCircle className="h-3.5 w-3.5 text-destructive" />
      default:
        return null
    }
  }

  const completedCount = reports.filter((r) => r.status === "completed").length
  const pendingCount = reports.filter((r) => r.status === "pending").length
  const failedCount = reports.filter((r) => r.status === "failed").length

  return (
    <div className={cn("space-y-2", className)}>
      {/* Summary Badge */}
      <div className="flex items-center gap-2">
        {getStatusBadge(overallStatus)}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-2 space-y-2 rounded-md border border-border bg-muted/30 p-3 animate-in fade-in-0 slide-in-from-top-2">
          <div className="space-y-1.5">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.status)}
                  <span className="text-foreground">
                    {REPORT_TYPE_LABELS[report.type] || report.type}
                  </span>
                  {report.provider && (
                    <span className="text-muted-foreground">
                      ({report.provider})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                  {report.pendingReason && (
                    <span className="text-muted-foreground">
                      {report.pendingReason}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {pendingCount > 0 && (
            <div className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground">
              {pendingCount} report{pendingCount !== 1 ? "s" : ""} pending
            </div>
          )}
        </div>
      )}
    </div>
  )
}
