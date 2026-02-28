import type { JsonRecord } from "../upstream-schema.server";
import { getArrayAt, getFirstObjectArray, getRecordAt, getStringAt } from "../upstream-schema.server";

import type { ThirdPartyReportsSummary } from "@/shared/third-party-reports";

type ReportType = "financial-score" | "verify-coverage" | "verify-claims" | "mvr" | "car-report";
type ReportStatus = "completed" | "pending" | "failed";

function normalizeReportType(value: string | null | undefined): ReportType {
  const v = (value ?? "").trim().toLowerCase();
  switch (v) {
    case "financial-score":
    case "verify-coverage":
    case "verify-claims":
    case "mvr":
    case "car-report":
      return v;
    default:
      return "mvr";
  }
}

function normalizeReportStatus(value: string | null | undefined): ReportStatus {
  const v = (value ?? "").trim().toLowerCase();
  switch (v) {
    case "completed":
    case "pending":
    case "failed":
      return v;
    default:
      return "pending";
  }
}

export function optionalThirdPartyReports(root: JsonRecord): ThirdPartyReportsSummary | undefined {
  const obj =
    getRecordAt(root, ["thirdPartyReports"]) ??
    getRecordAt(root, ["third_party_reports"]) ??
    getRecordAt(root, ["reports"]);
  if (!obj) return undefined;

  const status = normalizeReportStatus(getStringAt(obj, ["status"]));
  const reportsRaw = getArrayAt(obj, ["reports"]);
  if (!reportsRaw) return undefined;

  const reports = getFirstObjectArray(reportsRaw)
    .map((r) => ({
      type: normalizeReportType(getStringAt(r, ["type"])),
      status: normalizeReportStatus(getStringAt(r, ["status"])),
      provider: getStringAt(r, ["provider"]) ?? undefined,
      findings: r["findings"],
      pendingReason: getStringAt(r, ["pendingReason"]) ?? getStringAt(r, ["pending_reason"]) ?? undefined,
    }))
    .filter((r) => Boolean(r.type) && Boolean(r.status));

  return { status, reports };
}

