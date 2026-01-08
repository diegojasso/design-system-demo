# Missing Data Highlighting - Implementation Plan

## Overview
Enhance the drivers and vehicles tables to visually highlight fields with missing data, particularly required fields. This will help users quickly identify incomplete information and improve data quality.

## Current State
- ✅ Validation exists and runs on cell value changes
- ✅ Error states show `bg-red-50/30` background with warning icon (⚠)
- ✅ Required fields are marked with red asterisk (*) in labels
- ❌ No proactive highlighting of empty required fields
- ❌ No bulk validation across all rows
- ❌ No summary indicators for missing data
- ❌ No row-level indicators for incomplete rows

## Goals
1. **Proactive Visual Indicators**: Highlight required fields that are empty, even if user hasn't interacted with them
2. **Bulk Validation**: Validate all rows/fields on demand (e.g., before save/submit)
3. **Summary Indicators**: Show count of missing required fields at table/row level
4. **User Control**: Allow users to toggle between "show all" and "show missing only" views
5. **Accessibility**: Ensure highlighted fields are clearly announced to screen readers

## Visual Design Specifications

### Cell-Level Highlighting

#### Missing Required Field (Empty, Not Yet Validated)
- **Background**: `bg-amber-50` (subtle yellow/amber tint)
- **Border**: Left border `border-l-2 border-l-amber-400` (optional, for stronger indication)
- **Icon**: Small indicator icon in cell (optional, to avoid clutter)
- **Label**: Keep existing red asterisk (*)

#### Missing Required Field (Validated Error)
- **Background**: `bg-red-50/30` (current implementation - keep)
- **Icon**: Warning icon (⚠) - current implementation - keep
- **Text**: Red text color for error message

#### Comparison:
```
Normal Cell:           bg-white
Active/Focused Cell:   bg-[#f9fafb]
Missing (proactive):   bg-amber-50
Error (validated):     bg-red-50/30
```

### Row-Level Indicators

#### Incomplete Row Badge
- **Location**: In driver/vehicle column header (next to existing badges)
- **Badge Style**: 
  - Background: `bg-amber-100`
  - Text: `text-amber-800`
  - Icon: `AlertCircle` icon (lucide-react)
  - Text: "Incomplete" or "X missing"
- **Condition**: Show when row has any missing required fields

#### Complete Row Indicator
- **Optional**: Green checkmark badge when all required fields are filled
- **Badge Style**:
  - Background: `bg-green-100`
  - Text: `text-green-800`
  - Icon: `CheckCircle` icon
  - Text: "Complete"

### Table-Level Summary

#### Missing Data Summary (Optional)
- **Location**: Above table or in right sidebar
- **Display**: 
  - "X of Y required fields missing" or
  - "X incomplete rows" or
  - Progress bar showing completion percentage
- **Style**: Info card/banner

#### Filter/Toggle Controls
- **"Show Missing Only" Toggle**: Filter to show only rows with missing data
- **"Highlight Missing" Toggle**: Toggle highlighting on/off (for users who find it distracting)

## Implementation Approach

### Phase 1: Proactive Missing Field Detection

#### 1.1 Missing Data Detection Utility
```typescript
// utils/missing-data.ts

interface MissingField {
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
 * Get all missing required fields for a driver/vehicle
 */
export function getMissingFields(
  entity: Driver | Vehicle,
  fields: ColumnDef[]
): string[] {
  return fields
    .filter(field => isFieldMissing(entity[field.id as keyof typeof entity], field))
    .map(field => field.id)
}

/**
 * Get all missing fields across all rows
 */
export function getAllMissingFields(
  entities: (Driver | Vehicle)[],
  fields: ColumnDef[]
): MissingField[] {
  const missing: MissingField[] = []
  
  entities.forEach((entity, rowIndex) => {
    fields.forEach((field) => {
      if (isFieldMissing(entity[field.id as keyof typeof entity], field)) {
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
```

#### 1.2 Update DriversTable Component

