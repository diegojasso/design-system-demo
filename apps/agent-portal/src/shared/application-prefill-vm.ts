import type { ClientInfoFormValues } from "@/app/quote-context";
import type { Driver } from "@/features/components/drivers-table/types";
import type { Vehicle } from "@/features/components/vehicles-table/types";

export type PrefillApplicant = {
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | Date | null;
  email?: string | null;
  phone?: string | null;
  addressLine1?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
};

export type PrefillDriverRecord = {
  driverId: string;
  firstName?: string | null;
  lastName?: string | null;
  relationshipToPni?: string | null;
  dateOfBirth?: string | Date | null;
  gender?: string | null;
  maritalStatus?: string | null;
  email?: string | null;
  phone?: string | null;
  licenseNumber?: string | null;
  licenseState?: string | null;
  licenseStatus?: string | null;
  yearsLicensed?: string | number | null;
};

export type PrefillVehicleRecord = {
  vehicleId: string;
  vin?: string | null;
  year?: string | number | null;
  make?: string | null;
  model?: string | null;
  trim?: string | null;
  primaryUse?: string | null;
  annualMileage?: string | number | null;
  ownershipType?: string | null;
  ownershipLength?: string | null;
};

export type PrefillApplication = {
  applicationId: string;
  quoteId: string;
  applicant: PrefillApplicant;
  drivers: PrefillDriverRecord[];
  vehicles: PrefillVehicleRecord[];
};

export type ApplicationPrefillViewModels = {
  basicInfo: ClientInfoFormValues;
  drivers: Driver[];
  vehicles: Vehicle[];
};

function toDate(value: string | Date | null | undefined): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  // Fallback to a stable valid date (prevents UI crashes on invalid Date objects).
  return new Date("1990-01-01");
}

function toIsoDate(value: string | Date | null | undefined): string {
  const d = toDate(value);
  return d.toISOString().slice(0, 10);
}

function toString(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

function joinAddress(applicant: PrefillApplicant): string {
  const parts = [
    applicant.addressLine1 ?? "",
    [applicant.city ?? "", applicant.state ?? "", applicant.zip ?? ""].filter(Boolean).join(", "),
  ].filter((p) => p.trim().length > 0);

  return parts.join(", ");
}

export function buildApplicationPrefillViewModels(application: PrefillApplication): ApplicationPrefillViewModels {
  const primaryDriver = application.drivers[0];

  const basicInfo: ClientInfoFormValues = {
    firstName: application.applicant.firstName ?? "",
    lastName: application.applicant.lastName ?? "",
    dateOfBirth: toDate(application.applicant.dateOfBirth),
    driversLicense: primaryDriver?.licenseNumber ?? undefined,
    driversLicenseState: primaryDriver?.licenseState ?? undefined,
    email: application.applicant.email ?? "",
    phone: application.applicant.phone ?? primaryDriver?.phone ?? "",
    address: joinAddress(application.applicant),
  };

  const drivers: Driver[] = application.drivers.map((d) => ({
    id: d.driverId,
    firstName: d.firstName ?? "",
    lastName: d.lastName ?? "",
    relationship: d.relationshipToPni ?? "",
    dateOfBirth: toIsoDate(d.dateOfBirth),
    gender: d.gender ?? "",
    maritalStatus: d.maritalStatus ?? "",
    email: d.email ?? "",
    phone: d.phone ?? "",
    includeInPolicy: true,
    licenseNumber: d.licenseNumber ?? "",
    licenseState: d.licenseState ?? "",
    licenseStatus: d.licenseStatus ?? "",
    yearsLicensed: toString(d.yearsLicensed),
  }));

  const vehicles: Vehicle[] = application.vehicles.map((v) => ({
    id: v.vehicleId,
    vin: v.vin ?? "",
    year: toString(v.year),
    make: v.make ?? "",
    model: v.model ?? "",
    trim: v.trim ?? "",
    primaryUse: v.primaryUse ?? "",
    annualMileage: toString(v.annualMileage),
    ownershipType: v.ownershipType ?? "",
    ownershipLength: v.ownershipLength ?? "",
    garagingZipSame: "",
  }));

  return { basicInfo, drivers, vehicles };
}

