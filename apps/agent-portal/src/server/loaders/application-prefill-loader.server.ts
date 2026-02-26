import { createApplicationApiClient, type ApplicationV2Response } from "@novo/api-client";

import { getApplicationServiceConfig } from "@/server/config";
import { applicationServiceConfigErrorToPortalError } from "@/server/config/config-errors.server";
import { buildApplicationPrefillViewModels, type PrefillApplication } from "@/shared/application-prefill-vm";

import { decodeInboundPayload } from "./decode-inbound-payload.server";

export type ApplicationPrefillResponse = {
  quoteId: string;
  applicationId: string;
  replaceLocalDraft: boolean;
  viewModels: ReturnType<typeof buildApplicationPrefillViewModels>;
};

export type ApplicationPrefillError =
  | { status: 400; code: "MALFORMED_PAYLOAD"; message: string }
  | { status: 403; code: "ACCESS_DENIED"; message: string }
  | { status: 429; code: "RATE_LIMITED"; message: string }
  | { status: 500; code: "UPSTREAM_UNREACHABLE"; message: string }
  | { status: 500; code: "UPSTREAM_ERROR"; message: string }
  | { status: 500; code: "UPSTREAM_SCHEMA_MISMATCH"; message: string }
  | { status: 500; code: "INTERNAL_ERROR"; message: string };

function extractApplicationId(value: ApplicationV2Response): string | null {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;

  const direct = v["applicationId"] ?? v["application_id"] ?? v["id"] ?? v["applicationID"];
  return typeof direct === "string" && direct.trim() ? direct : null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function getFirstObjectArray(value: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) return [];
  return value.map(asRecord).filter(Boolean) as Array<Record<string, unknown>>;
}

class UpstreamSchemaError extends Error {
  readonly code = "UPSTREAM_SCHEMA_MISMATCH";
  readonly missingPaths: string[];

  constructor(missingPaths: string[]) {
    super("Upstream response shape was unexpected.");
    this.name = "UpstreamSchemaError";
    this.missingPaths = missingPaths;
  }
}

function pathToString(path: ReadonlyArray<string>): string {
  return `$${path.length ? "." : ""}${path.join(".")}`;
}

function getRecordAt(root: Record<string, unknown>, path: ReadonlyArray<string>): Record<string, unknown> | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  return asRecord(cur);
}

function getStringAt(root: Record<string, unknown>, path: ReadonlyArray<string>): string | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  return typeof cur === "string" ? cur : null;
}

function getArrayAt(root: Record<string, unknown>, path: ReadonlyArray<string>): unknown[] | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  return Array.isArray(cur) ? cur : null;
}

function requiredString(root: Record<string, unknown>, path: ReadonlyArray<string>, missing: string[]): string {
  const v = getStringAt(root, path);
  if (typeof v === "string" && v.trim().length > 0) return v;
  missing.push(pathToString(path));
  return "";
}

function optionalString(root: Record<string, unknown>, path: ReadonlyArray<string>): string | undefined {
  const v = getStringAt(root, path);
  return typeof v === "string" ? v : undefined;
}

