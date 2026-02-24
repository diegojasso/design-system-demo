// Coverage validation and warnings
import { CoverageData, VehicleCoverage } from "./types"
import { Vehicle } from "@/features/components/vehicles-table/types"

export interface CoverageWarning {
  id: string
  severity: "error" | "warning" | "info"
  message: string
  field?: string
  vehicleId?: string
  autoFix?: {
    action: string
    newValue: any
  }
}

// Calculate vehicle value (rough estimate based on year, make, model)
function estimateVehicleValue(vehicle: Vehicle): number {
  // Very rough estimation - in production, this would use actual valuation APIs
  const currentYear = new Date().getFullYear()
  const vehicleYear = vehicle.year ? parseInt(vehicle.year, 10) : currentYear
  const age = currentYear - vehicleYear
  
  // Base value assumptions (very rough)
  const baseValues: Record<string, number> = {
    tesla: 45000,
    bmw: 35000,
    mercedes: 40000,
    audi: 35000,
    lexus: 40000,
    porsche: 60000,
  }

  const makeLower = vehicle.make?.toLowerCase() || ""
  let baseValue = 25000 // Default

  for (const [brand, value] of Object.entries(baseValues)) {
    if (makeLower.includes(brand)) {
      baseValue = value
      break
    }
  }

  // Depreciation: ~15% per year
  const depreciation = Math.max(0, 1 - age * 0.15)
  return Math.round(baseValue * depreciation)
}

// Parse property damage amount
function parsePropertyDamage(amount: string): number {
  const match = amount.match(/\$(\d+)K/)
  if (match) {
    return parseInt(match[1]) * 1000
  }
  return 0
}

