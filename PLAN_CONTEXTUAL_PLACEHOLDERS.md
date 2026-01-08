# Contextual Placeholder Text - Implementation Plan

## Overview
Add contextual, helpful placeholder text to empty fields in both display and edit modes. This will guide users on what type of data to enter and improve the overall data entry experience.

## Current State
- **Display Mode**: Empty fields show "—" (em dash) in gray text
- **Edit Mode**: Input fields have no placeholder text
- **Dropdowns**: Use generic "Select..." placeholder from Select component
- **No contextual hints**: Users must rely on field labels alone

## Goals
1. **Display Mode Placeholders**: Replace generic "—" with contextual hints (e.g., "Enter first name", "Select relationship")
2. **Edit Mode Placeholders**: Add helpful placeholder text to input fields when empty
3. **Field-Type Specific**: Different placeholders based on field type (text, date, number, dropdown, etc.)
4. **Field-ID Specific**: Custom placeholders for specific fields (email, phone, VIN, etc.)
5. **Accessibility**: Ensure placeholders are properly announced and don't interfere with screen readers
6. **Visual Design**: Placeholders should be subtle but helpful, matching the Linear/Midday aesthetic

## Visual Design Specifications

### Display Mode Placeholders

#### Current Behavior:
- Empty fields show: `—` (gray, `text-[#9ca3af]`)

#### New Behavior:
- **Empty optional fields**: Show contextual placeholder in light gray italic (e.g., "Enter email address")
- **Empty required fields**: Show contextual placeholder in amber/muted (e.g., "Enter first name") - matches missing data highlighting
- **Style**: `text-[#9ca3af] italic` for optional, `text-amber-600 italic` for required missing

**Example:**
```
Display Mode (Empty Required): 
  <span className="text-amber-600 italic">Enter first name</span>

Display Mode (Empty Optional):
  <span className="text-[#9ca3af] italic">Enter email address</span>
```

### Edit Mode Placeholders

#### Input Fields:
- Use HTML `placeholder` attribute
- Style: Browser default placeholder styling (usually light gray, ~60% opacity)
- Show when field is empty or focused

#### Dropdown Fields:
- Update Select component's placeholder prop
- Already have "Select..." but can be more specific (e.g., "Select relationship")

#### Date Fields:
- Browser-native date pickers don't support custom placeholders well
- Consider adding helper text below or tooltip
- Keep browser default behavior

#### Radio/Boolean Fields:
- No placeholder needed (options are always visible)

## Placeholder Text Strategy

### Approach 1: Centralized Placeholder Map (Recommended)
Create a utility function that maps field IDs to contextual placeholder text.

**Advantages:**
- Centralized management
- Easy to update and maintain
- Consistent across tables
- Type-safe

### Approach 2: ColumnDef Property
Add `placeholder` property directly to `ColumnDef` interface.

**Advantages:**
- Field-specific, explicit
- Can be customized per field definition
- More flexible

**Recommendation**: Use **Approach 1** for default placeholders with **Approach 2** as override option.

## Placeholder Text Examples

### Drivers Table Placeholders

#### Text Fields:
- `firstName`: "Enter first name"
- `lastName`: "Enter last name"
- `email`: "Enter email address" or "example@email.com"
- `phone`: "Enter phone number" or "(555) 123-4567"
- `licenseNumber`: "Enter license number"

#### Date Fields:
- `dateOfBirth`: "Select date of birth" (or format hint: "MM/DD/YYYY")

#### Dropdown Fields:
- `relationship`: "Select relationship"
- `gender`: "Select gender"
- `maritalStatus`: "Select marital status"
- `licenseState`: "Select state"
- `licenseStatus`: "Select status"
- `yearsLicensed`: "Select years licensed"
- `homeOwnership`: "Select ownership type"
- `employmentStatus`: "Select employment status"
- `educationLevel`: "Select education level"

#### Boolean Fields:
- `includeInPolicy`: No placeholder (radio buttons are self-explanatory)

### Vehicles Table Placeholders

#### Text Fields:
- `vin`: "Enter VIN" or "17-character vehicle identifier"
- `make`: "Enter make" or "e.g., Honda, Toyota"
- `model`: "Enter model" or "e.g., Accord, Camry"
- `year`: "Enter year" or "YYYY"

#### Number Fields:
- `annualMileage`: "Enter annual mileage" or "e.g., 12000"

#### Dropdown Fields:
- `trim`: "Select trim level"
- `primaryUse`: "Select primary use"
- `ownershipLength`: "Select ownership length"

#### Radio Fields:
- `ownershipType`: No placeholder
- `garagingZipSame`: No placeholder

## Implementation Approach

### Phase 1: Placeholder Utility Functions

#### 1.1 Create Placeholder Utility