function normalizeApplication(
  input: ApplicationV2Response,
  fallback: { quoteId: string; applicationId: string },
): PrefillApplication {
  const root = asRecord(input);
  if (!root) throw new UpstreamSchemaError(["$"]);

  const missing: string[] = [];

  // Strictly prefer the upstream snake_case keys we observed.
  const applicationId = requiredString(root, ["application_id"], missing) || fallback.applicationId;
  const quoteId = fallback.quoteId;

  const applicant = getRecordAt(root, ["applicant"]);
  if (!applicant) missing.push("$.applicant");
  const applicantName = applicant ? getRecordAt(applicant, ["name"]) : null;
  if (!applicantName) missing.push("$.applicant.name");
  const applicantAddress = applicant ? getRecordAt(applicant, ["address"]) : null;
  if (!applicantAddress) missing.push("$.applicant.address");

  const driversRaw = getArrayAt(root, ["drivers"]);
  if (!driversRaw) missing.push("$.drivers");
  const vehiclesRaw = getArrayAt(root, ["vehicles"]);
  if (!vehiclesRaw) missing.push("$.vehicles");

  if (missing.length > 0) throw new UpstreamSchemaError(missing);

  const driversArr = (driversRaw ?? []).map(asRecord).filter(Boolean) as Array<Record<string, unknown>>;
  const vehiclesArr = (vehiclesRaw ?? []).map(asRecord).filter(Boolean) as Array<Record<string, unknown>>;

  return {
    applicationId,
    quoteId,
    applicant: {
      firstName: requiredString(applicantName!, ["first_name"], missing),
      lastName: requiredString(applicantName!, ["last_name"], missing),
      dateOfBirth: optionalString(applicant!, ["dob"]),
      email: optionalString(applicant!, ["email"]),
      phone: undefined,
      addressLine1: optionalString(applicantAddress!, ["address_line_1"]),
      city: optionalString(applicantAddress!, ["city"]),
      state: optionalString(applicantAddress!, ["state"]),
      zip: optionalString(applicantAddress!, ["zip"]),
    },
    drivers: driversArr.map((d) => {
      const driverMissing: string[] = [];
      const driverId = requiredString(d, ["driver_id"], driverMissing);
      const pd = getRecordAt(d, ["personal_detail"]);
      if (!pd) driverMissing.push("$.drivers[].personal_detail");
      const pdName = pd ? getRecordAt(pd, ["name"]) : null;
      if (!pdName) driverMissing.push("$.drivers[].personal_detail.name");
      const contact = getRecordAt(d, ["contact_info"]);
      const license = getRecordAt(d, ["license"]);
      if (driverMissing.length > 0) throw new UpstreamSchemaError(driverMissing);

      return {
        driverId,
        firstName: requiredString(pdName!, ["first_name"], driverMissing),
        lastName: requiredString(pdName!, ["last_name"], driverMissing),
        relationshipToPni: optionalString(d, ["relation_to_pni"]),
        dateOfBirth: optionalString(pd!, ["dob"]),
        gender: optionalString(pd!, ["gender"]),
        maritalStatus: optionalString(pd!, ["marital_status"]),
        email: contact ? optionalString(contact, ["email"]) : undefined,
        phone: contact ? optionalString(contact, ["phone"]) : undefined,
        licenseNumber: license ? optionalString(license, ["id"]) : undefined,
        licenseState: license ? optionalString(license, ["state"]) : undefined,
        licenseStatus: license ? optionalString(license, ["status"]) : undefined,
        yearsLicensed: undefined,
      };
    }),
    vehicles: vehiclesArr.map((v) => {
      const vehicleMissing: string[] = [];
      const vehicleId = requiredString(v, ["vehicle_id"], vehicleMissing);
      const description = getRecordAt(v, ["description"]);
      if (!description) vehicleMissing.push("$.vehicles[].description");
      const usage = getRecordAt(v, ["usage"]);
      const ownership = getRecordAt(v, ["ownership"]);
      if (vehicleMissing.length > 0) throw new UpstreamSchemaError(vehicleMissing);

      return {
        vehicleId,
        vin: optionalString(v, ["vin"]),
        year: description ? optionalString(description, ["year"]) : undefined,
        make: description ? optionalString(description, ["make"]) : undefined,
        model: description ? optionalString(description, ["model"]) : undefined,
        trim: description ? optionalString(description, ["style"]) : undefined,
        primaryUse: usage ? optionalString(usage, ["primary_use"]) : undefined,
        annualMileage: usage ? optionalString(usage, ["annual_mileage"]) : undefined,
        ownershipType: ownership ? optionalString(ownership, ["ownership_status"]) : undefined,
        ownershipLength: ownership ? optionalString(ownership, ["ownership_length"]) : undefined,
      };
    }),
  };
}

function isAxiosStatus(error: unknown, statuses: number[]): boolean {
  const anyErr = error as any;
  const status = anyErr?.response?.status;
  return typeof status === "number" && statuses.includes(status);
}

