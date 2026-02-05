// State-specific coverage requirements and compliance checking
import { CoverageData, LiabilityCoverage, AdditionalCoverage } from "./types"

export interface StateRequirement {
  state: string
  stateName: string
  minimumBodilyInjury: string // e.g., "$15K/$30K"
  minimumPropertyDamage: string // e.g., "$5K"
  requiresUninsuredMotorist: boolean
  requiresMedicalPayments: boolean
  notes?: string
}

// State requirements database
export const STATE_REQUIREMENTS: Record<string, StateRequirement> = {
  CA: {
    state: "CA",
    stateName: "California",
    minimumBodilyInjury: "$15K/$30K",
    minimumPropertyDamage: "$5K",
    requiresUninsuredMotorist: false,
    requiresMedicalPayments: false,
  },
  TX: {
    state: "TX",
    stateName: "Texas",
    minimumBodilyInjury: "$30K/$60K",
    minimumPropertyDamage: "$25K",
    requiresUninsuredMotorist: false,
    requiresMedicalPayments: false,
  },
  FL: {
    state: "FL",
    stateName: "Florida",
    minimumBodilyInjury: "$10K/$20K",
    minimumPropertyDamage: "$10K",
    requiresUninsuredMotorist: false,
    requiresMedicalPayments: true,
    notes: "Florida requires PIP (Personal Injury Protection) instead of traditional medical payments",
  },
  NY: {
    state: "NY",
    stateName: "New York",
    minimumBodilyInjury: "$25K/$50K",
    minimumPropertyDamage: "$10K",
    requiresUninsuredMotorist: true,
    requiresMedicalPayments: false,
  },
  AZ: {
    state: "AZ",
    stateName: "Arizona",
    minimumBodilyInjury: "$15K/$30K",
    minimumPropertyDamage: "$10K",
    requiresUninsuredMotorist: false,
    requiresMedicalPayments: false,
  },
  // Add more states as needed - for now, using a default for states not in database
}

// Default requirements for states not in database
const DEFAULT_REQUIREMENTS: StateRequirement = {
  state: "US",
  stateName: "United States",
  minimumBodilyInjury: "$25K/$50K",
  minimumPropertyDamage: "$25K",
  requiresUninsuredMotorist: false,
  requiresMedicalPayments: false,
}

// Extract state from address string (e.g., "Chandler, AZ 85249" -> "AZ")
export function extractStateFromAddress(address: string): string | null {
  if (!address) return null

  // Try to match state abbreviation (2 letters) before ZIP code
  const stateMatch = address.match(/\b([A-Z]{2})\s+\d{5}(?:-\d{4})?\b/)
  if (stateMatch) {
    return stateMatch[1]
  }

  // Try to match state name
  const stateNames: Record<string, string> = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
    "District of Columbia": "DC",
  }

  for (const [name, abbr] of Object.entries(stateNames)) {
    if (address.includes(name)) {
      return abbr
    }
  }

  return null
}

// Get state requirements
export function getStateRequirements(state: string | null): StateRequirement {
  if (!state) return DEFAULT_REQUIREMENTS
  return STATE_REQUIREMENTS[state.toUpperCase()] || DEFAULT_REQUIREMENTS
}

// Parse coverage amount (e.g., "$100K/$300K" -> { perPerson: 100000, perAccident: 300000 })
function parseCoverageAmount(amount: string): { perPerson: number; perAccident: number } | null {
  const match = amount.match(/\$(\d+)K\/\$(\d+)K/)
  if (match) {
    return {
      perPerson: parseInt(match[1]) * 1000,
      perAccident: parseInt(match[2]) * 1000,
    }
  }

  const singleMatch = amount.match(/\$(\d+)K/)
  if (singleMatch) {
    const value = parseInt(singleMatch[1]) * 1000
    return { perPerson: value, perAccident: value }
  }

  return null
}

// Compare coverage amounts
function compareCoverage(current: string, minimum: string): number {
  const currentParsed = parseCoverageAmount(current)
  const minimumParsed = parseCoverageAmount(minimum)

  if (!currentParsed || !minimumParsed) return 0

  // Compare per-accident amounts (more important)
  if (currentParsed.perAccident > minimumParsed.perAccident) return 1
  if (currentParsed.perAccident < minimumParsed.perAccident) return -1

  // If per-accident is equal, compare per-person
  if (currentParsed.perPerson > minimumParsed.perPerson) return 1
  if (currentParsed.perPerson < minimumParsed.perPerson) return -1

  return 0
}

// Compliance check result
export interface ComplianceCheck {
  isCompliant: boolean
  issues: ComplianceIssue[]
}

export interface ComplianceIssue {
  field: string
  severity: "error" | "warning"
  message: string
  currentValue: string
  requiredValue: string
  autoFix?: {
    action: string
    newValue: string
  }
}

// Check compliance with state requirements
export function checkCompliance(
  coverage: CoverageData,
  state: string | null
): ComplianceCheck {
  const requirements = getStateRequirements(state)
  const issues: ComplianceIssue[] = []

  // Check bodily injury
  const biComparison = compareCoverage(
    coverage.liability.bodilyInjury,
    requirements.minimumBodilyInjury
  )
  if (biComparison < 0) {
    issues.push({
      field: "bodilyInjury",
      severity: "error",
      message: `Bodily injury coverage (${coverage.liability.bodilyInjury}) is below ${requirements.stateName} minimum requirement (${requirements.minimumBodilyInjury})`,
      currentValue: coverage.liability.bodilyInjury,
      requiredValue: requirements.minimumBodilyInjury,
      autoFix: {
        action: "Increase to minimum",
        newValue: requirements.minimumBodilyInjury,
      },
    })
  }

  // Check property damage
  const pdComparison = compareCoverage(
    coverage.liability.propertyDamage,
    requirements.minimumPropertyDamage
  )
  if (pdComparison < 0) {
    issues.push({
      field: "propertyDamage",
      severity: "error",
      message: `Property damage coverage (${coverage.liability.propertyDamage}) is below ${requirements.stateName} minimum requirement (${requirements.minimumPropertyDamage})`,
      currentValue: coverage.liability.propertyDamage,
      requiredValue: requirements.minimumPropertyDamage,
      autoFix: {
        action: "Increase to minimum",
        newValue: requirements.minimumPropertyDamage,
      },
    })
  }

  // Check uninsured motorist requirement
  if (
    requirements.requiresUninsuredMotorist &&
    coverage.additional.uninsuredMotoristsBodilyInjury === "Not Included"
  ) {
    issues.push({
      field: "uninsuredMotoristsBodilyInjury",
      severity: "error",
      message: `${requirements.stateName} requires uninsured motorist coverage`,
      currentValue: "Not Included",
      requiredValue: "Required",
      autoFix: {
        action: "Add uninsured motorist coverage",
        newValue: requirements.minimumBodilyInjury, // Match BI limits
      },
    })
  }

  // Check medical payments requirement
  if (
    requirements.requiresMedicalPayments &&
    coverage.additional.medicalPayments === "Not Included"
  ) {
    issues.push({
      field: "medicalPayments",
      severity: "error",
      message: `${requirements.stateName} requires medical payments coverage`,
      currentValue: "Not Included",
      requiredValue: "Required",
      autoFix: {
        action: "Add medical payments coverage",
        newValue: "$5K", // Default minimum
      },
    })
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  }
}
