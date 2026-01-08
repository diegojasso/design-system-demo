# Show Missing Fields Only Toggle - Vehicles Table Implementation Plan

## Overview
Extend the "Show missing questions only" toggle functionality from the Drivers table to the Vehicles table. This will allow users to filter vehicle fields to show only those with missing required data, helping them focus on incomplete information.

## Current State
- ✅ Missing field detection already implemented (`missingFields` state in vehicles-table.tsx)
- ✅ Visual highlighting for missing fields (amber background)
- ✅ Utilities for checking missing fields (`getRowMissingCount`, `isRowComplete`)
- ✅ Toggle implementation exists in drivers-table.tsx (reference implementation)
- ❌ No filtering mechanism to show only missing fields in vehicles table
- ❌ No toggle UI control in vehicles table

## Design Requirements

### Toggle Placement
Based on the drivers table implementation, the toggle should be:
- Located in the header area, near the "Vehicles" label
- Positioned in the Field Labels Column header (left fixed column)
- Label: "Show missing questions only"
- Style: Switch component with label

### Visual Design
- **Toggle Component**: Use existing `Switch` component from `@/components/ui/switch`
- **Label**: Text should be `text-xs text-[#6b7280]` to match drivers table design
- **Layout**: Flex column container with "Vehicles" label and toggle below it
- **Spacing**: Gap between label and switch, padding consistent with header

## Implementation Steps

### Step 1: Add Toggle State
Add a new state variable to track the toggle status:
```typescript
const [showMissingOnly, setShowMissingOnly] = React.useState(false)
```

### Step 2: Create Filtered Fields Logic
Create a memoized filtered fields array that:
- Returns all fields when toggle is OFF
- Returns only fields with missing data when toggle is ON
- Checks if any vehicle has missing data for that field

```typescript
const visibleFields = React.useMemo(() => {
  if (!showMissingOnly) return fields
  
  return fields.filter((field) => {
    // Check if any vehicle has missing data for this field
    return vehicles.some((vehicle, vehicleIndex) => {
      if (!field.required) return false
      const errorKey = `${vehicleIndex}-${field.id}`
      return missingFields.has(errorKey)
    })
  })
}, [fields, vehicles, missingFields, showMissingOnly])
```

### Step 3: Create Field Index Mapping Functions
Add helper functions to map between visible field indices and original field indices:

```typescript
// Map visible field index to original field index
const getOriginalFieldIndex = React.useCallback((visibleIndex: number): number => {
  if (!showMissingOnly) return visibleIndex
  const field = visibleFields[visibleIndex]
  return fields.findIndex(f => f.id === field.id)
}, [showMissingOnly, visibleFields, fields])

// Map original field index to visible field index
const getVisibleFieldIndex = React.useCallback((originalIndex: number): number | null => {
  if (!showMissingOnly) return originalIndex
  const field = fields[originalIndex]
  return visibleFields.findIndex(f => f.id === field.id)
}, [showMissingOnly, visibleFields, fields])

// Find next visible field from a given original index
const findNextVisibleField = React.useCallback((originalIndex: number): number | null => {
  if (!showMissingOnly) {
    return originalIndex < fields.length - 1 ? originalIndex + 1 : null
  }
  for (let i = originalIndex + 1; i < fields.length; i++) {
    if (getVisibleFieldIndex(i) !== null) {
      return i
    }
  }
  return null
}, [showMissingOnly, fields.length, getVisibleFieldIndex])

// Find previous visible field from a given original index
const findPreviousVisibleField = React.useCallback((originalIndex: number): number | null => {
  if (!showMissingOnly) {
    return originalIndex > 0 ? originalIndex - 1 : null
  }
  for (let i = originalIndex - 1; i >= 0; i--) {
    if (getVisibleFieldIndex(i) !== null) {
      return i
    }
  }
  return null
}, [showMissingOnly, getVisibleFieldIndex])
```

### Step 4: Update Keyboard Navigation Handling
Update `handleCellBlur` to use visible fields when moving to next cell:

```typescript
const handleCellBlur = (moveNextAfterBlur = false) => {
  stopEditing()
  // After blur, if Enter was pressed, move to next cell
  if (moveNextAfterBlur && activeCell) {
    const { vehicleIndex, fieldIndex } = activeCell
    
    // Find next visible field
    const nextFieldIndex = findNextVisibleField(fieldIndex)
    if (nextFieldIndex !== null) {
      moveToCell(vehicleIndex, nextFieldIndex)
    } else if (vehicleIndex < vehicles.length - 1) {
      // Move to next vehicle, first visible field
      const firstVisibleIndex = showMissingOnly && visibleFields.length > 0 
        ? getOriginalFieldIndex(0) 
        : 0
      moveToCell(vehicleIndex + 1, firstVisibleIndex)
    }
  }
}
```

### Step 5: Handle Active Cell When Toggle Changes
Add effects to handle active cell transitions when toggle changes:

```typescript
// Handle active cell when toggle changes - move to visible field if current is hidden
React.useEffect(() => {
  if (!activeCell || !showMissingOnly) return
  
  const visibleIndex = getVisibleFieldIndex(activeCell.fieldIndex)
  if (visibleIndex === null) {
    // Current field is hidden, find nearest visible field
    if (visibleFields.length > 0) {
      const nextVisible = findNextVisibleField(activeCell.fieldIndex)
      const prevVisible = findPreviousVisibleField(activeCell.fieldIndex)
      if (nextVisible !== null) {
        moveToCell(activeCell.vehicleIndex, nextVisible)
      } else if (prevVisible !== null) {
        moveToCell(activeCell.vehicleIndex, prevVisible)
      } else {
        // Fallback to first visible field
        const firstVisibleOriginalIndex = getOriginalFieldIndex(0)
        moveToCell(activeCell.vehicleIndex, firstVisibleOriginalIndex)
      }
    } else {
      // No visible fields, move to first field
      moveToCell(activeCell.vehicleIndex, 0)
    }
  }
}, [showMissingOnly, activeCell, visibleFields.length, getVisibleFieldIndex, getOriginalFieldIndex, findNextVisibleField, findPreviousVisibleField, moveToCell])

// Ensure active cell is always visible when filtering (handles navigation to hidden fields)
React.useEffect(() => {
  if (!activeCell || !showMissingOnly) return
  
  const visibleIndex = getVisibleFieldIndex(activeCell.fieldIndex)
  if (visibleIndex === null && visibleFields.length > 0) {
    // Active cell is on a hidden field, move to nearest visible
    const nextVisible = findNextVisibleField(activeCell.fieldIndex)
    const prevVisible = findPreviousVisibleField(activeCell.fieldIndex)
    if (nextVisible !== null) {
      moveToCell(activeCell.vehicleIndex, nextVisible)
    } else if (prevVisible !== null) {
      moveToCell(activeCell.vehicleIndex, prevVisible)
    } else {
      moveToCell(activeCell.vehicleIndex, getOriginalFieldIndex(0))
    }
  }
}, [activeCell, showMissingOnly, visibleFields.length, getVisibleFieldIndex, findNextVisibleField, findPreviousVisibleField, getOriginalFieldIndex, moveToCell])
```

### Step 6: Add Keyboard Shortcut
Add keyboard shortcut (Ctrl/Cmd + M) to toggle the filter:

```typescript
// Keyboard shortcut to toggle missing fields filter (Ctrl/Cmd + M)
React.useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    const target = event.target as HTMLElement
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
    const isSelect = target.closest('[data-slot="select"]') !== null
    
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === 'm' &&
      !isInput &&
      !isSelect
    ) {
      event.preventDefault()
      setShowMissingOnly((prev) => !prev)
    }
  }

  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [])
```

### Step 7: Update Header UI
Update the Field Labels Column header to include the toggle:

```typescript
{/* Header */}
<div 
  className="h-[64px] px-4 flex flex-col justify-center gap-2 border-b border-[#e5e7eb] bg-white"
  role="columnheader"
  aria-label="Field labels"
>
  <span
    className="text-sm font-medium text-[#6b7280]"
    style={{ fontFamily: "Inter, sans-serif" }}
  >
    Vehicles
  </span>
  <label className="flex items-center gap-2 cursor-pointer">
    <Switch
      checked={showMissingOnly}
      onCheckedChange={setShowMissingOnly}
      className="data-[state=checked]:bg-blue-600"
    />
    <span 
      className="text-xs text-[#6b7280]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Show missing questions only
    </span>
  </label>
</div>
```

### Step 8: Update Field Rows Rendering
Replace `fields.map()` with `visibleFields.map()` in the field rows section:

```typescript
{/* Field Rows */}
{visibleFields.length === 0 && showMissingOnly ? (
  <div className="h-[44px] px-4 flex items-center border-b border-[#f3f4f6] bg-white">
    <span
      className="text-sm font-normal text-[#6b7280] italic"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      No missing fields
    </span>
  </div>
) : (
  visibleFields.map((field, visibleIndex) => {
    const originalFieldIndex = getOriginalFieldIndex(visibleIndex)
    return (
      <div
        key={field.id}
        className="h-[44px] px-4 flex items-center border-b border-[#f3f4f6] last:border-b-0 bg-white"
        role="rowheader"
        aria-rowindex={visibleIndex + 2}
      >
        <span
          className="text-sm font-normal text-[#111827]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {field.label}
          {field.required && (
            <span className="text-red-600 ml-1" aria-label="required">*</span>
          )}
        </span>
      </div>
    )
  })
)}
```

### Step 9: Update Vehicle Columns Field Values Rendering
Update the field values section to use `visibleFields`:

