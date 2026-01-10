// Coverage templates and presets for quick setup
import { CoverageData, LiabilityCoverage, AdditionalCoverage, VehicleCoverage } from "./types"

export interface CoverageTemplate {
  id: string
  name: string
  description: string
  coverage: CoverageData
  createdBy?: string
  createdAt?: Date
  isDefault: boolean
  category: "minimum" | "standard" | "comprehensive" | "high-value" | "commercial" | "custom"
}

// Default liability coverage for minimum state requirements
const MINIMUM_LIABILITY: LiabilityCoverage = {
  bodilyInjury: "$25K/$50K",
  propertyDamage: "$25K",
}

// Standard liability coverage
const STANDARD_LIABILITY: LiabilityCoverage = {
  bodilyInjury: "$100K/$300K",
  propertyDamage: "$100K",
}

// Comprehensive liability coverage
const COMPREHENSIVE_LIABILITY: LiabilityCoverage = {
  bodilyInjury: "$250K/$500K",
  propertyDamage: "$250K",
}

// High-value liability coverage
const HIGH_VALUE_LIABILITY: LiabilityCoverage = {
  bodilyInjury: "$500K/$1M",
  propertyDamage: "$500K",
}

// Default additional coverage (none)
const NO_ADDITIONAL: AdditionalCoverage = {
  medicalPayments: "Not Included",
  uninsuredMotoristsBodilyInjury: "Not Included",
}

// Standard additional coverage
const STANDARD_ADDITIONAL: AdditionalCoverage = {
  medicalPayments: "$5K",
  uninsuredMotoristsBodilyInjury: "$100K/$300K",
  roadsideAssistance: true,
}

// Comprehensive additional coverage
const COMPREHENSIVE_ADDITIONAL: AdditionalCoverage = {
  medicalPayments: "$10K",
  uninsuredMotoristsBodilyInjury: "$250K/$500K",
  roadsideAssistance: true,
}

// Helper to create vehicle coverage defaults
function createVehicleCoverageDefaults(
  comprehensiveDeductible: string,
  glassDeductible: boolean,
  loanLeasePayoff: boolean,
  customPartsEquipment: boolean
): (vehicleId: string) => VehicleCoverage {
  return (vehicleId: string) => ({
    vehicleId,
    comprehensiveDeductible,
    glassDeductible,
    loanLeasePayoff,
    customPartsEquipment,
  })
}

// Default templates
export const DEFAULT_TEMPLATES: CoverageTemplate[] = [
  {
    id: "minimum",
    name: "Minimum State Requirements",
    description: "Bare minimum coverage to meet state requirements",
    category: "minimum",
    isDefault: true,
    coverage: {
      liability: MINIMUM_LIABILITY,
      additional: NO_ADDITIONAL,
      vehicleCoverages: [], // Will be populated when applied
    },
  },
  {
    id: "standard",
    name: "Standard Coverage",
    description: "Common coverage for typical drivers and vehicles",
    category: "standard",
    isDefault: true,
    coverage: {
      liability: STANDARD_LIABILITY,
      additional: STANDARD_ADDITIONAL,
      vehicleCoverages: [], // Will be populated when applied
    },
  },
  {
    id: "comprehensive",
    name: "Comprehensive Protection",
    description: "Higher coverage limits for better protection",
    category: "comprehensive",
    isDefault: true,
    coverage: {
      liability: COMPREHENSIVE_LIABILITY,
      additional: COMPREHENSIVE_ADDITIONAL,
      vehicleCoverages: [], // Will be populated when applied
    },
  },
  {
    id: "high-value",
    name: "High-Value Vehicle",
    description: "Enhanced coverage for expensive vehicles",
    category: "high-value",
    isDefault: true,
    coverage: {
      liability: HIGH_VALUE_LIABILITY,
      additional: COMPREHENSIVE_ADDITIONAL,
      vehicleCoverages: [], // Will be populated when applied
    },
  },
  {
    id: "commercial",
    name: "Commercial Vehicle",
    description: "Coverage optimized for commercial use",
    category: "commercial",
    isDefault: true,
    coverage: {
      liability: {
        bodilyInjury: "$500K/$1M",
        propertyDamage: "$500K",
      },
      additional: {
        medicalPayments: "$10K",
        uninsuredMotoristsBodilyInjury: "$500K/$1M",
        roadsideAssistance: true,
      },
      vehicleCoverages: [], // Will be populated when applied
    },
  },
]