function getAxiosStatus(error: unknown): number | null {
  const anyErr = error as any;
  const status = anyErr?.response?.status;
  return typeof status === "number" ? status : null;
}

function getAxiosCode(error: unknown): string | null {
  const anyErr = error as any;
  const code = anyErr?.code;
  return typeof code === "string" ? code : null;
}

function ts(): string {
  return new Date().toISOString();
}

export async function loadApplicationPrefill(input: {
  encodedPayload: string;
  currentDraftId?: string;
}): Promise<{ ok: true; value: ApplicationPrefillResponse } | { ok: false; error: ApplicationPrefillError }> {
  const decoded = decodeInboundPayload(input.encodedPayload);
  if (!decoded.ok) {
    return {
      ok: false,
      error: { status: 400, code: "MALFORMED_PAYLOAD", message: "Invalid or malformed encoded payload." },
    };
  }

  const quoteId = decoded.value.policyId;

  const configResult = getApplicationServiceConfig();
  if (!configResult.ok) {
    // Fail closed: treat missing config as server error, but keep details portal-safe.
    throw applicationServiceConfigErrorToPortalError(configResult.error);
  }

  const client = createApplicationApiClient({
    baseUrl: configResult.value.endpoint.toString(),
    apiKey: configResult.value.apiKey,
    debugLogging: {
      enabled:
        process.env.APPLICATION_API_DEBUG_LOG === "1" ||
        process.env.APPLICATION_API_DEBUG_LOG === "true",
      level: (process.env.APPLICATION_API_DEBUG_LOG_LEVEL as any) ?? "basic",
      allowUnsafeBodyLogging:
        process.env.APPLICATION_API_DEBUG_LOG_UNSAFE_BODY === "1" ||
        process.env.APPLICATION_API_DEBUG_LOG_UNSAFE_BODY === "true",
    },
  });

  try {
    const lookup = await client.getApplicationV2({ quoteId });
    const applicationId = extractApplicationId(lookup) ?? quoteId;

    const applicationRaw = await client.getApplicationById({ applicationId });
    const application = normalizeApplication(applicationRaw, { quoteId, applicationId });

    const viewModels = buildApplicationPrefillViewModels(application);

    const replaceLocalDraft = Boolean(input.currentDraftId && input.currentDraftId !== quoteId);

    return {
      ok: true,
      value: {
        quoteId,
        applicationId,
        replaceLocalDraft,
        viewModels,
      },
    };
  } catch (error) {
    if (error instanceof UpstreamSchemaError) {
      console.error("Prefill upstream schema mismatch", { ts: ts(), missingPaths: error.missingPaths });
      return {
        ok: false,
        error: {
          status: 500,
          code: "UPSTREAM_SCHEMA_MISMATCH",
          message: "Upstream response shape was unexpected.",
        },
      };
    }

    const status = getAxiosStatus(error);
    const axiosCode = getAxiosCode(error);

    if (isAxiosStatus(error, [401, 403])) {
      return {
        ok: false,
        error: { status: 403, code: "ACCESS_DENIED", message: "Access denied." },
      };
    }

    if (status === 429) {
      return {
        ok: false,
        error: { status: 429, code: "RATE_LIMITED", message: "Rate limited. Please retry." },
      };
    }

    if (status === null && (axiosCode === "ENOTFOUND" || axiosCode === "ECONNREFUSED" || axiosCode === "EAI_AGAIN")) {
      console.error("Prefill upstream unreachable", { ts: ts(), axiosCode });
      return {
        ok: false,
        error: {
          status: 500,
          code: "UPSTREAM_UNREACHABLE",
          message: "Unable to reach the insurance service.",
        },
      };
    }

    if (status !== null) {
      console.error("Prefill upstream error", { ts: ts(), status });
      return {
        ok: false,
        error: {
          status: 500,
          code: "UPSTREAM_ERROR",
          message: "Failed to load application from the insurance service.",
        },
      };
    }

    console.error("Prefill unexpected error", { ts: ts(), axiosCode });
    return {
      ok: false,
      error: { status: 500, code: "INTERNAL_ERROR", message: "Unexpected error loading application." },
    };
  }
}

