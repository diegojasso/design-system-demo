import { ColumnDef } from '../types'
import { Vehicle } from '../types'

export interface MissingField {
  rowIndex: number
  fieldId: string
  isRequired: boolean
}

/**
 * Check if a field value is considered "missing"
 */
export function isFieldMissing(value: any, field: ColumnDef): boolean {
  if (!field.required) return false
  
  // Check for empty values
  if (value === null || value === undefined || value === '') {
    return true
  }
  
  // Check for empty strings after trim
  if (typeof value === 'string' && value.trim() === '') {
    return true
  }
  
  // Check for "Select" placeholder in dropdowns
  if (field.type === 'dropdown' && value === 'Select') {
    return true
  }
  
  return false
}

/**
 * Get all missing required fields for a vehicle
 */
export function getMissingFields(
  vehicle: Vehicle,
  fields: ColumnDef[]
): string[] {
  return fields
    .filter(field => isFieldMissing(vehicle[field.id as keyof Vehicle], field))
    .map(field => field.id)
}

/**
 * Get all missing fields across all vehicles
 */
export function getAllMissingFields(
  vehicles: Vehicle[],
  fields: ColumnDef[]
): MissingField[] {
  const missing: MissingField[] = []
  
  vehicles.forEach((vehicle, rowIndex) => {
    fields.forEach((field) => {
      if (isFieldMissing(vehicle[field.id as keyof Vehicle], field)) {
        missing.push({
          rowIndex,
          fieldId: field.id,
          isRequired: field.required || false,
        })
      }
    })
  })
  
  return missing
}

/**
 * Calculate if a vehicle row is complete (all required fields filled)
 */
export function isRowComplete(vehicle: Vehicle, fields: ColumnDef[]): boolean {
  return getMissingFields(vehicle, fields).length === 0
}

/**
 * Calculate the number of missing required fields for a vehicle
 */
export function getRowMissingCount(vehicle: Vehicle, fields: ColumnDef[]): number {
  return getMissingFields(vehicle, fields).length
}
