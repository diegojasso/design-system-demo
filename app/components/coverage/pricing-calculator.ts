// Mock pricing calculator for coverage selections
import { CoverageData, PricingPlan, PricingSummary } from "./types"

// Mock base pricing plans
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "novo-next",
    name: "Novo Next",
    monthlyPrice: 124,
    description: "Price locked for six months",
    features: [
      "Price locked for six months",
      "20% discount upfront",
      "Renewal is based on driving behavior",
    ],
    discount: 20,
  },
  {
    id: "novo-flex",
    name: "Novo Flex",
    monthlyPrice: 113,
    description: "Flexible monthly payments",
    features: [
      "Flexible monthly payments",
      "No long-term commitment",
      "Cancel anytime",
    ],
  },
  {
    id: "novo-classic",
    name: "Novo Classic",
    monthlyPrice: 132,
    description: "Traditional annual policy",
    features: [
      "Traditional annual policy",
      "Full year coverage",
      "Best for stable drivers",
    ],
  },
]

// Calculate pricing adjustments based on coverage selections
export function calculateCoverageAdjustment(coverage: CoverageData): number {
  let adjustment = 0

  // Bodily Injury adjustments
  const biMultipliers: Record<string, number> = {
    "$25K/$50K": 0.9,
    "$50K/$100K": 0.95,
    "$100K/$300K": 1.0,
    "$250K/$500K": 1.15,
    "$500K/$1M": 1.3,
    "$1M/$2M": 1.5,
  }
  adjustment += (biMultipliers[coverage.liability.bodilyInjury] || 1.0) - 1.0

  // Property Damage adjustments
  const pdMultipliers: Record<string, number> = {
    "$25K": 0.9,
    "$50K": 0.95,
    "$100K": 1.0,
    "$250K": 1.1,
    "$500K": 1.2,
    "$1M": 1.35,
  }
  adjustment += (pdMultipliers[coverage.liability.propertyDamage] || 1.0) - 1.0

  // Medical Payments adjustments
  if (coverage.additional.medicalPayments !== "Not Included") {
    const mpMultipliers: Record<string, number> = {
      "$1K": 1.05,
      "$2K": 1.1,
      "$5K": 1.15,
      "$10K": 1.2,
      "$25K": 1.3,
    }
    adjustment += (mpMultipliers[coverage.additional.medicalPayments] || 1.0) - 1.0
  }

  // Uninsured Motorists adjustments
  if (coverage.additional.uninsuredMotoristsBodilyInjury !== "Not Included") {
    adjustment += 0.1 // 10% increase for uninsured motorists coverage
  }

  // Vehicle coverage adjustments
  coverage.vehicleCoverages.forEach((vc) => {
    // Comprehensive deductible adjustments (lower deductible = higher premium)
    const compMultipliers: Record<string, number> = {
      "$250": 1.15,
      "$500": 1.1,
      "$1,000": 1.0,
      "$2,500": 0.9,
      "$5,000": 0.85,
    }
    adjustment += (compMultipliers[vc.comprehensiveDeductible] || 1.0) - 1.0

    // Glass deductible adds cost
    if (vc.glassDeductible) {
      adjustment += 0.05
    }

    // Loan/lease payoff adds cost
    if (vc.loanLeasePayoff) {
      adjustment += 0.1
    }

    // Custom parts adds cost
    if (vc.customPartsEquipment) {
      adjustment += 0.08
    }
  })

  // Policy-level roadside assistance (not per vehicle)
  if (coverage.additional.roadsideAssistance) {
    adjustment += 0.06
  }

  return adjustment
}

// Calculate final pricing for a plan
export function calculatePlanPricing(
  planId: string,
  coverage: CoverageData,
  paymentFrequency: PricingSummary["paymentFrequency"] = "Monthly"
): {
  monthlyPrice: number
  totalForPeriod: number
  downPayment: number
} {
  const plan = PRICING_PLANS.find((p) => p.id === planId) || PRICING_PLANS[0]
  const adjustment = calculateCoverageAdjustment(coverage)
  
  // Base monthly price with coverage adjustments
  let baseMonthlyPrice = plan.monthlyPrice * (1 + adjustment)

  // Apply plan-specific discounts
  if (plan.discount) {
    baseMonthlyPrice = baseMonthlyPrice * (1 - plan.discount / 100)
  }

  // Calculate based on payment frequency
  let monthlyPrice = baseMonthlyPrice
  let totalForPeriod = baseMonthlyPrice
  let downPayment = baseMonthlyPrice * 0.2 // 20% down payment

  if (paymentFrequency === "Semi-Annual") {
    totalForPeriod = baseMonthlyPrice * 6
    downPayment = totalForPeriod * 0.2
  } else if (paymentFrequency === "Annual") {
    totalForPeriod = baseMonthlyPrice * 12
    downPayment = totalForPeriod * 0.2
  } else {
    // Monthly
    totalForPeriod = baseMonthlyPrice * 6 // Default 6 months for Novo Next
    downPayment = baseMonthlyPrice * 2 // 2 months as down payment
  }

  return {
    monthlyPrice: Math.round(monthlyPrice),
    totalForPeriod: Math.round(totalForPeriod),
    downPayment: Math.round(downPayment),
  }
}
