// Coverage types for insurance quote

export interface LiabilityCoverage {
  bodilyInjury: string // e.g., "$100K/$300K/$100K"
  propertyDamage: string // e.g., "$100K/$300K/$100K"
}

export interface AdditionalCoverage {
  medicalPayments: string // e.g., "Not Included", "$5K", "$10K"
  uninsuredMotoristsBodilyInjury: string // e.g., "Not Included", "$100K/$300K/$100K"
  underinsuredMotoristsBodilyInjury?: string // e.g., "Not Included", "$100K/$300K/$100K"
  uninsuredMotoristsPropertyDamage?: string // Optional, some states don't require this
  roadsideAssistance?: boolean // Policy-level roadside assistance
}

export interface VehicleCoverage {
  vehicleId: string
  comprehensiveDeductible: string // e.g., "$500", "$1,000", "$2,500", "Not Included"
  collisionDeductible?: string // e.g., "$500", "$1,000", "$2,500", "Not Included"
  glassDeductible: boolean // Glass Damage Deductible $0
  loanLeasePayoff: boolean // Covers gap between value and loan
  customPartsEquipment: boolean
  customPartsAmount?: number // Coverage amount in dollars
  rentalReimbursement?: boolean
}

export interface CoverageData {
  liability: LiabilityCoverage
  additional: AdditionalCoverage
  vehicleCoverages: VehicleCoverage[]
}

export interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  description: string
  features: string[]
  discount?: number // Percentage discount
}

export interface PricingSummary {
  selectedPlanId: string
  startDate: string // ISO date string
  paymentFrequency: "Monthly" | "Semi-Annual" | "Annual"
  monthlyPrice: number
  totalForPeriod: number
  downPayment: number
}

// Industry standard coverage options
export const BODILY_INJURY_OPTIONS = [
  "$25K/$50K",
  "$50K/$100K",
  "$100K/$300K",
  "$250K/$500K",
  "$500K/$1M",
  "$1M/$2M",
]

export const PROPERTY_DAMAGE_OPTIONS = [
  "$25K",
  "$50K",
  "$100K",
  "$250K",
  "$500K",
  "$1M",
]

export const MEDICAL_PAYMENTS_OPTIONS = [
  "Not Included",
  "$1K",
  "$2K",
  "$5K",
  "$10K",
  "$25K",
]

export const UNINSURED_MOTORISTS_OPTIONS = [
  "Not Included",
  ...BODILY_INJURY_OPTIONS,
]

export const UNDERINSURED_MOTORISTS_OPTIONS = [
  "Not Included",
  ...BODILY_INJURY_OPTIONS,
]

export const COMPREHENSIVE_DEDUCTIBLE_OPTIONS = [
  "Not Included",
  "$250",
  "$500",
  "$1,000",
  "$2,500",
  "$5,000",
]

export const COLLISION_DEDUCTIBLE_OPTIONS = [
  "Not Included",
  "$250",
  "$500",
  "$1,000",
  "$2,500",
  "$5,000",
]
