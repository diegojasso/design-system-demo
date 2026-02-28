import type { ApplicationV2Response } from "@novo/api-client";

import type { PrefillApplication } from "@/shared/application-prefill-vm";

import type { JsonRecord } from "../upstream-schema.server";
import {
  UpstreamSchemaError,
  asRecord,
  getArrayAt,
  getRecordAt,
  optionalString,
  requiredString,
} from "../upstream-schema.server";
import { optionalIncidents } from "./incidents.server";
import { optionalFirstPhoneFromArray } from "./phone.server";
import { optionalThirdPartyReports } from "./reports.server";

type NormalizeFallback = { quoteId: string; applicationId: string };

function requireCoreArrays(root: JsonRecord, missing: string[]): { drivers: JsonRecord[]; vehicles: JsonRecord[] } {
  const driversRaw = getArrayAt(root, ["drivers"]);
  if (!driversRaw) missing.push("$.drivers");
  const vehiclesRaw = getArrayAt(root, ["vehicles"]);
  if (!vehiclesRaw) missing.push("$.vehicles");

  const drivers = (driversRaw ?? []).map(asRecord).filter(Boolean) as JsonRecord[];
  const vehicles = (vehiclesRaw ?? []).map(asRecord).filter(Boolean) as JsonRecord[];
  return { drivers, vehicles };
}

function getApplicantRecords(root: JsonRecord, missing: string[]) {
  const applicant = getRecordAt(root, ["applicant"]);
  if (!applicant) missing.push("$.applicant");
  const applicantName = applicant ? getRecordAt(applicant, ["name"]) : null;
  if (!applicantName) missing.push("$.applicant.name");
  const applicantAddress = applicant ? getRecordAt(applicant, ["address"]) : null;
  if (!applicantAddress) missing.push("$.applicant.address");
  return { applicant, applicantName, applicantAddress };
}

function readApplicantEmail(root: JsonRecord, applicant: JsonRecord): string | undefined {
  return (
    optionalString(applicant, ["email"]) ??
    optionalString(applicant, ["email_address"]) ??
    optionalString(applicant, ["primary_email"]) ??
    optionalString(applicant, ["contact_info", "email"]) ??
    optionalString(applicant, ["contact_info", "email_address"]) ??
    optionalString(applicant, ["contact_info", "primary_email"]) ??
    optionalString(applicant, ["contact", "email"]) ??
    optionalString(root, ["contact_info", "email"]) ??
    optionalString(root, ["contact_info", "email_address"])
  );
}

function readApplicantPhone(root: JsonRecord, applicant: JsonRecord): string | undefined {
  return (
    optionalString(applicant, ["phone"]) ??
    optionalString(applicant, ["phone_number"]) ??
    optionalString(applicant, ["phoneNumber"]) ??
    optionalString(applicant, ["primary_phone"]) ??
    optionalString(applicant, ["primary_phone_number"]) ??
    optionalString(applicant, ["mobile_phone"]) ??
    optionalString(applicant, ["cell_phone"]) ??
    optionalString(applicant, ["contact_info", "phone"]) ??
    optionalString(applicant, ["contact_info", "phone_number"]) ??
    optionalString(applicant, ["contact_info", "phoneNumber"]) ??
    optionalString(applicant, ["contact_info", "phone", "number"]) ??
    optionalString(applicant, ["contact_info", "mobile_phone", "number"]) ??
    optionalString(applicant, ["contact_info", "mobile_phone"]) ??
    optionalString(applicant, ["contact_info", "cell_phone"]) ??
    optionalString(applicant, ["contact_info", "primary_phone"]) ??
    optionalString(applicant, ["contact_info", "primary_phone_number"]) ??
    optionalString(applicant, ["contact", "phone"]) ??
    optionalString(applicant, ["contact", "phone_number"]) ??
    optionalString(applicant, ["contact", "primary_phone"]) ??
    optionalString(root, ["contact_info", "phone"]) ??
    optionalString(root, ["contact_info", "primary_phone"]) ??
    optionalFirstPhoneFromArray(applicant, ["phone"]) ??
    optionalFirstPhoneFromArray(applicant, ["phones"]) ??
    optionalFirstPhoneFromArray(applicant, ["phone_numbers"]) ??
    optionalFirstPhoneFromArray(applicant, ["contact_info", "phones"]) ??
    optionalFirstPhoneFromArray(applicant, ["contact_info", "phone_numbers"])
  );
}

