import type { ClientInfoFormValues } from "@/app/quote-context";
import type { Driver } from "@/features/components/drivers-table/types";
import type { Vehicle } from "@/features/components/vehicles-table/types";

import { formatUsPhone, joinAddress, toDate, toIsoDate, toString } from "./formatters";
import { mapQuoteResponseToCoverageAndPricing } from "./quote/map-quote";
import type { ApplicationPrefillViewModels, PrefillApplication } from "./types";

function buildBasicInfo(application: PrefillApplication): ClientInfoFormValues {
  const primaryDriver = application.drivers[0];

  return {
    firstName: application.applicant.firstName ?? "",
    lastName: application.applicant.lastName ?? "",
    dateOfBirth: toDate(application.applicant.dateOfBirth),
    // Keep inputs controlled in the UI by defaulting to empty strings.
    driversLicense: primaryDriver?.licenseNumber ?? "",
    driversLicenseState: primaryDriver?.licenseState ?? undefined,
    email: application.applicant.email ?? "",
    phone: formatUsPhone(application.applicant.phone ?? primaryDriver?.phone ?? ""),
    address: joinAddress(application.applicant),
  };
}

function buildDrivers(application: PrefillApplication): Driver[] {
  return application.drivers.map((d) => ({
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
}

function buildVehicles(application: PrefillApplication): Vehicle[] {
  return application.vehicles.map((v) => ({
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
}

export function buildApplicationPrefillViewModels(application: PrefillApplication): ApplicationPrefillViewModels {
  const basicInfo = buildBasicInfo(application);
  const drivers = buildDrivers(application);
  const vehicles = buildVehicles(application);

  const fromQuote = mapQuoteResponseToCoverageAndPricing(application.quote, application.participationOption);

  return {
    basicInfo,
    drivers,
    vehicles,
    incidents: application.incidents,
    reports: application.reports,
    coverage: fromQuote.coverage,
    pricing: fromQuote.pricing,
    pricingMode: fromQuote.pricingMode,
    pricingByPlanId: fromQuote.pricingByPlanId,
  };
}