// Template storage key
const TEMPLATE_STORAGE_KEY = "coverage-templates"

// Load templates from localStorage
export function loadTemplates(): CoverageTemplate[] {
  if (typeof window === "undefined") return DEFAULT_TEMPLATES

  try {
    const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY)
    if (!stored) return DEFAULT_TEMPLATES

    const parsed = JSON.parse(stored) as CoverageTemplate[]
    // Merge with defaults, prioritizing stored custom templates
    const defaultIds = new Set(DEFAULT_TEMPLATES.map((t) => t.id))
    const customTemplates = parsed.filter((t) => !defaultIds.has(t.id))
    return [...DEFAULT_TEMPLATES, ...customTemplates]
  } catch (error) {
    console.error("Failed to load templates:", error)
    return DEFAULT_TEMPLATES
  }
}

// Save templates to localStorage
export function saveTemplates(templates: CoverageTemplate[]): void {
  if (typeof window === "undefined") return

  try {
    // Only save custom templates (not defaults)
    const defaultIds = new Set(DEFAULT_TEMPLATES.map((t) => t.id))
    const customTemplates = templates.filter((t) => !defaultIds.has(t.id))
    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(customTemplates))
  } catch (error) {
    console.error("Failed to save templates:", error)
  }
}

// Save a custom template
export function saveCustomTemplate(template: Omit<CoverageTemplate, "id" | "createdAt">): CoverageTemplate {
  const newTemplate: CoverageTemplate = {
    ...template,
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    category: "custom",
    isDefault: false,
  }

  const templates = loadTemplates()
  templates.push(newTemplate)
  saveTemplates(templates)

  return newTemplate
}

// Delete a template
export function deleteTemplate(templateId: string): void {
  const templates = loadTemplates()
  const filtered = templates.filter((t) => t.id !== templateId)
  saveTemplates(filtered)
}

// Apply template to coverage data
export function applyTemplate(
  template: CoverageTemplate,
  currentCoverage: CoverageData,
  vehicleIds: string[]
): CoverageData {
  // Create vehicle coverages for all vehicles
  const vehicleCoverages: VehicleCoverage[] = vehicleIds.map((vehicleId) => {
    // Try to preserve existing vehicle coverage if it exists
    const existing = currentCoverage.vehicleCoverages.find((vc) => vc.vehicleId === vehicleId)

    // Determine vehicle coverage settings based on template
    let vehicleCoverage: VehicleCoverage

    switch (template.category) {
      case "minimum":
        vehicleCoverage = {
          vehicleId,
          comprehensiveDeductible: "$2,500",
          glassDeductible: false,
          loanLeasePayoff: false,
          customPartsEquipment: false,
        }
        break
      case "standard":
        vehicleCoverage = {
          vehicleId,
          comprehensiveDeductible: "$1,000",
          glassDeductible: true,
          loanLeasePayoff: false,
          customPartsEquipment: false,
        }
        break
      case "comprehensive":
        vehicleCoverage = {
          vehicleId,
          comprehensiveDeductible: "$500",
          glassDeductible: true,
          loanLeasePayoff: false,
          customPartsEquipment: false,
        }
        break
      case "high-value":
        vehicleCoverage = {
          vehicleId,
          comprehensiveDeductible: "$500",
          glassDeductible: true,
          loanLeasePayoff: true,
          customPartsEquipment: true,
        }
        break
      case "commercial":
        vehicleCoverage = {
          vehicleId,
          comprehensiveDeductible: "$1,000",
          glassDeductible: true,
          loanLeasePayoff: false,
          customPartsEquipment: false,
        }
        break
      default:
        // Use existing or default
        vehicleCoverage = existing || {
          vehicleId,
          comprehensiveDeductible: "$1,000",
          glassDeductible: true,
          loanLeasePayoff: false,
          customPartsEquipment: false,
        }
    }

    return vehicleCoverage
  })

  return {
    liability: template.coverage.liability,
    additional: template.coverage.additional,
    vehicleCoverages,
  }
}