```typescript
{/* Field Values */}
{visibleFields.length === 0 && showMissingOnly ? (
  <div className="h-[44px] border-b border-[#f3f4f6] bg-white flex items-center justify-center">
    <span
      className="text-xs text-[#6b7280] italic"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      All fields complete
    </span>
  </div>
) : (
  visibleFields.map((field, visibleIndex) => {
    const originalFieldIndex = getOriginalFieldIndex(visibleIndex)
    const isEditing = getEditingState(vehicleIndex, originalFieldIndex)
    const isActive = getActiveState(vehicleIndex, originalFieldIndex)
    const cellValue = vehicle[field.id as keyof Vehicle]
    const errorKey = `${vehicleIndex}-${field.id}`
    const error = validationErrors.get(errorKey)
    const isMissing = missingFields.has(errorKey)
    const hasError = !!error

    return (
      <div
        key={field.id}
        data-cell-id={`vehicle-${vehicleIndex}-field-${originalFieldIndex}`}
        className={`h-[44px] border-b border-[#f3f4f6] last:border-b-0 transition-colors ${
          isActive ? 'bg-[#f9fafb]' : ''
        } ${hasError ? 'bg-red-50/30' : ''} ${
          isMissing && !hasError ? 'bg-amber-50' : ''
        }`}
        role="gridcell"
        aria-rowindex={visibleIndex + 2}
        aria-colindex={vehicleIndex + 2}
      >
        <EditableTableCell
          value={cellValue}
          field={field}
          isEditing={isEditing}
          onFocus={() => handleCellFocus(vehicleIndex, originalFieldIndex)}
          onEdit={() => handleCellEdit(vehicleIndex, originalFieldIndex)}
          onBlur={(moveNext) => handleCellBlur(moveNext)}
          onChange={(value) => handleCellChange(vehicleIndex, originalFieldIndex, value)}
          onDoubleClick={() => handleCellEdit(vehicleIndex, originalFieldIndex)}
          error={error}
          isMissing={isMissing && !hasError}
        />
      </div>
    )
  })
)}
```

### Step 10: Update ARIA Attributes
Update `aria-rowcount` to reflect filtered field count:

```typescript
<div 
  className="flex-1 overflow-x-auto relative" 
  ref={containerRef}
  role="grid"
  aria-rowcount={visibleFields.length + 1}
  aria-colcount={vehicles.length + 1}
>
```

### Step 11: Update handleAddVehicle
Ensure new vehicles focus on first visible field:

```typescript
const handleAddVehicle = React.useCallback(() => {
  const newVehicle: Vehicle = {
    // ... vehicle properties
  }
  setVehicles((prev) => [...prev, newVehicle])
  setNewVehicleIds((prev) => new Set(prev).add(newVehicle.id))
  
  // Focus on the new vehicle's first visible cell
  const newVehicleIndex = vehicles.length
  setTimeout(() => {
    const firstVisibleIndex = showMissingOnly && visibleFields.length > 0 
      ? getOriginalFieldIndex(0) 
      : 0
    moveToCell(newVehicleIndex, firstVisibleIndex)
    startEditing()
  }, 100)
}, [vehicles.length, showMissingOnly, visibleFields.length, getOriginalFieldIndex, moveToCell, startEditing])
```

## Edge Cases to Handle

1. **No Missing Fields**: When toggle is ON but no fields have missing data, show "No missing fields" message
2. **Active Cell on Hidden Field**: When toggle changes, if active cell is on a now-hidden field, move to nearest visible field
3. **All Fields Hidden**: If all fields are hidden, show appropriate message
4. **Field Index Mapping**: Ensure field indices are correctly mapped between original and filtered arrays in all cell operations
5. **Keyboard Navigation**: Navigation should only move between visible fields when toggle is ON
6. **Adding New Vehicle**: New vehicles should focus on first visible field, not always field 0

## Testing Considerations

1. **Toggle ON**: Only fields with missing data should be visible
2. **Toggle OFF**: All fields should be visible
3. **Adding data**: When a field is completed, it should disappear if toggle is ON
4. **Keyboard navigation**: Should only navigate between visible fields when toggle is ON
5. **Active cell**: Should handle transitions when toggle changes
6. **Keyboard shortcut**: Ctrl/Cmd + M should toggle the filter
7. **Empty state**: Should show appropriate message when no missing fields exist

## Accessibility

- Toggle should have proper label association
- Screen readers should announce when toggle changes
- Focus management when fields are filtered
- ARIA attributes should reflect filtered state

## File Changes

- `app/components/vehicles-table/vehicles-table.tsx`: 
  - Add `showMissingOnly` state
  - Add `visibleFields` memoized filter
  - Add field index mapping functions
  - Update header UI with toggle
  - Update field rows rendering
  - Update vehicle columns field values rendering
  - Update keyboard navigation handling
  - Add keyboard shortcut handler
  - Update ARIA attributes
  - Import `Switch` component

## Dependencies

- `@/components/ui/switch` - Switch component for toggle
- Existing `missingFields` state and logic
- Existing keyboard navigation hook (`useKeyboardNavigation`)

## Implementation Order

1. Add state and imports
2. Add filtering logic and helper functions
3. Update header UI
4. Update field rows rendering
5. Update vehicle columns rendering
6. Update keyboard navigation
7. Add keyboard shortcut
8. Test all edge cases
