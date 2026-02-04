import { Driver, ColumnDef } from "./types"

export interface ValidationError {
  fieldId: string
  message: string
}

export function validateDriver(driver: Driver, fields: ColumnDef[]): ValidationError[] {
  const errors: ValidationError[] = []

  fields.forEach((field) => {
    if (field.required) {
      const value = driver[field.id as keyof Driver]
      
      if (value === null || value === undefined || value === '') {
        errors.push({
          fieldId: field.id,
          message: `${field.label} is required`,
        })
      }
    }

    // Email validation
    if (field.id === 'email' && driver.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(driver.email)) {
        errors.push({
          fieldId: 'email',
          message: 'Please enter a valid email address',
        })
      }
    }

    // Date validation
    if (field.type === 'date' && driver[field.id as keyof Driver]) {
      const dateValue = driver[field.id as keyof Driver] as string
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) {
        errors.push({
          fieldId: field.id,
          message: 'Please enter a valid date',
        })
      } else {
        // Check if date is in the future (for DOB)
        if (field.id === 'dateOfBirth' && date > new Date()) {
          errors.push({
            fieldId: 'dateOfBirth',
            message: 'Date of birth cannot be in the future',
          })
        }
      }
    }

    // Phone validation (basic)
    if (field.id === 'phone' && driver.phone) {
      const phoneRegex = /^[\d\s()\-+]+$/
      if (!phoneRegex.test(driver.phone)) {
        errors.push({
          fieldId: 'phone',
          message: 'Please enter a valid phone number',
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

  if (field.id === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  if (field.type === 'date' && value) {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date'
    }
    if (field.id === 'dateOfBirth' && date > new Date()) {
      return 'Date of birth cannot be in the future'
    }
  }

  if (field.id === 'phone' && value) {
    const phoneRegex = /^[\d\s()\-+]+$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
  }

  return null
}

