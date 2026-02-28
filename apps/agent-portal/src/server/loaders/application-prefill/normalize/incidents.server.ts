import type { JsonPath, JsonRecord } from "../upstream-schema.server";
import { asRecord, getArrayAt, getStringAt } from "../upstream-schema.server";

import type { Incident } from "@/features/components/incidents/types";

function normalizeIncidentType(value: string | null | undefined): string {
  const v = (value ?? "").trim().toLowerCase();
  if (!v) return "";
  if (v.includes("accident") || v.includes("collision")) return "Accident";
  if (v.includes("violation") || v.includes("ticket")) return "Violation";
  if (v.includes("claim")) return "Claim";
  return "Other";
}

function normalizeIncidentSource(value: string | null | undefined): string {
  const v = (value ?? "").trim().toLowerCase();
  if (!v) return "Self Reported";
  if (v.includes("police")) return "Police Report";
  if (v.includes("carrier")) return "Carrier Reported";
  if (v.includes("self")) return "Self Reported";
  return "Other";
}

function normalizeMmDdYyyy(value: string | null | undefined): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const [yyyy, mm, dd] = v.split("-");
    return `${mm}/${dd}/${yyyy}`;
  }
  return v;
}

function getBoolAt(root: JsonRecord, path: JsonPath): boolean | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  if (typeof cur === "boolean") return cur;
  if (typeof cur === "string") {
    const t = cur.trim().toLowerCase();
    if (t === "true" || t === "yes" || t === "y" || t === "1") return true;
    if (t === "false" || t === "no" || t === "n" || t === "0") return false;
  }
  return null;
}

function toIncident(r: JsonRecord, quoteId: string, idx: number): Incident {
  const incidentType =
    getStringAt(r, ["incident_type"]) ??
    getStringAt(r, ["type"]) ??
    getStringAt(r, ["loss_type"]) ??
    null;

  const incidentDate =
    getStringAt(r, ["incident_date"]) ??
    getStringAt(r, ["date"]) ??
    getStringAt(r, ["loss_date"]) ??
    null;

  const source = getStringAt(r, ["source"]) ?? getStringAt(r, ["report_source"]) ?? null;
  const driverId = getStringAt(r, ["driver_id"]) ?? getStringAt(r, ["driverId"]) ?? "";

  return {
    id: `incident-${quoteId}-${idx + 1}`,
    incidentType: normalizeIncidentType(incidentType),
    incidentDate: normalizeMmDdYyyy(incidentDate),
    source: normalizeIncidentSource(source),
    driverId,
    totalDamagesOver1000: getBoolAt(r, ["total_damages_over_1000"]) ?? false,
    atFault: getBoolAt(r, ["at_fault"]) ?? false,
    policeReportFiled: getBoolAt(r, ["police_report_filed"]) ?? false,
  };
}

export function optionalIncidents(root: JsonRecord, quoteId: string): Incident[] | undefined {
  const candidates =
    getArrayAt(root, ["incidents"]) ??
    getArrayAt(root, ["incident"]) ??
    getArrayAt(root, ["accidents"]) ??
    getArrayAt(root, ["losses"]) ??
    null;

  if (!candidates) return undefined;

  const arr = candidates.map(asRecord).filter(Boolean) as JsonRecord[];
  if (arr.length === 0) return undefined;

  return arr.map((r, idx) => toIncident(r, quoteId, idx));
}

