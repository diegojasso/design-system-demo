export type ThirdPartyReportType =
  | "financial-score"
  | "verify-coverage"
  | "verify-claims"
  | "mvr"
  | "car-report"

export type ThirdPartyReportStatus = "completed" | "pending" | "failed"

export type ThirdPartyReport = {
  type: ThirdPartyReportType
  status: ThirdPartyReportStatus
  provider?: string
  findings?: unknown
  pendingReason?: string
}

export type ThirdPartyReportsSummary = {
  status: ThirdPartyReportStatus
  reports: ThirdPartyReport[]
}