function toDriverRecord(d: JsonRecord): PrefillApplication["drivers"][number] {
  const missing: string[] = [];
  const driverId = requiredString(d, ["driver_id"], missing);
  const pd = getRecordAt(d, ["personal_detail"]);
  if (!pd) missing.push("$.drivers[].personal_detail");
  const pdName = pd ? getRecordAt(pd, ["name"]) : null;
  if (!pdName) missing.push("$.drivers[].personal_detail.name");

  const contact = getRecordAt(d, ["contact_info"]);
  const license = getRecordAt(d, ["license"]);
  if (missing.length > 0) throw new UpstreamSchemaError(missing);

  const phone =
    (contact
      ? optionalString(contact, ["phone"]) ??
        optionalString(contact, ["phone_number"]) ??
        optionalString(contact, ["phoneNumber"]) ??
        optionalString(contact, ["phone", "number"]) ??
        optionalString(contact, ["mobile_phone"]) ??
        optionalString(contact, ["cell_phone"]) ??
        optionalString(contact, ["primary_phone"]) ??
        optionalFirstPhoneFromArray(contact, ["phone"]) ??
        optionalFirstPhoneFromArray(contact, ["phones"]) ??
        optionalFirstPhoneFromArray(contact, ["phone_numbers"])
      : undefined) ?? undefined;

  const email =
    contact
      ? optionalString(contact, ["email"]) ??
        optionalString(contact, ["email_address"]) ??
        optionalString(contact, ["primary_email"])
      : undefined;

  return {
    driverId,
    firstName: requiredString(pdName!, ["first_name"], missing),
    lastName: requiredString(pdName!, ["last_name"], missing),
    relationshipToPni: optionalString(d, ["relation_to_pni"]),
    dateOfBirth: pd ? optionalString(pd, ["dob"]) : undefined,
    gender: pd ? optionalString(pd, ["gender"]) : undefined,
    maritalStatus: pd ? optionalString(pd, ["marital_status"]) : undefined,
    email,
    phone,
    licenseNumber: license ? optionalString(license, ["id"]) : undefined,
    licenseState: license ? optionalString(license, ["state"]) : undefined,
    licenseStatus: license ? optionalString(license, ["status"]) : undefined,
    yearsLicensed: undefined,
  };
}

function toVehicleRecord(v: JsonRecord): PrefillApplication["vehicles"][number] {
  const missing: string[] = [];
  const vehicleId = requiredString(v, ["vehicle_id"], missing);
  const description = getRecordAt(v, ["description"]);
  if (!description) missing.push("$.vehicles[].description");
  const usage = getRecordAt(v, ["usage"]);
  const ownership = getRecordAt(v, ["ownership"]);
  if (missing.length > 0) throw new UpstreamSchemaError(missing);

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
}

export function normalizeApplication(input: ApplicationV2Response, fallback: NormalizeFallback): PrefillApplication {
  const root = asRecord(input);
  if (!root) throw new UpstreamSchemaError(["$"]);

  const missing: string[] = [];
  const applicationId = requiredString(root, ["application_id"], missing) || fallback.applicationId;
  const quoteId = fallback.quoteId;
  const participationOption = optionalString(root, ["participation_option"]);

  const { applicant, applicantName, applicantAddress } = getApplicantRecords(root, missing);
  const { drivers, vehicles } = requireCoreArrays(root, missing);
  if (missing.length > 0) throw new UpstreamSchemaError(missing);

  return {
    applicationId,
    quoteId,
    applicant: {
      firstName: requiredString(applicantName!, ["first_name"], missing),
      lastName: requiredString(applicantName!, ["last_name"], missing),
      dateOfBirth: applicant ? optionalString(applicant, ["dob"]) : undefined,
      email: applicant ? readApplicantEmail(root, applicant) : undefined,
      phone: applicant ? readApplicantPhone(root, applicant) : undefined,
      addressLine1: applicantAddress ? optionalString(applicantAddress, ["address_line_1"]) : undefined,
      city: applicantAddress ? optionalString(applicantAddress, ["city"]) : undefined,
      state: applicantAddress ? optionalString(applicantAddress, ["state"]) : undefined,
      zip: applicantAddress ? optionalString(applicantAddress, ["zip"]) : undefined,
    },
    drivers: drivers.map(toDriverRecord),
    vehicles: vehicles.map(toVehicleRecord),
    incidents: optionalIncidents(root, quoteId),
    reports: optionalThirdPartyReports(root),
    quote: root["quote"] as any,
    participationOption,
  };
}

