export type ColumnType = 'text' | 'dropdown' | 'date' | 'number' | 'boolean' | 'radio' | 'number-with-unit'

export interface ColumnDef {
  id: string
  label: string
  type: ColumnType
  options?: string[] // For dropdown type
  radioOptions?: { value: string; label: string }[] // For radio groups
  required?: boolean
  width?: string
  editable?: boolean
  unit?: string // For number-with-unit type (e.g., "mi")
}

export interface Vehicle {
  id: string
  vin: string
  year: string
  make: string
  model: string
  trim: string
  primaryUse: string
  annualMileage: string // e.g., "12000"
  ownershipType: string // "Own", "Lease", "Finance"
  ownershipLength: string
  garagingZipSame: string // "Yes" or "No"
  isFromDiscovery?: boolean
  discoveryData?: {
    source: string
    confidence: number
  }
  badges?: {
    cleanTitle?: boolean
    carfaxVerified?: boolean
  }
}

export interface DiscoveredVehicle {
  make: string
  model: string
  year: string
  vin?: string
  confidence: number
  source: string
  badges?: {
    cleanTitle?: boolean
    carfaxVerified?: boolean
  }
}

