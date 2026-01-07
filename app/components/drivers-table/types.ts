export type ColumnType = 'text' | 'dropdown' | 'date' | 'number' | 'boolean'

export interface ColumnDef {
  id: string
  label: string
  type: ColumnType
  options?: string[] // For dropdown type
  required?: boolean
  width?: string
  editable?: boolean
}

export interface Driver {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  email: string
  phone: string
  includeInPolicy: boolean
  licenseNumber: string
  licenseState: string
  licenseStatus: string
  yearsLicensed: string
  homeOwnership?: string
  employmentStatus?: string
  educationLevel?: string
  isFromMVR?: boolean
  mvrData?: {
    source: string
    confidence: number
  }
}

export interface MVRDriver {
  name: string
  dateOfBirth: string
  licenseNumber: string
  licenseState: string
  violations: number
  accidents: number
  confidence: number
  source: string
}

