import type { ApplicationQuoteResponse } from "@novo/api-client";

import type { ClientInfoFormValues } from "@/app/quote-context";
import type { CoverageData, PricingSummary } from "@/features/components/coverage/types";
import type { Driver } from "@/features/components/drivers-table/types";
import type { Incident } from "@/features/components/incidents/types";
import type { Vehicle } from "@/features/components/vehicles-table/types";
import type { ThirdPartyReportsSummary } from "@/shared/third-party-reports";

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
  incidents?: Incident[];
  reports?: ThirdPartyReportsSummary;
  quote?: ApplicationQuoteResponse;
  participationOption?: string;
};

export type ApplicationPrefillViewModels = {
  basicInfo: ClientInfoFormValues;
  drivers: Driver[];
  vehicles: Vehicle[];
  incidents?: Incident[];
  reports?: ThirdPartyReportsSummary;
  coverage?: CoverageData;
  pricing?: PricingSummary;
  pricingMode?: "mock" | "upstream";
  pricingByPlanId?: Partial<Record<"novo-next" | "novo-flex" | "novo-classic", PricingSummary>>;
  upstreamContext?: {
    partner: string;
    source: "agent" | "consumer";
    participationOption: string[];
  };
};