// Validate coverage and generate warnings
export function validateCoverage(
  coverage: CoverageData,
  vehicles: Vehicle[]
): CoverageWarning[] {
  const warnings: CoverageWarning[] = []

  // Check if property damage is adequate for vehicle values
  const propertyDamageLimit = parsePropertyDamage(coverage.liability.propertyDamage)
  
  for (const vehicle of vehicles) {
    const vehicleValue = estimateVehicleValue(vehicle)
    const vehicleCoverage = coverage.vehicleCoverages.find(
      (vc) => vc.vehicleId === vehicle.id
    )

    if (!vehicleCoverage) {
      warnings.push({
        id: `missing-coverage-${vehicle.id}`,
        severity: "error",
        message: `No coverage configuration found for ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        vehicleId: vehicle.id,
      })
      continue
    }

    // Check if property damage is lower than vehicle value
    if (propertyDamageLimit > 0 && vehicleValue > propertyDamageLimit) {
      warnings.push({
        id: `low-property-damage-${vehicle.id}`,
        severity: "warning",
        message: `Vehicle value ($${vehicleValue.toLocaleString()}) exceeds property damage limit (${coverage.liability.propertyDamage}). Consider increasing coverage.`,
        field: "propertyDamage",
        vehicleId: vehicle.id,
        autoFix: {
          action: "Increase property damage",
          newValue: `$${Math.ceil(vehicleValue / 1000)}K`,
        },
      })
    }

    // Check for high-value vehicles without gap insurance
    if (vehicleValue > 30000 && !vehicleCoverage.loanLeasePayoff) {
      warnings.push({
        id: `gap-insurance-${vehicle.id}`,
        severity: "info",
        message: `High-value vehicle detected. Gap insurance recommended for better protection.`,
        field: "loanLeasePayoff",
        vehicleId: vehicle.id,
        autoFix: {
          action: "Add gap insurance",
          newValue: true,
        },
      })
    }

    // Check for new vehicles without rental reimbursement
    const currentYear = new Date().getFullYear()
    const vehicleYear = vehicle.year ? parseInt(vehicle.year, 10) : 0
    if (vehicle.year && vehicleYear >= currentYear - 2 && !vehicleCoverage.rentalReimbursement) {
      warnings.push({
        id: `rental-reimbursement-${vehicle.id}`,
        severity: "info",
        message: `Newer vehicle detected. Rental reimbursement recommended during repairs.`,
        field: "rentalReimbursement",
        vehicleId: vehicle.id,
        autoFix: {
          action: "Add rental reimbursement",
          newValue: true,
        },
      })
    }

    // Check for low comprehensive deductible on high-value vehicles
    if (vehicleValue > 40000) {
      const deductibleMatch = vehicleCoverage.comprehensiveDeductible.match(/\$(\d+),?(\d+)?/)
      if (deductibleMatch) {
        const deductible = parseInt(deductibleMatch[1] + (deductibleMatch[2] || ""))
        if (deductible > 1000) {
          warnings.push({
            id: `high-deductible-${vehicle.id}`,
            severity: "info",
            message: `High-value vehicle with high deductible. Consider lower deductible for better protection.`,
            field: "comprehensiveDeductible",
            vehicleId: vehicle.id,
          })
        }
      }
    }
  }

  // Check for missing uninsured motorist coverage
  if (coverage.additional.uninsuredMotoristsBodilyInjury === "Not Included") {
    warnings.push({
      id: "missing-uninsured-motorist",
      severity: "warning",
      message: "Uninsured motorist coverage is not included. Recommended for better protection.",
      field: "uninsuredMotoristsBodilyInjury",
      autoFix: {
        action: "Add uninsured motorist coverage",
        newValue: coverage.liability.bodilyInjury, // Match BI limits
      },
    })
  }

  // Check for low bodily injury limits
  const biMatch = coverage.liability.bodilyInjury.match(/\$(\d+)K\/\$(\d+)K/)
  if (biMatch) {
    const perPerson = parseInt(biMatch[1]) * 1000
    const perAccident = parseInt(biMatch[2]) * 1000

    if (perAccident < 100000) {
      warnings.push({
        id: "low-bodily-injury",
        severity: "warning",
        message: "Bodily injury limits are relatively low. Consider higher limits for better protection.",
        field: "bodilyInjury",
      })
    }

    // Check if Property Damage exceeds BI per-person amount
    const pdMatch = coverage.liability.propertyDamage.match(/\$(\d+)K/)
    if (pdMatch) {
      const pdAmount = parseInt(pdMatch[1]) * 1000
      if (pdAmount > perPerson) {
        warnings.push({
          id: "property-damage-exceeds-bi",
          severity: "warning",
          message: `Property Damage (${coverage.liability.propertyDamage}) exceeds Bodily Injury per-person limit ($${biMatch[1]}K). Consider increasing Bodily Injury coverage to match or exceed Property Damage.`,
          field: "propertyDamage",
          autoFix: {
            action: "Increase Bodily Injury to match Property Damage",
            newValue: `$${pdMatch[1]}K/$${Math.max(parseInt(biMatch[2]), parseInt(pdMatch[1]) * 2)}K`,
          },
        })
      }
    }

    // Check if Uninsured Motorists exceeds BI per-person amount
    if (coverage.additional.uninsuredMotoristsBodilyInjury !== "Not Included") {
      const umMatch = coverage.additional.uninsuredMotoristsBodilyInjury.match(/\$(\d+)K\/\$(\d+)K/)
      if (umMatch) {
        const umPerPerson = parseInt(umMatch[1]) * 1000
        if (umPerPerson > perPerson) {
          warnings.push({
            id: "um-exceeds-bi",
            severity: "warning",
            message: `Uninsured Motorists Bodily Injury (${coverage.additional.uninsuredMotoristsBodilyInjury}) exceeds Bodily Injury per-person limit ($${biMatch[1]}K). Consider increasing Bodily Injury coverage to match or exceed Uninsured Motorists.`,
            field: "uninsuredMotoristsBodilyInjury",
            autoFix: {
              action: "Increase Bodily Injury to match Uninsured Motorists",
              newValue: `$${umMatch[1]}K/$${Math.max(parseInt(biMatch[2]), parseInt(umMatch[2]))}K`,
            },
          })
        }
      }
    }

    // Check if Underinsured Motorists exceeds BI per-person amount
    if (coverage.additional.underinsuredMotoristsBodilyInjury && coverage.additional.underinsuredMotoristsBodilyInjury !== "Not Included") {
      const uimMatch = coverage.additional.underinsuredMotoristsBodilyInjury.match(/\$(\d+)K\/\$(\d+)K/)
      if (uimMatch) {
        const uimPerPerson = parseInt(uimMatch[1]) * 1000
        if (uimPerPerson > perPerson) {
          warnings.push({
            id: "uim-exceeds-bi",
            severity: "warning",
            message: `Underinsured Motorists Bodily Injury (${coverage.additional.underinsuredMotoristsBodilyInjury}) exceeds Bodily Injury per-person limit ($${biMatch[1]}K). Consider increasing Bodily Injury coverage to match or exceed Underinsured Motorists.`,
            field: "underinsuredMotoristsBodilyInjury",
            autoFix: {
              action: "Increase Bodily Injury to match Underinsured Motorists",
              newValue: `$${uimMatch[1]}K/$${Math.max(parseInt(biMatch[2]), parseInt(uimMatch[2]))}K`,
            },
          })
        }
      }
    }
  }

  return warnings
}
