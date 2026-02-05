import { ColumnDef } from '../types'

/**
 * Get contextual placeholder text for a field in display mode
 */
export function getDisplayPlaceholder(field: ColumnDef, isRequired: boolean = false): string {
  // Check if field has explicit placeholder
  if (field.placeholder) {
    return field.placeholder
  }
  
  // Generate based on field type and ID
  return generatePlaceholder(field, 'display')
}

/**
 * Get contextual placeholder text for a field in edit mode
 */
export function getEditPlaceholder(field: ColumnDef): string {
  // Check if field has explicit placeholder
  if (field.placeholder) {
    return field.placeholder
  }
  
  // Generate based on field type and ID
  return generatePlaceholder(field, 'edit')
}

/**
 * Generate placeholder based on field properties
 */
function generatePlaceholder(field: ColumnDef, mode: 'display' | 'edit'): string {
  // Field-ID specific placeholders
  const fieldSpecificPlaceholders: Record<string, string> = {
    // Drivers - Text fields
    firstName: 'Enter first name',
    lastName: 'Enter last name',
    email: mode === 'edit' ? 'example@email.com' : 'Enter email address',
    phone: mode === 'edit' ? '(555) 123-4567' : 'Enter phone number',
    licenseNumber: 'Enter license number',
    
    // Drivers - Date fields
    dateOfBirth: mode === 'display' ? 'Select date of birth' : 'MM/DD/YYYY',
    
    // Drivers - Dropdown fields (use generic for now, can be customized)
    relationship: 'Select relationship',
    gender: 'Select gender',
    maritalStatus: 'Select marital status',
    licenseState: 'Select state',
    licenseStatus: 'Select status',
    yearsLicensed: 'Select years licensed',
    homeOwnership: 'Select ownership type',
    employmentStatus: 'Select employment status',
    educationLevel: 'Select education level',
  }
  
  if (fieldSpecificPlaceholders[field.id]) {
    return fieldSpecificPlaceholders[field.id]
  }
  
  // Type-based placeholders (fallback)
  switch (field.type) {
    case 'dropdown':
      return `Select ${field.label.toLowerCase()}`
    case 'date':
      return mode === 'display' ? 'Select date' : 'MM/DD/YYYY'
    case 'number':
      return `Enter ${field.label.toLowerCase()}`
    case 'text':
      return `Enter ${field.label.toLowerCase()}`
    case 'boolean':
      return '' // No placeholder for boolean/radio
    default:
      return `Enter ${field.label.toLowerCase()}`
  }
}