```typescript
// app/components/drivers-table/utils/placeholders.ts
// app/components/vehicles-table/utils/placeholders.ts

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
  const prefix = mode === 'display' ? 'Enter' : 'Enter'
  
  // Field-ID specific placeholders
  const fieldSpecificPlaceholders: Record<string, string> = {
    // Drivers
    firstName: 'Enter first name',
    lastName: 'Enter last name',
    email: 'Enter email address',
    phone: 'Enter phone number',
    licenseNumber: 'Enter license number',
    dateOfBirth: mode === 'display' ? 'Select date of birth' : 'MM/DD/YYYY',
    
    // Vehicles
    vin: 'Enter VIN (17 characters)',
    make: 'Enter make',
    model: 'Enter model',
    year: 'Enter year (YYYY)',
    annualMileage: 'Enter annual mileage',
  }
  
  if (fieldSpecificPlaceholders[field.id]) {
    return fieldSpecificPlaceholders[field.id]
  }
  
  // Type-based placeholders
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
    case 'boolean':
    case 'radio':
      return '' // No placeholder for radio/boolean
    default:
      return `Enter ${field.label.toLowerCase()}`
  }
}
```

#### 1.2 Update ColumnDef Type (Optional)

```typescript
// types.ts
export interface ColumnDef {
  id: string
  label: string
  type: ColumnType
  options?: string[]
  required?: boolean
  width?: string
  editable?: boolean
  placeholder?: string // NEW: Optional explicit placeholder override
}
```

### Phase 2: Update Display Mode

#### 2.1 Update Drivers EditableTableCell

```typescript
// In editable-table-cell.tsx display mode
import { getDisplayPlaceholder } from './utils/placeholders'

// In display mode rendering:
const displayValue = formatDisplayValue()
const isEmpty = !displayValue || displayValue === ''
const placeholder = isEmpty ? getDisplayPlaceholder(field, field.required) : null

<span className={`text-sm font-normal w-full ${
  error ? 'text-red-700' : 
  isMissing && !error ? 'text-amber-900' : 
  isEmpty && field.required ? 'text-amber-600 italic' :
  isEmpty ? 'text-[#9ca3af] italic' :
  'text-[#111827]'
}`}>
  {displayValue || <span>{placeholder}</span>}
</span>
```

#### 2.2 Update Vehicles EditableTableCell

Same changes as drivers table.

### Phase 3: Update Edit Mode

#### 3.1 Text Input Fields

```typescript
// In editable-table-cell.tsx edit mode
import { getEditPlaceholder } from './utils/placeholders'

<Input
  ref={inputRef}
  type={inputType}
  value={value || ''}
  placeholder={getEditPlaceholder(field)}
  onChange={(e) => onChange(e.target.value)}
  onBlur={onBlur}
  onKeyDown={handleKeyDown}
  className="..."
  // ...
/>
```

#### 3.2 Dropdown Fields

```typescript
<Select
  value={value || ''}
  onValueChange={(newValue) => onChange(newValue)}
>
  <SelectTrigger>
    <SelectValue placeholder={getEditPlaceholder(field) || "Select..."} />
  </SelectTrigger>
  // ...
</Select>
```

#### 3.3 Date Fields

```typescript
<Input
  ref={inputRef}
  type="date"
  value={dateValue}
  placeholder={getEditPlaceholder(field)} // May not work in all browsers
  onChange={(e) => onChange(e.target.value)}
  // ...
/>
```

Note: Date inputs don't reliably support placeholders. Consider adding helper text or keeping current behavior.

#### 3.4 Number Fields

```typescript
<Input
  ref={inputRef}
  type="number"
  value={value || ''}
  placeholder={getEditPlaceholder(field)}
  onChange={(e) => onChange(e.target.value)}
  // ...
/>
```

### Phase 4: Enhanced Examples (Optional)

For fields that benefit from example values:

```typescript
// Enhanced placeholder with examples
const placeholdersWithExamples: Record<string, string> = {
  email: 'example@email.com',
  phone: '(555) 123-4567',
  vin: '1HGCM82633A123456',
  make: 'e.g., Honda, Toyota',
  model: 'e.g., Accord, Camry',
  year: 'e.g., 2021',
  annualMileage: 'e.g., 12000',
}
```

## Accessibility Considerations

### Screen Reader Support
- Placeholders are automatically read by screen readers when inputs are empty
- Ensure placeholder text is descriptive but concise
- Don't rely solely on placeholders for critical information (use labels + placeholders)

### ARIA Labels
- Placeholders complement, don't replace, `aria-label` attributes
- Keep existing aria-label implementations
- Update aria-label to include placeholder context if helpful

### Best Practices
- **Keep placeholders short**: 1-3 words or a short example
- **Use simple language**: Avoid jargon or technical terms
- **Be specific**: "Enter email" is better than "Enter text"
- **Provide examples**: For complex formats (VIN, phone, date)
- **Don't duplicate label**: Placeholder should add value beyond the label

## Visual Design Details

### Color Scheme
- **Display mode - Required empty**: `text-amber-600 italic` (matches missing data highlighting)
- **Display mode - Optional empty**: `text-[#9ca3af] italic` (matches current "—" color)
- **Edit mode**: Browser default placeholder color (~60% opacity, usually gray)

