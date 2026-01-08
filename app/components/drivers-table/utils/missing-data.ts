import { ColumnDef } from '../types'
import { Driver } from '../types'

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
  
  // Check for false boolean values if field is required
  // Note: For boolean fields, we might want to allow false, so this is optional
  // if (field.type === 'boolean' && value === false && field.required) {
  //   return true
  // }
  
  return false
}

/**
 * Get all missing required fields for a driver
 */
export function getMissingFields(
  driver: Driver,
  fields: ColumnDef[]
): string[] {
  return fields
    .filter(field => isFieldMissing(driver[field.id as keyof Driver], field))
    .map(field => field.id)
}

/**
 * Get all missing fields across all drivers
 */
export function getAllMissingFields(
  drivers: Driver[],
  fields: ColumnDef[]
): MissingField[] {
  const missing: MissingField[] = []
  
  drivers.forEach((driver, rowIndex) => {
    fields.forEach((field) => {
      if (isFieldMissing(driver[field.id as keyof Driver], field)) {
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
 * Calculate if a driver row is complete (all required fields filled)
 */
export function isRowComplete(driver: Driver, fields: ColumnDef[]): boolean {
  return getMissingFields(driver, fields).length === 0
}

/**
 * Calculate the number of missing required fields for a driver
 */
export function getRowMissingCount(driver: Driver, fields: ColumnDef[]): number {
  return getMissingFields(driver, fields).length
}