**State Management:**
```typescript
// Track missing fields (proactive, not yet validated)
const [missingFields, setMissingFields] = React.useState<Set<string>>(new Set())

// Recompute missing fields when drivers or fields change
React.useEffect(() => {
  const missing = new Set<string>()
  drivers.forEach((driver, driverIndex) => {
    fields.forEach((field) => {
      if (field.required && isFieldMissing(driver[field.id as keyof Driver], field)) {
        missing.add(`${driverIndex}-${field.id}`)
      }
    })
  })
  setMissingFields(missing)
}, [drivers, fields])
```

**Cell Rendering:**
```typescript
// In cell rendering logic
const errorKey = `${driverIndex}-${field.id}`
const error = validationErrors.get(errorKey)
const isMissing = missingFields.has(errorKey)
const hasError = !!error

// Determine cell styling
const cellClassName = `
  h-[44px] border-b border-[#f3f4f6] last:border-b-0 transition-colors
  ${isActive ? 'bg-[#f9fafb]' : ''}
  ${hasError ? 'bg-red-50/30' : ''}
  ${isMissing && !hasError ? 'bg-amber-50' : ''}
`
```

#### 1.3 Update EditableTableCell Component

**Display Mode:**
```typescript
interface EditableTableCellProps {
  // ... existing props
  isMissing?: boolean // New prop
}

// In display mode render
<div
  className={`
    h-full px-4 flex items-center cursor-text hover:bg-[#f9fafb] transition-colors
    ${error ? 'bg-red-50' : ''}
    ${isMissing && !error ? 'bg-amber-50' : ''}
  `}
  // ... rest of props
>
  <div className="flex items-center gap-2 w-full">
    <span className={`text-sm font-normal w-full ${
      error ? 'text-red-700' : isMissing ? 'text-amber-900' : 'text-[#111827]'
    }`}>
      {formatDisplayValue() || <span className="text-[#9ca3af]">—</span>}
    </span>
    {error && <span className="text-xs text-red-600 shrink-0" title={error}>⚠</span>}
    {isMissing && !error && (
      <span className="text-xs text-amber-600 shrink-0" title="Required field is empty">
        ○
      </span>
    )}
  </div>
</div>
```

**Accessibility:**
```typescript
aria-label={`
  ${field.label}, 
  ${error ? `Error: ${error}` : isMissing ? 'Required field is empty' : ''}
  ${formatDisplayValue() || 'empty'}
`}
aria-required={field.required ? 'true' : 'false'}
```

### Phase 2: Row-Level Indicators

#### 2.1 Row Completeness Calculation

```typescript
// Calculate if a row is complete
const isRowComplete = (driver: Driver, fields: ColumnDef[]): boolean => {
  return !getMissingFields(driver, fields).length
}

// Calculate missing count for a row
const getRowMissingCount = (driver: Driver, fields: ColumnDef[]): number => {
  return getMissingFields(driver, fields).length
}
```

#### 2.2 Update Row Header Badges

```typescript
// In DriversTable component
const getDriverBadges = (driver: Driver, index: number) => {
  const badges = []
  
  // Existing badges
  if (index === 0) {
    badges.push('Primary Insured')
  } else {
    badges.push('Additional Driver')
  }
  if (driver.includeInPolicy) {
    badges.push('Covered')
  }
  if (newDriverIds.has(driver.id)) {
    badges.push('New')
  }
  if (driver.isFromMVR) {
    badges.push('MVR')
  }
  
  // NEW: Missing data badge
  const missingCount = getRowMissingCount(driver, fields)
  if (missingCount > 0) {
    badges.push({
      type: 'incomplete',
      text: `${missingCount} missing`,
      count: missingCount,
    })
  } else if (missingCount === 0 && fields.some(f => f.required)) {
    // Optional: Show complete badge
    badges.push({
      type: 'complete',
      text: 'Complete',
    })
  }
  
  return badges
}
```

**Badge Rendering:**
```typescript
{getDriverBadges(driver, driverIndex).map((badge, idx) => {
  // Handle badge objects with type
  if (typeof badge === 'object' && badge.type === 'incomplete') {
    return (
      <Badge
        key={idx}
        variant="secondary"
        className="text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-amber-100 text-amber-800"
      >
        <AlertCircle className="h-3 w-3 mr-1" />
        {badge.text}
      </Badge>
    )
  }
  
  if (typeof badge === 'object' && badge.type === 'complete') {
    return (
      <Badge
        key={idx}
        variant="secondary"
        className="text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-green-100 text-green-800"
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        {badge.text}
      </Badge>
    )
  }
  
  // Existing badge rendering
  // ...
})}
```

### Phase 3: Bulk Validation & Summary

#### 3.1 Validate All Rows Function

```typescript
// Add to DriversTable component
const validateAllRows = React.useCallback(() => {
  const allErrors = new Map<string, string>()
  
  drivers.forEach((driver, driverIndex) => {
    fields.forEach((field) => {
      const value = driver[field.id as keyof Driver]
      const error = validateCellValue(value, field)
      
      if (error) {
        allErrors.set(`${driverIndex}-${field.id}`, error)
      }
    })
  })
  
  setValidationErrors(allErrors)
  return allErrors.size === 0
}, [drivers, fields])
```

#### 3.2 Table Summary Component

```typescript
// components/missing-data-summary.tsx
interface MissingDataSummaryProps {
  totalRows: number
  totalRequiredFields: number
  missingFields: MissingField[]
  onValidateAll?: () => void
}

export function MissingDataSummary({
  totalRows,
  totalRequiredFields,
  missingFields,
  onValidateAll,
}: MissingDataSummaryProps) {
  const totalFields = totalRows * totalRequiredFields
  const completedFields = totalFields - missingFields.length
  const completionPercentage = totalFields > 0 
    ? Math.round((completedFields / totalFields) * 100) 
    : 100
  
  const incompleteRows = new Set(missingFields.map(m => m.rowIndex)).size
  
  return (
    <Card className="mb-4 border-amber-200 bg-amber-50/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-medium text-amber-900">
                {missingFields.length} of {totalFields} required fields missing
              </p>
              <p className="text-xs text-amber-700 mt-1">
                {incompleteRows} of {totalRows} rows incomplete
              </p>
            </div>
            <div className="w-24">
              <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs text-amber-700 text-center mt-1">
                {completionPercentage}%
              </p>
            </div>
          </div>
          {onValidateAll && (
            <Button
              variant="outline"
              size="sm"
              onClick={onValidateAll}
              className="border-amber-300 text-amber-900 hover:bg-amber-100"
            >
              Validate All
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

#### 3.3 Integration in Table

```typescript
// Add before table in DriversTable component
{missingFields.size > 0 && (
  <MissingDataSummary
    totalRows={drivers.length}
    totalRequiredFields={fields.filter(f => f.required).length}
    missingFields={Array.from(missingFields).map(key => {
      const [rowIndex, fieldId] = key.split('-')
      return {
        rowIndex: parseInt(rowIndex),
        fieldId,
        isRequired: true,
      }
    })}
    onValidateAll={validateAllRows}
  />
)}
```

### Phase 4: User Controls (Optional)

#### 4.1 Filter Toggle

```typescript
const [showMissingOnly, setShowMissingOnly] = React.useState(false)

// Filter drivers based on toggle
const displayedDrivers = React.useMemo(() => {
  if (!showMissingOnly) return drivers
  
  return drivers.filter((driver, index) => {
    return getMissingFields(driver, fields).length > 0
  })
}, [drivers, fields, showMissingOnly])
```

#### 4.2 Highlight Toggle

```typescript
const [highlightMissing, setHighlightMissing] = React.useState(true)

// Conditionally apply highlighting
const cellClassName = `
  ${isActive ? 'bg-[#f9fafb]' : ''}
  ${hasError ? 'bg-red-50/30' : ''}
  ${highlightMissing && isMissing && !hasError ? 'bg-amber-50' : ''}
`
```

#### 4.3 Control UI

```typescript
// In right sidebar or above table
<div className="flex items-center gap-2 mb-4">
  <label className="flex items-center gap-2 text-sm text-[#6b7280]">
    <input
      type="checkbox"
      checked={highlightMissing}
      onChange={(e) => setHighlightMissing(e.target.checked)}
      className="rounded"
    />
    Highlight missing
  </label>
  <label className="flex items-center gap-2 text-sm text-[#6b7280]">
    <input
      type="checkbox"
      checked={showMissingOnly}
      onChange={(e) => setShowMissingOnly(e.target.checked)}
      className="rounded"
    />
    Show incomplete only
  </label>
</div>
```

## File Structure Updates

```
app/
  components/
    drivers-table/
      drivers-table.tsx          # Update: Add missing field detection
      editable-table-cell.tsx    # Update: Add isMissing prop
      validation.ts              # Keep as is
      utils/
        missing-data.ts          # NEW: Missing data utilities
      missing-data-summary.tsx   # NEW: Summary component (optional)
    vehicles-table/
      vehicles-table.tsx         # Update: Apply same changes
      editable-table-cell.tsx    # Update: Apply same changes
      utils/
        missing-data.ts          # NEW: Shared utilities
```

## Implementation Steps

### Step 1: Create Missing Data Utilities
- [ ] Create `utils/missing-data.ts` with detection functions
- [ ] Add TypeScript types for missing field tracking
- [ ] Write unit tests for detection logic

### Step 2: Update Drivers Table
- [ ] Add missing fields state management
- [ ] Implement missing field detection on data changes
- [ ] Update cell rendering to show missing state
- [ ] Update EditableTableCell to accept and display isMissing prop

### Step 3: Add Row-Level Indicators
- [ ] Calculate row completeness
- [ ] Update badge rendering to include incomplete/complete badges
- [ ] Add icons (AlertCircle, CheckCircle) to badges

### Step 4: Add Table Summary (Optional)
- [ ] Create MissingDataSummary component
- [ ] Integrate into DriversTable
- [ ] Add "Validate All" button functionality

### Step 5: Apply to Vehicles Table
- [ ] Apply all changes from Steps 1-4 to VehiclesTable
- [ ] Ensure consistent behavior across both tables

### Step 6: User Controls (Optional)
- [ ] Add "Highlight missing" toggle
- [ ] Add "Show incomplete only" filter
- [ ] Test toggle behavior

### Step 7: Accessibility & Polish
- [ ] Add proper ARIA labels for missing fields
- [ ] Test with screen readers
- [ ] Ensure keyboard navigation works with highlighting
- [ ] Add smooth transitions for visual changes

## Testing Considerations

### Unit Tests
- Test `isFieldMissing` function with various input types
- Test `getMissingFields` for different entity states
- Test `getAllMissingFields` with multiple rows

### Integration Tests
- Test missing field detection updates when data changes
- Test badge display updates when fields are filled
- Test summary counts are accurate

### Visual Tests
- Verify color contrast for accessibility (WCAG AA)
- Test highlighting doesn't interfere with focus states
- Test highlighting works in both light and dark modes (if applicable)

### User Experience Tests
- Test that highlighting helps users identify missing data quickly
- Test that highlighting isn't too distracting during data entry
- Test toggle controls work as expected

## Accessibility Requirements

1. **ARIA Labels**: All missing fields must have `aria-required="true"` and descriptive labels
2. **Color Contrast**: Amber backgrounds must meet WCAG AA standards for text contrast
3. **Screen Reader**: Missing fields must be announced clearly (e.g., "First Name, required field is empty")
4. **Keyboard Navigation**: Highlighting should not interfere with keyboard navigation
5. **Focus Indicators**: Focus states must remain visible over highlighted backgrounds

## Performance Considerations

- **Memoization**: Memoize missing field calculations to avoid recalculation on every render
- **Debouncing**: Consider debouncing missing field updates during rapid data entry
- **Virtualization**: If table uses virtualization, ensure missing field detection works correctly

## Future Enhancements

1. **Auto-save Validation**: Automatically validate on blur or after a delay
2. **Inline Validation Messages**: Show validation messages on hover or focus
3. **Bulk Fill Suggestions**: Suggest values for missing fields based on similar entries
4. **Export Validation Report**: Generate a report of all missing fields
5. **Conditional Required Fields**: Fields that become required based on other field values

## Design References

- **Linear**: Uses subtle yellow/amber for warnings and incomplete states
- **Notion**: Uses light backgrounds with subtle borders for empty required fields
- **Airtable**: Uses badges and progress indicators for data completeness

## Notes

- The amber/yellow color scheme is chosen as a "warning" but less severe than red (errors)
- Proactive highlighting (amber) should be subtle to not distract during data entry
- Error highlighting (red) should be more prominent as it indicates actual validation failures
- Consider user feedback on whether highlighting is helpful or distracting