### Typography
- **Display mode**: Same size as value text (`text-sm`), italicized
- **Edit mode**: Browser default (usually same size as input text, italicized)

### States
- **Empty + Not focused**: Show placeholder
- **Empty + Focused**: Show placeholder (will clear when user starts typing)
- **Has value**: Show value, no placeholder
- **Error state**: Placeholder still shown if empty, but error takes visual priority

## File Structure

```
app/
  components/
    drivers-table/
      editable-table-cell.tsx      # Update: Add placeholder rendering
      utils/
        placeholders.ts             # NEW: Placeholder utilities
      types.ts                      # Update: Add placeholder to ColumnDef (optional)
    vehicles-table/
      editable-table-cell.tsx      # Update: Add placeholder rendering
      utils/
        placeholders.ts             # NEW: Placeholder utilities
      types.ts                      # Update: Add placeholder to ColumnDef (optional)
```

## Implementation Steps

### Step 1: Create Placeholder Utilities
- [ ] Create `utils/placeholders.ts` for drivers table
- [ ] Create `utils/placeholders.ts` for vehicles table
- [ ] Implement `getDisplayPlaceholder` function
- [ ] Implement `getEditPlaceholder` function
- [ ] Add field-specific placeholder mappings

### Step 2: Update Types (Optional)
- [ ] Add `placeholder?: string` to `ColumnDef` interface in both tables
- [ ] Update TypeScript types

### Step 3: Update Display Mode
- [ ] Import placeholder utility in drivers EditableTableCell
- [ ] Update display rendering to show contextual placeholders
- [ ] Apply proper styling (amber for required, gray for optional)
- [ ] Repeat for vehicles EditableTableCell

### Step 4: Update Edit Mode - Text Fields
- [ ] Add placeholder prop to text Input components
- [ ] Add placeholder prop to number Input components
- [ ] Update both drivers and vehicles tables

### Step 5: Update Edit Mode - Dropdown Fields
- [ ] Update Select component's SelectValue placeholder
- [ ] Use contextual placeholders instead of generic "Select..."

### Step 6: Handle Special Cases
- [ ] Date fields: Decide on approach (keep browser default or add helper text)
- [ ] Radio/Boolean fields: Ensure no placeholder (already handled)

### Step 7: Testing
- [ ] Test placeholders in display mode (empty required vs optional)
- [ ] Test placeholders in edit mode for all field types
- [ ] Verify screen reader announces placeholders correctly
- [ ] Test that placeholders don't interfere with validation
- [ ] Verify placeholders update correctly when fields are filled/cleared

### Step 8: Polish & Refinement
- [ ] Review all placeholder text for clarity and consistency
- [ ] Adjust colors if needed to match design system
- [ ] Ensure placeholders work well with existing missing data highlighting

## Examples of Expected Behavior

### Display Mode Examples

**Before:**
```
Empty field: — (gray)
```

**After - Required Field:**
```
Empty required field: Enter first name (amber-600, italic)
```

**After - Optional Field:**
```
Empty optional field: Enter email address (gray-400, italic)
```

### Edit Mode Examples

**Text Input:**
```html
<input placeholder="Enter first name" />
```

**Dropdown:**
```html
<SelectValue placeholder="Select relationship" />
```

**Number Input:**
```html
<input type="number" placeholder="Enter annual mileage" />
```

## Edge Cases to Consider

1. **Very long labels**: Ensure placeholder doesn't overflow cell
2. **Internationalization**: If i18n is added later, placeholders need translation
3. **Browser compatibility**: Date input placeholders work inconsistently
4. **Mobile devices**: Placeholders should be readable on small screens
5. **Dark mode**: Ensure placeholder colors work if dark mode is added
6. **High contrast mode**: Placeholders should meet accessibility standards

## Performance Considerations

- Placeholder generation is lightweight (simple string lookups)
- No performance impact expected
- Can memoize placeholder functions if needed

## Future Enhancements

1. **Smart Placeholders**: Context-aware placeholders based on other field values
   - Example: "Enter spouse name" if relationship is "Spouse"
   
2. **Placeholder Animations**: Subtle fade-in when field becomes empty

3. **Format Hints**: Show format examples for complex fields
   - Date: "MM/DD/YYYY"
   - Phone: "(XXX) XXX-XXXX"
   - VIN: "17 characters"

4. **Validation-Aware Placeholders**: Change placeholder based on validation state
   - Error: "Enter valid email address"
   - Missing: "Required: Enter first name"

5. **Tooltip on Hover**: Additional help text on hover over placeholder

## Design References

- **Linear**: Uses subtle, helpful placeholders that guide without being intrusive
- **Notion**: Contextual placeholders that change based on field type
- **Airtable**: Example-based placeholders for complex fields

## Notes

- Placeholders should enhance, not replace, clear labels
- Keep placeholder text concise (1-5 words typically)
- Use examples for format-sensitive fields (dates, VINs, phone numbers)
- Ensure placeholders don't create visual clutter in dense tables
- Consider user familiarity - don't over-explain common fields
