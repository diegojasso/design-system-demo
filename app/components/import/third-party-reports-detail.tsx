"use client"

import * as React from "react"
import { ChevronDown, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  const [isOpen, setIsOpen] = React.useState(false)

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
  const totalCount = reports.length

  // Determine status badge based on progress
  const getProgressStatus = () => {
    if (completedCount === totalCount) return "completed"
    if (failedCount > 0) return "failed"
    return "completed"
  }

  const progressStatus = getProgressStatus()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-auto p-0 gap-1.5 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start w-fit",
            className
          )}
          aria-label="View third-party reports details"
          aria-expanded={isOpen}
        >
          <Badge
            className={cn(
              "text-[10px] font-semibold cursor-pointer transition-opacity hover:opacity-80",
              progressStatus === "completed"
                ? "border-green-500 bg-green-500 text-white"
                : progressStatus === "failed"
                  ? "border-destructive bg-destructive text-white"
                  : "border-amber-500 bg-amber-500 text-white"
            )}
          >
            {completedCount}/{totalCount} {progressStatus === "completed" ? "Completed" : progressStatus === "failed" ? "Failed" : "Pending"}
          </Badge>
          <ChevronDown
            className={cn(
              "h-3 w-3 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-80 p-0"
      >
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              3rd Party Reports
            </h3>
          </div>

          {/* Reports List */}
          <div className="space-y-2">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 py-1.5 text-xs"
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {getStatusIcon(report.status)}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-foreground font-medium">
                      {REPORT_TYPE_LABELS[report.type] || report.type}
                    </span>
                    {report.provider && (
                      <span className="text-muted-foreground text-[10px]">
                        {report.provider}
                      </span>
                    )}
                    {report.pendingReason && (
                      <span className="text-muted-foreground text-[10px]">
                        {report.pendingReason}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(report.status)}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary */}
          {completedCount > 0 && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {completedCount} report{completedCount !== 1 ? "s" : ""} completed
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
