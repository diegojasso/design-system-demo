import { Driver } from "@/pages/components/drivers-table/types"
import { Vehicle } from "@/pages/components/vehicles-table/types"
import { ClientInfoFormValues } from "@/app/quote-context"
import { CoverageData } from "@/pages/components/coverage/types"

export interface ImportSummaryItem {
  id: string
  label: string
  checked: boolean
  severity: "warning" | "error" | "info"
  workflowStage?: "quote" | "underwriting" | "bind" // Workflow stage for grouping
  relatedSection?: "client-info" | "vehicle" | "driver" | "coverage" | "payment" | "review"
  details?: {
    type: "coverage-gap" | "accident-history" | "missing-vin" | "additional-driver"
    data?: any
  }
}

export interface ImportSummaryData {
  importedInfo: {
    drivers: Array<{ name: string }>
    vehicles: Array<{ year: string; make: string; model: string; vin?: string }>
  }
  missingInfo: ImportSummaryItem[]
  premiumEstimate?: {
    monthly: number
    currency?: string
  }
  thirdPartyReports: {
    status: "completed" | "pending" | "failed"
    reports: Array<{
      type: "financial-score" | "verify-coverage" | "verify-claims" | "mvr" | "car-report"
      status: "completed" | "pending" | "failed"
      provider?: string // e.g., "Carfax", "Verisk"
      findings?: any
      pendingReason?: string // e.g., "VIN required"
    }>
  }
}

export interface EzlynxQuoteData {
  quoteNumber: string
  clientInfo: ClientInfoFormValues
  drivers: Driver[]
  vehicles: Vehicle[]
  coverage?: CoverageData
  importSummary: ImportSummaryData
}

export const MOCK_EZLYNX_QUOTE: EzlynxQuoteData = {
  quoteNumber: "KBD78E7747",
  clientInfo: {
    firstName: "Sally",
    lastName: "Gomez",
    dateOfBirth: new Date("1985-05-15"),
    email: "sally.gomez@example.com",
    phone: "(480) 555-1234",
    address: "5211 S McQueen Rd, Chandler, AZ 85249",
    driversLicense: "D12345678",
    driversLicenseState: "AZ",
  },
  drivers: [
    {
      id: "driver-1",
      firstName: "Sally",
      lastName: "Gomez",
      dateOfBirth: "1985-05-15",
      relationship: "Self",
      gender: "Female",
      maritalStatus: "Married",
      email: "sally.gomez@example.com",
      phone: "(480) 555-1234",
      includeInPolicy: true,
      licenseNumber: "D12345678",
      licenseState: "AZ",
      licenseStatus: "Active",
      yearsLicensed: "14",
    },
    {
      id: "driver-2",
      firstName: "Robert",
      lastName: "Gomez",
      dateOfBirth: "1983-08-22",
      relationship: "Spouse",
      gender: "Male",
      maritalStatus: "Married",
      email: "robert.gomez@example.com",
      phone: "(480) 555-1235",
      includeInPolicy: true,
      licenseNumber: "D87654321",
      licenseState: "AZ",
      licenseStatus: "Active",
      yearsLicensed: "16",
    },
  ],
  vehicles: [
    {
      id: "vehicle-1",
      year: "2023",
      make: "Honda",
      model: "Accord",
      trim: "",
      vin: "", // Missing VIN - will be flagged
      ownershipType: "Own",
      primaryUse: "Commute",
      annualMileage: "12000",
      ownershipLength: "",
      garagingZipSame: "Yes",
    },
  ],
  importSummary: {
    importedInfo: {
      drivers: [
        { name: "Sally Gomez" },
        { name: "Robert Gomez" },
      ],
      vehicles: [
        { year: "2023", make: "Honda", model: "Accord" },
      ],
    },
    premiumEstimate: {
      monthly: 142,
      currency: "USD",
    },
    missingInfo: [
      {
        id: "coverage-gap",
        label: "Verify Coverage Gap",
        checked: false,
        severity: "warning",
        workflowStage: "underwriting",
        relatedSection: "coverage",
        details: {
          type: "coverage-gap",
          data: {
            gapPeriod: {
              start: "2024-03-15",
              end: "2024-04-30",
              days: 45,
            },
            previousCarrier: "State Farm",
            currentCarrier: "Geico",
            currentCarrierStart: "2024-05-01",
            applicationStates: "Continuous coverage for 3+ years",
            reportShows: "45-day gap in coverage",
            rateImpact: {
              current: 1847, // per 6mo
              potential: 1667, // per 6mo
              savings: -180, // per 6mo
            },
          },
        },
      },
      {
        id: "accident-history",
        label: "Verify Accident History",
        checked: false,
        severity: "warning",
        workflowStage: "underwriting",
        relatedSection: "driver",
        details: {
          type: "accident-history",
          data: {
            driverName: "Sally Gomez",
            reportDate: "2026-01-08",
            licenseNumber: "D12345678",
            licenseState: "AZ",
            status: "Clean Driver",
            summary: {
              violations: "No violations in past 3 years",
              accidents: "No accidents reported",
              licenseStatus: "Valid license status",
              licenseClass: "License class: C (Standard)",
            },
            impact: "This report has no impact on the quote rating.",
          },
        },
      },
      {
        id: "missing-vin",
        label: "VIN of 2023 Accord Missing",
        checked: false,
        severity: "error",
        workflowStage: "bind",
        relatedSection: "vehicle",
        details: {
          type: "missing-vin",
          data: {
            vehicleId: "vehicle-1",
            vehicleName: "2023 Honda Accord",
          },
        },
      },
      {
        id: "additional-driver",
        label: "(1) Additional driver found",
        checked: false,
        severity: "info",
        workflowStage: "bind",
        relatedSection: "driver",
        details: {
          type: "additional-driver",
          data: {
            driverName: "Robert Gomez",
          },
        },
      },
    ],
    thirdPartyReports: {
      status: "completed",
      reports: [
        {
          type: "financial-score",
          status: "completed",
          provider: "Verisk",
        },
        {
          type: "verify-coverage",
          status: "completed",
          provider: "Verisk",
          findings: {
            gapDetected: true,
            gapPeriod: {
              start: "2024-03-15",
              end: "2024-04-30",
              days: 45,
            },
          },
        },
        {
          type: "verify-claims",
          status: "completed",
          provider: "CLUE",
        },
        {
          type: "mvr",
          status: "completed",
          provider: "State DMV",
        },
        {
          type: "car-report",
          status: "pending",
          provider: "Carfax",
          pendingReason: "VIN required",
        },
      ],
    },
  },
}
