import { Vehicle, ColumnDef } from "./types"

export interface ValidationError {
  fieldId: string
  message: string
}

export function validateVehicle(vehicle: Vehicle, fields: ColumnDef[]): ValidationError[] {
  const errors: ValidationError[] = []

  fields.forEach((field) => {
    if (field.required) {
      const value = vehicle[field.id as keyof Vehicle]
      
      if (value === null || value === undefined || value === '') {
        errors.push({
          fieldId: field.id,
          message: `${field.label} is required`,
        })
      }
    }

    // VIN validation
    if (field.id === 'vin' && vehicle.vin) {
      const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i
      if (!vinRegex.test(vehicle.vin)) {
        errors.push({
          fieldId: 'vin',
          message: 'VIN must be 17 characters (alphanumeric)',
        })
      }
    }

    // Year validation
    if (field.id === 'year' && vehicle.year) {
      const year = parseInt(vehicle.year)
      const currentYear = new Date().getFullYear()
      const minYear = 1900
      const maxYear = currentYear + 1 // Allow next year for new vehicles
      
      if (isNaN(year) || year < minYear || year > maxYear) {
        errors.push({
          fieldId: 'year',
          message: `Year must be between ${minYear} and ${maxYear}`,
        })
      }
    }

    // Annual Mileage validation
    if (field.id === 'annualMileage' && vehicle.annualMileage) {
      const mileage = parseFloat(vehicle.annualMileage)
      if (isNaN(mileage) || mileage < 0) {
        errors.push({
          fieldId: 'annualMileage',
          message: 'Annual mileage must be a positive number',
        })
      }
    }
  })

  return errors
}

export function validateCellValue(
  value: any,
  field: ColumnDef
): string | null {
  if (field.required && (value === null || value === undefined || value === '')) {
    return `${field.label} is required`
  }

  if (field.id === 'vin' && value) {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i
    if (!vinRegex.test(value)) {
      return 'VIN must be 17 characters (alphanumeric)'
    }
  }

  if (field.id === 'year' && value) {
    const year = parseInt(value)
    const currentYear = new Date().getFullYear()
    const minYear = 1900
    const maxYear = currentYear + 1
    
    if (isNaN(year) || year < minYear || year > maxYear) {
      return `Year must be between ${minYear} and ${maxYear}`
    }
  }

  if (field.id === 'annualMileage' && value) {
    const mileage = parseFloat(value)
    if (isNaN(mileage) || mileage < 0) {
      return 'Annual mileage must be a positive number'
    }
  }

  return null
}

