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
    // Vehicles - Text fields
    vin: mode === 'edit' ? '1HGCM82633A123456' : 'Enter VIN (17 characters)',
    make: mode === 'edit' ? 'e.g., Honda, Toyota' : 'Enter make',
    model: mode === 'edit' ? 'e.g., Accord, Camry' : 'Enter model',
    year: mode === 'edit' ? 'YYYY' : 'Enter year',
    
    // Vehicles - Number fields
    annualMileage: mode === 'edit' ? 'e.g., 12000' : 'Enter annual mileage',
    
    // Vehicles - Dropdown fields
    trim: 'Select trim level',
    primaryUse: 'Select primary use',
    ownershipLength: 'Select ownership length',
    
    // Vehicles - Radio fields (no placeholder needed)
    ownershipType: '',
    garagingZipSame: '',
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
    case 'number-with-unit':
      return `Enter ${field.label.toLowerCase()}`
    case 'text':
      return `Enter ${field.label.toLowerCase()}`
    case 'radio':
    case 'boolean':
      return '' // No placeholder for radio/boolean
    default:
      return `Enter ${field.label.toLowerCase()}`
  }
}
